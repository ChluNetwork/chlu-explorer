import React from 'react'
import { List } from 'semantic-ui-react'

export default function EventLog ({ eventLog, Component }) {
    return <List divided relaxed>
        {eventLog.slice(-10).map(event => <Component {...event} />)}
    </List>
}