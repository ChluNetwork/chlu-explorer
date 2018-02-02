import React, { Component } from 'react';
import WithChluServiceNode from './components/WithChluServiceNode'
import EventLog from './components/EventLog'
import Event from './components/Event'
import Stats from './components/Stats'
import { Dimmer, Loader, Grid, Segment, Rail, Icon, Header, Container } from 'semantic-ui-react'
import InternalEvent from './components/InternalEvent';

class App extends Component {
  render() {
    const { eventLog, debugLog, peers, ipfsPeers, dbs, id, loading } = this.props
    return (
      <Container>
        <Header as='h2' icon textAlign='center'>
          <Icon name='settings' circular />
          <Header.Content>
            Chlu Dashboard
          </Header.Content>
        </Header>
        <Grid centered columns={3}>
          <Grid.Column>
            <Dimmer active={loading} inverted style={{marginTop:'2rem'}}>
              <Loader inverted>Connecting to Chlu</Loader>
            </Dimmer>
            <EventLog eventLog={eventLog} Component={Event} />
            <Rail position='left'>
              <Stats dbCount={dbs.length} peerCount={peers.length} ipfsPeerCount={ipfsPeers.length} id={id} />
            </Rail>
            <Rail position='right'>
              <Segment>
                <EventLog eventLog={debugLog} Component={InternalEvent} />
              </Segment>
            </Rail>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default WithChluServiceNode(App);
