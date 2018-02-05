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
            dbs: [],
            counter: 0,
            reviewRecords: [],
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
        chluIpfs.instance.room.room.on('message', this.handleMessage.bind(this))
        const interval = setInterval(this.poll.bind(this), 1000)
        this.setState({ chluIpfs, id, interval, loading: false })
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
        const dbs = Object.keys(src.dbs || {}).map(address => {
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
            if (msg.multihash && msg.type === 'PINNED') {
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
                const reviewRecord = await chluIpfs.readReviewRecord(multihash)
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

    async storeExampleReviewRecord() {
        const amount = parseInt(Math.random() * 10000 + 10, 10)
        const rating = parseInt(Math.random() + 4 + 1, 10)
        const reviewRecord = {
            currency_symbol: 'USD',
            amount,
            customer_address: 'customer_address',
            vendor_address: 'vendor_address',
            review_text: 'it was a really nice item',
            rating,
            detailed_review: [],
            popr: {
                item_id: 'item_id',
                invoice_id: 'invoice_id',
                customer_id: 'customer_id',
                created_at: 12345,
                expires_at: 34567,
                currency_symbol: 'USD',
                amount,
                marketplace_url: 'chlu.io',
                marketplace_vendor_url: 'chlu.io',
                key_location: '/ipfs/url',
                chlu_version: 0,
                attributes: [
                    {
                        name: 'score',
                        min_rating: 1,
                        max_rating: 5,
                        description: 'rating',
                        is_required: true
                    }
                ],
                signature: '-'
            },
            orbitDb: '/orbitdb/ipfshash/chlu-experimental-customer-review-updates',
            last_reviewrecord_multihash: '',
            chlu_version: 0,
            hash: '-'
        }
        const { chluIpfs } = this.state 
        try {
            await chluIpfs.storeReviewRecord(reviewRecord)
        } catch (error) {
            console.log('ERROR', error)
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
            reviewRecords={this.state.reviewRecords}
            readReviewRecord={this.readReviewRecord.bind(this)}
            storeExampleReviewRecord={this.storeExampleReviewRecord.bind(this)}
        />
    }
}

export default WithChluServiceNode