import React from 'react'
import { Card, Icon, Rating } from 'semantic-ui-react'

export default function ReviewRecordShort({ error, loading, multihash, ...props }) {
    return <Card fluid href={'#/v/' + multihash}>
        <Card.Content>
            {error && <span style={{wordBreak:'break-all'}}><Icon name="ban"/> {error.message || error}</span> }
            {!error && loading && <span><Icon name="signal"/> Fetching from IPFS</span> }
            {!error && !loading && <span>
                <Icon name="heart" /> Rating
                <br/><Rating defaultRating={props.rating} maxRating={5} disabled />
                <br/><Icon name="comment" /> Comment
                <br/>{props.review_text || '(no comment left)'}
            </span>}
        </Card.Content>
    </Card>
}