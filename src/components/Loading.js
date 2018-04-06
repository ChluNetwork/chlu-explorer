import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export default function Loading({ loading, message }) {
    return <Dimmer active={loading} inverted style={{marginTop:'2rem'}}>
        <Loader inverted>{message || 'Loading'}</Loader>
    </Dimmer>
}