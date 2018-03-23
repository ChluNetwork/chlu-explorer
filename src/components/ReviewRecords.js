import React from 'react'
import { Card } from 'semantic-ui-react'
import ReviewRecord from './ReviewRecord'

export default function ReviewRecords ({ reviewRecords }) {
    return <Card.Group>
        {reviewRecords.map(r => <ReviewRecord key={r.time} {...r} />)}
        {
            reviewRecords.length === 0
            ? <div style={{margin:'1em auto'}}>Nothing to show</div>
            : null
        }
    </Card.Group>
}