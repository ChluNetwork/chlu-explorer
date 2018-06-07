import React, { Component } from 'react'
import ChluIPFS from 'chlu-ipfs-support'

export const maxLogLength = 500;

export const messageTypes = {
    DEBUG: 'Debug Message',
    INFO: 'Information',
    WARN: 'Warning',
    ERROR: 'Error',
}

export const allowedMessageTypes = ['INFO', 'WARN', 'ERROR']

function getTime() {
    return Date.now()
}

function trimArray(array, maxLength) {
    if (array.length > maxLength) return array.slice(array.length-maxLength, maxLength)
    return array
}

const WithChluServiceNode = ComposedComponent => class extends Component {
    constructor(props){
        super(props)
        this.state = {
            debugLog: [],
            eventLog: [],
            peers: [],
            ipfsPeers: [],
            libp2pPeers: [],
            counter: 0,
            reviewRecordList: [],
            lastReplicated: null,
            loading: true,
            blockchainAccess: false
        }
    }

    async componentDidMount() {
        const logger = {
            debug: x => this.log(messageTypes.DEBUG, x),
            info: x => this.log(messageTypes.INFO, x),
            warn: x => this.log(messageTypes.WARN, x),
            error: x => this.log(messageTypes.ERROR, x)
        }
        const chluIpfs = new ChluIPFS({
            type: ChluIPFS.types.service,
            logger,
            network: process.env.NODE_ENV === 'production' ? ChluIPFS.networks.staging : ChluIPFS.networks.experimental
        })
        if (window && !window.chluIpfs) window.chluIpfs = chluIpfs
        await chluIpfs.start()
        const { id } = await chluIpfs.instance.ipfs.id()
        this.setState({ chluIpfs, id, loading: false }, this.init.bind(this))
    }

    async init() {
        await this.poll()
        await this.refreshReviewRecords()
        const chluIpfs = this.state.chluIpfs
        chluIpfs.instance.events.on('message', this.handleMessage.bind(this))
        chluIpfs.instance.events.on('replicated', () => {
            this.refreshReviewRecords()
            this.updateLastReplicatedTime()
        })
        const interval = setInterval(this.poll.bind(this), 1000)
        this.setState({ interval });
        this.log(messageTypes.INFO, 'Chlu Explorer is ready')
    }

    async componentWillUnmount() {
        const { chluIpfs, interval } = this.state;
        clearInterval(interval)
        await chluIpfs.stop()
    }

    log(type, msg) {
        console.log('[' + type + '] ' + msg);
        if (allowedMessageTypes.map(x => messageTypes[x]).indexOf(type) >= 0) {
            const { debugLog, counter } = this.state
            const time = getTime();
            const item = { type, msg, key: counter, time }
            this.setState({
                debugLog: trimArray([item].concat(debugLog), maxLogLength),
                counter: counter + 1
            })
        }
    }

    async poll() {
        const { chluIpfs } = this.state;
        const src = chluIpfs.instance;
        const peers = await src.room.getPeers()
        const libp2pPeers = await src.ipfs.swarm.peers()
        const ipfsPeers = (await src.ipfs.bitswap.stat()).peers || []
        const blockchainAccess = Boolean(src.bitcoin.ready)
        this.setState({ peers, ipfsPeers, libp2pPeers, blockchainAccess })
    }

    async updateLastReplicatedTime() {
        this.setState({
            lastReplicated: getTime()
        })
    }

    async refreshReviewRecords() {
        const reviewRecordList = await this.state.chluIpfs.instance.orbitDb.getReviewRecordList()
        this.setState({ reviewRecordList })
    }

    async handleMessage(msg) {
        const { eventLog, counter } = this.state;
        try {
            msg.time = getTime()
            msg.key = counter
            this.setState({
                counter: counter + 1,
                eventLog: trimArray([msg].concat(eventLog), maxLogLength)
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    render() {
        return <ComposedComponent
            {...this.props}
            chluIpfs={this.state.chluIpfs}
            loading={this.state.loading}
            dbs={this.state.dbs}
            id={this.state.id}
            eventLog={this.state.eventLog}
            debugLog={this.state.debugLog}
            peers={this.state.peers}
            ipfsPeers={this.state.ipfsPeers}
            libp2pPeers={this.state.libp2pPeers}
            reviewRecordList={this.state.reviewRecordList}
            lastReplicated={this.state.lastReplicated}
            blockchainAccess={this.state.blockchainAccess}
        />
    }
}

export default WithChluServiceNode