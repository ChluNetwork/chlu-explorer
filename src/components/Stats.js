import React from 'react'
import moment from 'moment'
import { Card, Icon } from 'semantic-ui-react'

export default function Stats(props) {
    const {
        reviewRecordList,
        peerCount,
        ipfsPeerCount,
        libp2pPeerCount,
        id,
        lastReplicated
    } = props
    const reviewRecordCount = reviewRecordList.length
    return <Card.Group>
        <Card>
            <Card.Content>
                <Card.Header>
                    Chlu
                </Card.Header>
            </Card.Content>
            <Card.Content extra>
                <Icon name="id card" /> Service Node
                <br/>
                <Icon name="bitcoin" /> No blockchain access
            </Card.Content>
            <Card.Content extra>
                <Icon name="feed" /> {peerCount} Chlu peers
                <br/><Icon name="database" /> {reviewRecordCount} reviews
                <br/><Icon name="clock" /> Last Update: {lastReplicated ? moment(lastReplicated).format('LTS') : 'Never'}
            </Card.Content>
        </Card> 
        <Card>
            <Card.Content>
                <Card.Header>
                    IPFS 
                </Card.Header>
            </Card.Content>
            <Card.Content extra style={{wordBreak:'break-all'}}>
                <Icon name="id card" /> {id}
            </Card.Content>
            <Card.Content extra>
                <Icon name="server" /> {libp2pPeerCount} libp2p peers
                <br/>
                <Icon name="cube" /> {ipfsPeerCount} IPFS peers
            </Card.Content>
        </Card> 
    </Card.Group>
}