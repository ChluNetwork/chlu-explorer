import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Rating, Button } from 'semantic-ui-react'

export default function ReviewRecordShort({ loading, multihash, ...props }) {
    return <Card fluid href={'#/v/' + multihash}>
        <Card.Content>
            { loading && <span><Icon name="signal"/> Fetching from IPFS</span> }
            {!loading && <span>
                <Icon name="heart" /> Rating
                <br/><Rating defaultRating={props.rating} maxRating={5} disabled />
                <br/><Icon name="comment" /> Comment
                <br/>{props.review_text || '(no comment left)'}
            </span>}
        </Card.Content>
    </Card>
}