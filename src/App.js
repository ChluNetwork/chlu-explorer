import React, { Component } from 'react';
import WithChluServiceNode, { messageTypes } from './components/WithChluServiceNode'
import Home from './components/Home'
import Stats from './components/Stats'
import { Grid, Segment, Rail, Icon, Header, Container } from 'semantic-ui-react'
import EventLog from './components/EventLog'
import InternalEvent from './components/InternalEvent'
import ReviewRecordLoader from './components/ReviewRecordLoader'
import Loading from './components/Loading'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

const visibleMessageTypes = [
  messageTypes.INFO,
  messageTypes.WARN,
  messageTypes.ERROR
]

class App extends Component {
  render() {
    const {
      chluIpfs,
      reviewRecords,
      reviewRecordList,
      debugLog,
      peers,
      ipfsPeers,
      bitswapPeers,
      id,
      loading
    } = this.props
    return (
      <Router>
        <Container>
          <Header as='h2' icon textAlign='center' style={{marginTop:'1rem'}}>
            <Icon name='settings' circular />
            <Header.Content>
              Chlu Explorer
            </Header.Content>
          </Header>
          <Grid centered columns={3}>
            <Grid.Column>
              <Loading message='Starting up' loading={loading} />
              { !loading &&
                <Switch>
                  <Route
                    path='/v/:m'
                    render={({match}) => <ReviewRecordLoader multihash={match.params.m} chluIpfs={chluIpfs} />}
                  />
                  <Route
                    path='/'
                    render={props => <Home reviewRecords={reviewRecordList} chluIpfs={chluIpfs} {...props}/>}
                  />
                </Switch>
              }
              <Rail position='left'>
                <Stats
                  reviewRecordList={reviewRecordList}
                  peerCount={peers.length}
                  ipfsPeerCount={ipfsPeers.length}
                  bitswapPeerCount={bitswapPeers.length}
                  id={id}
                />
              </Rail>
              <Rail position='right'>
                <Segment>
                  <EventLog eventLog={debugLog} types={visibleMessageTypes} Component={InternalEvent}/>
                </Segment>
              </Rail>
            </Grid.Column>
          </Grid>
        </Container>
      </Router>
    );
  }
}

export default WithChluServiceNode(App);
