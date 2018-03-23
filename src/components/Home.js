import React from 'react'
import ReviewRecords from './ReviewRecords'
import OpenMultihashForm from './OpenMultihashForm'

export default function Home ({ reviewRecords, history }) {
    return <div>
        <OpenMultihashForm
            onSubmit={fields => history.push('/v/' + fields.multihash)}
            style={{marginBottom:'1em'}}
        />
        <ReviewRecords reviewRecords={reviewRecords} />
    </div>
}