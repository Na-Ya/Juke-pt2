import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter, Route, Link } from 'react-router-dom';
import Songs from './Songs';

export default class SingleArtist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			artist: {},
			artistsAlbums: [],
			artistsSongs: []
		};
	}

	componentDidMount() {
		const artistId = this.props.match.params.artistsId;
		const selectedArtist = axios
			.get(`/api/artists/${artistId}`)
			.then(res => res.data);
		const albums = axios
			.get(`/api/artists/${artistId}/albums`)
			.then(res => res.data);

		const songs = axios
			.get(`/api/artists/${artistId}/songs`)
			.then(res => res.data);

		Promise.all([albums, songs, selectedArtist])
			.then(resultData => {
				const [artistsAlbums, artistsSongs, artist] = resultData;
				this.setState({
					artistsAlbums,
					artistsSongs,
					artist
				});
			})
			.catch(console.error);
	}

	render() {
		const { artistsAlbums, artistsSongs, artist } = this.state;
		console.log(artistsAlbums, artistsSongs, artist);
		return (
			<div>
				<h3>{artist.name}</h3>
				{artistsAlbums.map(album => {
					return <h4 key={album.id}> {album.name} </h4>;
				})}
				<h4>Songs</h4>
                <Songs songs={artistsSongs} />
			</div>
		);
	}
}
