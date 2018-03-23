import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Rating, Button } from 'semantic-ui-react'

export default function ReviewRecord({ big, ...props }) {
    return <Card fluid>
        { big && <Card.Content>
            <Card.Header>Review Record</Card.Header>
            <Card.Meta style={{wordBreak:'break-all'}}>{props.multihash}</Card.Meta>
        </Card.Content> }
        <Card.Content>
            <Icon name="comment" /> Rating
            <br/><Rating defaultRating={props.rating} maxRating={5} disabled />
        </Card.Content>
        <Card.Content style={{wordBreak:'break-all'}}>
            <Icon name="comment" /> Review
            <br/>{props.review_text || '(no comment left)'}
        </Card.Content>
        {!big && <Card.Content extra>
            <Button as={Link} to={'/v/' + props.multihash} fluid icon='search' content='View'/>
        </Card.Content>}
    </Card>
}