import React from 'react'
import { Card } from 'semantic-ui-react'
import ReviewRecordLoader from './ReviewRecordLoader'

export default function ReviewRecords ({ reviewRecords, limit = 15, offset = 0, chluIpfs, style }) {
    let list = limit > 0 ? reviewRecords.slice(offset, offset + limit) : reviewRecords
    return <Card.Group style={style}>
        {list.map(r => <ReviewRecordLoader short key={r} multihash={r} chluIpfs={chluIpfs}/>)}
        {
            reviewRecords.length === 0
            ? <div style={{margin:'1em auto'}}>Nothing to show</div>
            : null
        }
    </Card.Group>
}