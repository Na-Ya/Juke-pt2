import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter, Route, Link, NavLink } from 'react-router-dom';
import Songs from './Songs';
import AllAlbums from './AllAlbums';

export default class SingleArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: {},
      artistsAlbums: [],
      artistsSongs: [],
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
          artist,
        });
      })
      .catch(console.error);
  }

  render() {
    const { artistsAlbums, artistsSongs, artist } = this.state;
    return (
      <div>
        <h3>{artist.name}</h3>
        <ul className="nav nav-tabs">
          <li>
            <NavLink to={`/artists/${artist.id}/albums`}>ALBUMS</NavLink>
          </li>
          <li>
            <NavLink to={`/artists/${artist.id}/songs`}>SONGS</NavLink>
          </li>
        </ul>
        <Route
          path={`/artists/${artist.id}/albums`}
          render={() => <AllAlbums albums={artistsAlbums} />}
        />
        <Route
          path={`/artists/${artist.id}/songs`}
          render={() => <Songs songs={artistsSongs} />}
        />
      </div>
    );
  }
}
