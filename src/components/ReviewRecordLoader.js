import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReviewRecordDetail from './ReviewRecordDetail'
import ReviewRecordShort from './ReviewRecordShort'
import Loading from './Loading'

export default class ReviewRecordLoader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            error: null,
            reviewRecord: {}
        }
    }

    render() {
        const { loading, reviewRecord, error } = this.state
        const { short = false } = this.props
        if (short) {
            return <ReviewRecordShort error={error} loading={loading} {...reviewRecord} />
        } else if (loading && !error) {
            return <Loading loading={true} message={'Fetching Review'} />
        } else {
            return <div>
                <div style={{margin:'1em auto',textAlign:'center'}}>Viewing single review</div>
                <ReviewRecordDetail error={error} {...reviewRecord} />
                <Button as={Link} to={'/'} fluid icon='home' content='Home' style={{marginTop:'1.5em'}}/>
            </div>
        }
    }

    async reset() {
        return await new Promise(resolve => {
            this.setState({
                loading: true,
                error: null,
                reviewRecord: {}
            }, resolve)
        })
    }

    async fetch(multihash, getLatestVersion = true) {
        const { chluIpfs } = this.props
        try {
            const reviewRecord = await chluIpfs.readReviewRecord(multihash, {
                getLatestVersion
            })
            // TODO: maybe this next step should be done by ChluIPFS?
            if (getLatestVersion) {
                reviewRecord.lastVersionMultihash = reviewRecord.multihash
            } else {
                reviewRecord.lastVersionMultihash = await chluIpfs.instance.orbitDb.get(multihash)
            }
            this.setState({ reviewRecord, loading: false })
        } catch (error) {
            this.setState({ error, loading: false })
        }
    }

    componentWillReceiveProps(next) {
        if (this.props.multihash !== next.multihash || this.props.getLatestVersion !== next.getLatestVersion) {
            this.reset().then(this.fetch(next.multihash, next.getLatestVersion))
        }
    }
    
    componentDidMount() {
        this.fetch(this.props.multihash, this.props.getLatestVersion)
    }
}