import React, { Component } from 'react';
import axios from 'axios';
import AllAlbums from './AllAlbums';
import SingleAlbum from './SingleAlbum';
import Sidebar from './Sidebar';
import Player from './Player';
import { HashRouter, Route, Link } from 'react-router-dom';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.selectAlbum = this.selectAlbum.bind(this);
		this.deselectAlbum = this.deselectAlbum.bind(this);
	}

	selectAlbum(albumId) {
		axios
			.get(`/api/albums/${albumId}`)
			.then(res => res.data)
			.then(album =>
				this.setState({
					selectedAlbum: album
				})
			);
	}

	deselectAlbum() {
		this.setState({ selectedAlbum: {} });
	}

	render() {
		return (
      <HashRouter>
			<div id="main" className="container-fluid">
				<div className="col-xs-2">
					<Sidebar deselectAlbum={this.deselectAlbum} />
				</div>				
					<div className="col-xs-10">
            <Route exact path="/" component={AllAlbums} />
						<Route exact path="/albums" component={AllAlbums} />
            <Route exact path="/albums/:albumId" component={SingleAlbum} />
            <Route exact path="/artists" component={AllArtists} />
            <Route exact path="/artists/:artistsId" component={SingleArtist} />
					</div>
				<Player />
			</div>
      </HashRouter>
		);
	}
}
