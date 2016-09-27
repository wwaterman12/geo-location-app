import React, { Component } from 'react';
import { withRouter } from 'react-router';
import request from 'superagent';
import firebase from '../../firebase.config.js';


class Note extends Component {
  constructor() {
    super();
    this.state = {
      localTitle: '',
      localContent: '',
      localId: '',
      localLatitude: '',
      localLongitude: '',
    }
    this.submit = this.submit.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  submit(e) {
    e.preventDefault();
    let database = firebase.database().ref();
    let notesRef = database.child("notes");
    let newNoteRef = notesRef.push();
    newNoteRef.set({
      title: this.state.localTitle,
      content: this.state.localContent,
      latitude: this.state.localLatitude,
      longitude: this.state.localLongitude,
    })
    this.props.router.push('/notelist')
  }

  componentDidMount() {
    this.getCoords();
  }

  updateContent(e) {
    const newContent = e.target.value;
    this.setState( {
      localContent: newContent,
    });
  }

  updateTitle(e) {
    const newTitle = e.target.value;
    this.setState( {
      localTitle: newTitle,
    });
  }

  getCoords() {
    const self = this;
    let newLat = '';
    let newLong = '';
    function success(pos) {
      let lat = pos.coords.latitude;
      let long = pos.coords.longitude;
      console.log('lat' + lat);
      console.log('long' + long);
      newLat = lat;
      newLong = long;
      self.setState({
        localLatitude: newLat,
        localLongitude: newLong,
      })
    }
    navigator.geolocation.getCurrentPosition(success);
  }


  render() {
    return (
      <div>
        <form id='new-note' onSubmit={this.submit}>
          <input
            type="text"
            name="title"
            value={this.state.localTitle}
            onChange={this.updateTitle}
          />
          <input
            type="text"
            name="content"
            value={this.state.localContent}
            onChange={this.updateContent}
          />
          <input
            type="submit"
            value="SAVE"
            className="hidden"
          />
        </form>
      </div>
      )
  }
}


export default withRouter(Note);
