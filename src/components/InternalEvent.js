import React from 'react'
import { List } from 'semantic-ui-react'
import moment from 'moment'
import { messageTypes } from './WithChluServiceNode'

export default function InternalEvent({ type, time, msg }) {
    const timeStr = moment(time).fromNow()
    const icons = {
        [messageTypes.DEBUG]: 'settings',
        [messageTypes.WARN]: 'warning',
        [messageTypes.ERROR]: 'error',
        [messageTypes.INFO]: 'alarm',
    }
    return <List.Item>
        <List.Icon name={icons[type] || 'comment'} size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header>{type}</List.Header>
          <List.Description>{timeStr}</List.Description>
          <List.Description style={{wordBreak:'break-all'}}>{msg}</List.Description>
        </List.Content>
      </List.Item>
}