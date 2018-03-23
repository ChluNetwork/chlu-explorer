import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon, Rating, Button } from 'semantic-ui-react'

export default function ReviewRecord({ big, ...props }) {
    console.log(props)
    return <Card fluid>
        <Card.Content>
            <Icon name="heart" /> Rating
            <br/><Rating defaultRating={props.rating} maxRating={5} disabled />
            <br/><Icon name="comment" /> Comment
            <br/>{props.review_text || '(no comment left)'}
        </Card.Content>
        <Card.Content extra>
            <Button as={Link} to={'/v/' + props.multihash} fluid icon='search' content='View'/>
        </Card.Content>
    </Card>
}