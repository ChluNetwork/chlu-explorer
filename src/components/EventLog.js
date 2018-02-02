import React from 'react'

export default function EventLog ({ eventLog, dbs, id, peers }) {
    return <div className="event-log">
        <div>{id} IPFS ID</div>
        <div>{peers.length} Peers</div>
        <div>{dbs.length} Synced Customers</div>
        {eventLog.map(event => <div className="event" key={event.key} >{event.type} {event.msg || ''}</div>)}
    </div>
}