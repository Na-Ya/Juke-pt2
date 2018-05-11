import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios';
import { HashRouter, Route, Link } from 'react-router-dom';

export default class SingleAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedAlbum: {} };
  }

  componentDidMount() {
    const albumId = this.props.match.params.albumId;
    axios
      .get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(selectedAlbum => {
        this.setState({ selectedAlbum });
      });
  }

  render() {
    const album = this.state.selectedAlbum;
    console.log(album);
    return (
      <div className="album">
        <div>
          <h3>{album.name}</h3>
          <img src={album.imageUrl} className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
