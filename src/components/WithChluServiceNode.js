import React, { Component } from 'react'

export const maxLogLength = 10;

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
            dbs: [],
            counter: 0,
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
        // Load the huge module at runtime
        const ChluIPFS = await import('chlu-ipfs-support')
        const chluIpfs = new ChluIPFS({ type: ChluIPFS.types.service, logger })
        await chluIpfs.start()
        const { id } = await chluIpfs.instance.ipfs.id()
        chluIpfs.instance.room.room.on('message', this.handleMessage.bind(this))
        const interval = setInterval(this.poll.bind(this), 1000)
        this.setState({ chluIpfs, id, interval, loading: false })
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
        const dbs = Object.keys(src.dbs).map(address => {
            // TODO: collect db information
            return {
                address
            }
        })
        const peers = src.room.room.getPeers()
        const ipfsPeers = src.ipfs.bitswap.stat().peers || []
        this.setState({ dbs, peers, ipfsPeers })
    }

    async handleMessage(message) {
        const { eventLog, counter } = this.state;
        try {
            const msg = JSON.parse(message.data.toString())
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
            ipfsPeers={this.state.peers}
        />
    }
}

export default WithChluServiceNode