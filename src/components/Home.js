import React from 'react'
import ReviewRecordsPaged from './ReviewRecordsPaged'
import OpenMultihashForm from './OpenMultihashForm'

export default function Home ({ reviewRecords, history, chluIpfs }) {
    return <div>
        <OpenMultihashForm
            onSubmit={fields => history.push('/v/' + fields.multihash)}
            style={{marginBottom:'1em'}}
        />
        <ReviewRecordsPaged
            reviewRecords={reviewRecords}
            chluIpfs={chluIpfs}
            style={{marginTop:'1em'}}
        />
    </div>
}