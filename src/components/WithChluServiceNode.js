import React, { Component } from 'react'
import ChluIPFS from 'chlu-ipfs-support'

const maxLogLength = 10;

function getLogItemKey() {
    return Date.now() + Math.random()
}

function trimArray(array, maxLength) {
    if (array.length > maxLength) return array.slice(array.length-maxLength, maxLength)
    return array
}

const WithChluServiceNode = ComposedComponent => class extends Component {
    constructor(props){
        super(props)
        this.state = {
            eventLog: [],
            peers: [],
            dbs: []
        }
    }

    async componentDidMount() {
        const logger = {
            debug: x => this.log('Debug', x),
            info: x => this.log('Info', x),
            warn: x => this.log('Warning', x),
            error: x => this.log('ERROR', x)
        }
        const chluIpfs = new ChluIPFS({ type: ChluIPFS.types.service, logger })
        await chluIpfs.start()
        const { id } = await chluIpfs.instance.ipfs.id()
        chluIpfs.instance.room.room.on('message', this.handleMessage.bind(this))
        const interval = setInterval(this.poll.bind(this), 1000)
        this.setState({ chluIpfs, id, interval })
    }

    async componentWillUnmount() {
        const { chluIpfs, interval } = this.state;
        clearInterval(interval)
        await chluIpfs.stop()
    }

    log(type, msg) {
        const { eventLog } = this.state
        const item = { type, msg, key: getLogItemKey() }
        this.setState({
            eventLog: trimArray(eventLog.concat(item), maxLogLength)
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
        this.setState({ dbs, peers })
    }

    async handleMessage(message) {
        const { eventLog } = this.state;
        try {
            const msg = JSON.parse(message.data.toString())
            msg.key = getLogItemKey()
            this.setState({
                eventLog: trimArray(eventLog.concat(msg), maxLogLength)
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    render() {
        return <ComposedComponent
            {...this.props}
            chluIpfs={this.state.chluIpfs}
            dbs={this.state.dbs}
            id={this.state.id}
            eventLog={this.state.eventLog}
            peers={this.state.peers}
        />
    }
}

export default WithChluServiceNode