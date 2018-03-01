import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

export default function Stats({ dbCount, peerCount, ipfsPeerCount, bitswapPeerCount, id }) {
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
                <Icon name="user" /> {peerCount} nodes
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
                <Icon name="user" /> {ipfsPeerCount} swarm peers
                <br/>
                <Icon name="user" /> {bitswapPeerCount} bitswap peers
            </Card.Content>
        </Card> 
    </Card.Group>
}