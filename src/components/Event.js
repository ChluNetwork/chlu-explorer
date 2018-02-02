import React from 'react'
import { List } from 'semantic-ui-react'
import moment from 'moment'

export default function Event({ from, time, msg }) {
    const timeStr = moment(time).fromNow()
    return <List.Item>
        <List.Icon name='comment' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header>{from || 'Unknown Source'}</List.Header>
          <List.Description>Received {timeStr}</List.Description>
          <List.Description>{msg}</List.Description>
        </List.Content>
      </List.Item>
}