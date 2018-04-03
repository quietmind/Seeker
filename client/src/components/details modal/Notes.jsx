import React from 'react';
import axios from 'axios';

class Notes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        notesText: '',
        notes: [...props.notes]
    }
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  addNote() {
    axios.post('/notes', {appId: this.props.app.id, text: this.state.notesText, userId: this.props.app.user_id})
    .then(() => this.props.handleClick())
    .then(() => this.setState({notesText: ''}))
    .catch((err) => console.error(err))
  }

  deleteNote(noteId) {
    axios.delete('/notes', {data: {id: noteId}})
    .then((response) => this.setState({notes: this.state.notes.filter((note)=> note.id !== noteId)}))
  }

  render() {
    return (
      <div>
        <p>Add a note to this entry</p>
        <input type="text" value={this.state.notesText} placeholder="Notes Description" onChange={(e) => this.setState({notesText: e.target.value})}></input>
        <button onClick={this.addNote}>Submit</button>
      <h1>Notes:</h1>
      {this.state.notes.map((note, i) => (
        <li>
          <p key={i} >{note.note_text}</p>
          <button type="close" onClick={()=>this.deleteNote(note.id)}>X</button>
        </li>
      ))}
      </div>
    )
  }
}

export default Notes;