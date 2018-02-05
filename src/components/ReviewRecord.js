import React from 'react'
import { Card, Icon, Rating } from 'semantic-ui-react'

export default function ReviewRecord(props) {
    return <Card fluid>
      <Card.Content extra style={{wordBreak:'break-all'}}>
        {props.multihash}
      </Card.Content>
      <Card.Content extra style={{wordBreak:'break-all'}}>
          <Icon name="comment" /> Review
          <br/>{props.review_text}
      </Card.Content>
      <Card.Content extra style={{wordBreak:'break-all'}}>
          <Icon name="chain" /> Multihash
          <br/>{props.multihash}
          <br/><Icon name="chain" /> OrbitDB Address
          <br/>{props.orbitDb}
      </Card.Content>
      <Card.Content extra>
          <Icon name="comment" /> Rating
          <br/><Rating defaultRating={props.rating} maxRating={5} disabled />
      </Card.Content>
    </Card>
}