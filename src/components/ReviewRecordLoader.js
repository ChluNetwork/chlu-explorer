import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReviewRecordDetail from './ReviewRecordDetail'
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
        const { multihash } = this.props
        if (error) {
            return <div style={{margin:'1em auto'}}>{error.message || error}</div>
        } else if (loading) {
            return <Loading loading={true} message={'Fetching Review'} />
        } else {
            return <div>
                <div style={{margin:'1em auto',textAlign:'center'}}>Viewing single review</div>
                <ReviewRecordDetail multihash={multihash} {...reviewRecord} />
                <Button as={Link} to={'/'} fluid icon='home' content='Home' style={{marginTop:'1.5em'}}/>
            </div>
        }
    }

    async fetch() {
        const { multihash, chluIpfs } = this.props
        try {
            const reviewRecord = await chluIpfs.readReviewRecord(multihash)
            this.setState({ reviewRecord, loading: false })
        } catch (error) {
            this.setState({ error })
        }
    }

    componentWillReceiveProps(next) {
        if (this.props.multihash !== next.multihash) this.fetch()
    }
    
    componentDidMount() {
        this.fetch()
    }
}