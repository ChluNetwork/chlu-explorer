import React, { Component } from 'react'
import ChluIPFS from 'chlu-ipfs-support/src'

export const maxLogLength = 50;

export const messageTypes = {
    DEBUG: 'Debug Message',
    INFO: 'Information',
    WARN: 'Warning',
    ERROR: 'Error',
}

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
            bitswapPeers: [],
            dbs: [],
            counter: 0,
            reviewRecords: [],
            reviewRecordList: [],
            loading: true
        }
    }

    async componentDidMount() {
        const logger = {
            debug: x => this.log(messageTypes.DEBUG, x),
            info: x => this.log(messageTypes.INFO, x),
            warn: x => this.log(messageTypes.WARN, x),
            error: x => this.log(messageTypes.ERROR, x)
        }
        const chluIpfs = new ChluIPFS({ type: ChluIPFS.types.service, logger })
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
        chluIpfs.instance.events.on('replicated', this.refreshReviewRecords.bind(this))
        const interval = setInterval(this.poll.bind(this), 1000)
        this.setState({ interval });
        this.log(messageTypes.INFO, 'Chlu Dashboard is ready')
    }

    async componentWillUnmount() {
        const { chluIpfs, interval } = this.state;
        clearInterval(interval)
        await chluIpfs.stop()
    }

    log(type, msg) {
        const { debugLog, counter } = this.state
        const time = getTime();
        const item = { type, msg, key: counter, time }
        this.setState({
            debugLog: trimArray([item].concat(debugLog), maxLogLength),
            counter: counter + 1
        })
    }

    async poll() {
        const { chluIpfs } = this.state;
        const src = chluIpfs.instance;
        const peers = await src.room.getPeers()
        const ipfsPeers = await src.ipfs.swarm.peers()
        const bitswapPeers = (await src.ipfs.bitswap.stat()).peers || []
        const reviewRecordList = await src.orbitDb.getReviewRecordList();
        this.setState({ peers, ipfsPeers, bitswapPeers, reviewRecordList })
    }

    async refreshReviewRecords() {
        const list = await this.state.chluIpfs.instance.orbitDb.getReviewRecordList()
        await Promise.all(list.map(h => this.readReviewRecord(h)))
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
            if (msg.multihash && msg.type === 'WROTE_REVIEW_RECORD') {
                this.readReviewRecord(msg.multihash)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    async readReviewRecord(multihash) {
        const { chluIpfs, reviewRecords } = this.state
        if (reviewRecords.filter(r => r.multihash === multihash).length === 0) {
            try {
                const reviewRecord = await chluIpfs.readReviewRecord(multihash, {
                    getLatestVersion: true
                })
                reviewRecord.multihash = multihash
                reviewRecord.time = getTime()
                this.setState({
                    reviewRecords: trimArray([reviewRecord].concat(reviewRecords), 100)
                })
            } catch (error) {
                console.log('Error while reading RR:', error)
            }
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
            bitswapPeers={this.state.bitswapPeers}
            reviewRecords={this.state.reviewRecords}
            reviewRecordList={this.state.reviewRecordList}
            readReviewRecord={this.readReviewRecord.bind(this)}
        />
    }
}

export default WithChluServiceNode