import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Card, Icon, Rating, Button } from 'semantic-ui-react'

export default function ReviewRecord({ error, ...props }) {
    const reviewEmpty = !(props.rating > 0 || props.review_text)
    return <Card.Group>
        <Card fluid>
            <Card.Content>
                <Card.Header>Requested Record</Card.Header>
                <Card.Meta style={{wordBreak:'break-all'}}>{props.requestedMultihash}</Card.Meta>
            </Card.Content>
            {!error && <Card.Content>
                <Icon name="check" /> Signed by Customer
                <br/><Icon name="key" /> Customer Key
                <br/><span style={{wordBreak:'break-all'}}>{props.key_location}</span>
            </Card.Content> }
            {!error && <Card.Content>
                <Card.Header>Versions</Card.Header>
                <Icon name="code" /> Latest
                <br/><span style={{wordBreak:'break-all'}}>
                    {props.lastVersionMultihash === props.multihash ? 'You are viewing the latest version' : props.lastVersionMultihash}
                </span>
                <br/><Icon name="history" /> Previous
                <br/><span style={{wordBreak:'break-all'}}>{props.previous_version_multihash || 'None'}</span>
            </Card.Content> }
            {!error && <div className="ui two buttons">
                <Button
                    icon="history"
                    content="Previous Version"
                    as={Link} to={'/reviewrecord/' + props.previous_version_multihash}
                    disabled={error || !props.previous_version_multihash}
                />
                <Button
                    icon="clock"
                    content="Latest Version"
                    as={Link} to={'/review/' + props.lastVersionMultihash}
                    disabled={error || (props.requestedMultihash === props.lastVersionMultihash)}
                />
            </div> }
            {error && <Card.Content style={{wordBreak:'break-all'}}>
                <Card.Header>Error</Card.Header>
                <Icon name="ban" /> {error.message || error}
            </Card.Content> }
        </Card>
        {!error && <Card fluid>
            <Card.Content>
                <Card.Header>Review</Card.Header>
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
                <Card.Header>Payment Request</Card.Header>
            </Card.Content>
            <Card.Content>
                <Icon name="tag" /> Item ID
                <br/>{props.popr.item_id}
                <br/><Icon name="tag" /> Customer ID
                <br/>{props.popr.customer_id}
                <br/><Icon name="tag" /> Invoice ID
                <br/>{props.popr.invoice_id}
                <br/><Icon name="payment" /> Amount
                <br/>{props.popr.amount + ' ' + props.popr.currency_symbol}
            </Card.Content>
            <Card.Content>
                <Icon name="chain" /> Marketplace
                <br/><span style={{wordBreak:'break-all'}}>
                    <a href={props.popr.marketplace_url}>{props.popr.marketplace_url}</a>
                </span>
                <br/><Icon name="chain" /> Vendor
                <br/><span style={{wordBreak:'break-all'}}>
                    <a href={props.popr.marketplace_vendor_url}>{props.popr.marketplace_vendor_url}</a>
                </span>
            </Card.Content>
            <Card.Content>
                <Icon name="clock" /> Created At
                <br/>{moment(props.popr.created_at).format('LLL')}
                <br/><Icon name="clock" /> Expires
                <br/>{props.popr.expires_at ? moment(props.popr.expires_at).format('LLL') : 'Never'}
            </Card.Content>
            <Card.Content>
                <Icon name="check" /> Signed by Marketplace and Vendor
                <br/><Icon name="key" /> Marketplace/Vendor
                <br/><span style={{wordBreak:'break-all'}}>{props.popr.key_location}</span>
                <br/><Icon name="key" /> Vendor
                <br/><span style={{wordBreak:'break-all'}}>{props.popr.vendor_key_location}</span>
            </Card.Content>
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