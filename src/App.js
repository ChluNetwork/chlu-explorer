import React, { Component } from 'react';
import WithChluServiceNode from './components/WithChluServiceNode'
import Home from './components/Home'
import Stats from './components/Stats'
import { Grid, Segment, Rail, Icon, Header, Container } from 'semantic-ui-react'
import EventLog from './components/EventLog'
import InternalEvent from './components/InternalEvent'
import ReviewRecordLoader from './components/ReviewRecordLoader'
import Loading from './components/Loading'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    const {
      chluIpfs,
      reviewRecordList,
      debugLog,
      peers,
      ipfsPeers,
      libp2pPeers,
      lastReplicated,
      blockchainAccess,
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
                    path='/reviewrecord/:m'
                    render={({match}) => <ReviewRecordLoader multihash={match.params.m} chluIpfs={chluIpfs} getLatestVersion={false} />}
                  />
                  <Route
                    path='/review/:m'
                    render={({match}) => <ReviewRecordLoader multihash={match.params.m} chluIpfs={chluIpfs} />}
                  />
                  <Route
                    path='/v/:m'
                    render={({match}) => <Redirect to={'/review/' + match.params.m} />}
                  />
                  <Route
                    path='/'
                    render={props => <Home reviewRecords={reviewRecordList} chluIpfs={chluIpfs} {...props}/>}
                  />
                </Switch>
              }
              <Rail position='left'>
                <Stats
                  chluIpfs={chluIpfs}
                  reviewRecordList={reviewRecordList}
                  peerCount={peers.length}
                  ipfsPeerCount={ipfsPeers.length}
                  libp2pPeerCount={libp2pPeers.length}
                  lastReplicated={lastReplicated}
                  blockchainAccess={blockchainAccess}
                  id={id}
                />
              </Rail>
              <Rail position='right'>
                <Segment>
                  <EventLog eventLog={debugLog} Component={InternalEvent}/>
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
