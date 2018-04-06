import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import ReviewRecords from './ReviewRecords'

const defaultPerPage = 5

export default class ReviewRecordsPaged extends Component {
    constructor(props) {
        super(props)
        this.state = { page: 1 }
    }

    render () {
        const { reviewRecords, perPage = defaultPerPage, chluIpfs } = this.props
        const maxPages = this.getMaxPages()
        const { page } = this.state
        return <div style={this.props.style}>
            <ReviewRecords
                reviewRecords={reviewRecords}
                offset={(page-1) * perPage}
                limit={perPage}
                chluIpfs={chluIpfs}
                style={{marginBottom:'1em'}}
            />
            <div className="ui two buttons">
                <Button onClick={this.previousPage.bind(this)} disabled={page <= 1} icon="left arrow" content="Previous" labelPosition="left"/>
                <Button onClick={this.nextPage.bind(this)} disabled={page >= maxPages} icon="right arrow" content="Next" labelPosition="right"/>
            </div>
        </div>
    }

    nextPage() {
        if (this.state.page < this.getMaxPages()) {
            this.setState({ page: this.state.page + 1 })
        }
    }

    previousPage() {
        if (this.state.page > 1) {
            this.setState({ page: this.state.page - 1 })
        }
    }

    getMaxPages() {
        return Math.max(1, Math.ceil(this.props.reviewRecords.length / (this.props.perPage || defaultPerPage)))
    }
}