import React, { Component } from 'react';
import axios from 'axios';
import AllAlbums from './AllAlbums';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import Sidebar from './Sidebar';
import Player from './Player';
import { HashRouter, Route, Link } from 'react-router-dom';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import NotFound from './NotFound';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HashRouter>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar deselectAlbum={this.deselectAlbum} />
          </div>
          <div className="col-xs-10">
            <Route exact path="/" component={StatefulAlbums} />
            <Route exact path="/albums" component={StatefulAlbums} />
            <Route path="/albums/:albumId" component={SingleAlbum} />
            <Route exact path="/artists" component={AllArtists} />
            <Route path="/artists/:artistsId" component={SingleArtist} />
            <Route path='/:invalid' component={NotFound}
             />
          </div>
          <Player />
        </div>
      </HashRouter>
    );
  }
}
