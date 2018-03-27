import React from 'react'
import { Card, Icon, Rating } from 'semantic-ui-react'

export default function ReviewRecord({ error, ...props }) {
    const reviewEmpty = !(props.rating > 0 || props.review_text)
    return <Card.Group>
        <Card fluid>
            <Card.Content>
                <Card.Header>Review Record</Card.Header>
                <Card.Meta style={{wordBreak:'break-all'}}>{props.requestedMultihash}</Card.Meta>
            </Card.Content>
            {!error && <Card.Content>
                <Icon name="code" /> Latest Version
                <br/><span style={{wordBreak:'break-all'}}>{props.multihash}</span>
                <br/><Icon name="history" /> Previous Version
                <br/><span style={{wordBreak:'break-all'}}>{props.previous_version_multihash || 'None'}</span>
            </Card.Content> }
            {error && <Card.Content style={{wordBreak:'break-all'}}>
                <Icon name="ban" /> {error.message || error}
            </Card.Content> }
        </Card>
        {!error && <Card fluid>
            <Card.Content>
                <Card.Header>Review Data</Card.Header>
                {reviewEmpty && <Card.Meta>Empty</Card.Meta>}
            </Card.Content>
            {props.rating > 0 && <Card.Content>
                <Icon name="heart"/> Rating
                <br/><Rating defaultRating={props.rating} maxRating={5} disabled />
            </Card.Content>}
            {props.review_text && <Card.Content style={{wordBreak:'break-all'}}>
                <Icon name="comment" /> Comment
                <br/>{props.review_text || '(no comment left)'}
            </Card.Content>}
        </Card> }
        {!error && <Card fluid>
            <Card.Content>
                <Card.Header>Payment</Card.Header>
                <Card.Meta>Payed with {props.currency_symbol}</Card.Meta>
            </Card.Content>
            <Card.Content>
                <Icon name="user" /> Customer Address
                <br/>{props.customer_address}
                <br/><Icon name="shopping bag" /> Vendor Address
                <br/>{props.vendor_address}
                <br/><Icon name="payment" /> Amount
                <br/>{props.amount + ' ' + props.currency_symbol}
            </Card.Content>
        </Card> }
    </Card.Group>
}