import React from 'react'
import { List } from 'semantic-ui-react'

function getFilterByType(types) {
    return function(item){
        return types.indexOf(item.type) >= 0
    }
}

export default function EventLog ({ eventLog, types, Component }) {
    let log = eventLog
    if (Array.isArray(types)) {
        log = log.filter(getFilterByType(types))
    }
    return <List divided relaxed>
        {log.map(event => <Component {...event} />)}
    </List>
}