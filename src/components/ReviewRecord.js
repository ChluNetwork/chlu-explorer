import React from 'react'
import { Card, Icon, Rating } from 'semantic-ui-react'

export default function ReviewRecord(props) {
    return <Card fluid>
      <Card.Content>
          <Icon name="comment" /> Rating
          <br/><Rating defaultRating={props.rating} maxRating={5} disabled />
      </Card.Content>
      <Card.Content style={{wordBreak:'break-all'}}>
          <Icon name="comment" /> Review
          <br/>{props.review_text || '(no comment left)'}
      </Card.Content>
      <Card.Content style={{wordBreak:'break-all'}}>
          <Icon name="chain" /> Multihash
          <br/>{props.multihash}
      </Card.Content>
    </Card>
}