import React, { Component } from 'react';
import WithChluServiceNode, { messageTypes } from './components/WithChluServiceNode'
import ReviewRecords from './components/ReviewRecords'
import Stats from './components/Stats'
import { Dimmer, Button, Loader, Grid, Segment, Rail, Icon, Header, Container } from 'semantic-ui-react'
import EventLog from './components/EventLog'
import InternalEvent from './components/InternalEvent';

const visibleMessageTypes = [
  messageTypes.INFO,
  messageTypes.WARN,
  messageTypes.ERROR
]

class App extends Component {
  render() {
    const { reviewRecords, debugLog, peers, ipfsPeers, dbs, id, loading, storeExampleReviewRecord } = this.props
    return (
      <Container>
        <Header as='h2' icon textAlign='center' style={{marginTop:'1rem'}}>
          <Icon name='settings' circular />
          <Header.Content>
            Chlu Explorer
          </Header.Content>
        </Header>
        <Grid centered columns={3}>
          <Grid.Column>
            <Dimmer active={loading} inverted style={{marginTop:'2rem'}}>
              <Loader inverted>Connecting to Chlu</Loader>
            </Dimmer>
            <ReviewRecords reviewRecords={reviewRecords} />
            <Rail position='left'>
              <Stats dbCount={dbs.length} peerCount={peers.length} ipfsPeerCount={ipfsPeers.length} id={id} />
              <Button fluid onClick={storeExampleReviewRecord} style={{marginTop:'1.5rem'}}>Create Fake Review Record</Button>
            </Rail>
            <Rail position='right'>
              <Segment>
                <EventLog eventLog={debugLog} types={visibleMessageTypes} Component={InternalEvent}/>
              </Segment>
            </Rail>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default WithChluServiceNode(App);
