import React from 'react';
import axios from 'axios';
import { Button, Form, Label, Icon } from 'semantic-ui-react';

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

  componentWillReceiveProps(newProps) {
    this.setState({notes: newProps.notes})
  }

  addNote() {
    axios.post('/notes', {appId: this.props.app.id, text: this.state.notesText, userId: this.props.app.user_id})
    .then(() => this.props.getUserData())
    .then(() => this.setState({notesText: ''}))
    .catch((err) => console.error(err))
  }

  deleteNote(noteId) {
    axios.delete('/note', {params: {id: noteId}})
    .then(() => this.props.getUserData())
  }

  render() {
    return (
      <div>
        <h2>Add a note to this entry</h2>
        <Form>
          <Form.Input fluid label="Notes Description" placeholder="Notes Description" value={this.state.notesText} onChange={(e) => this.setState({notesText: e.target.value})}></Form.Input>
          <Button onClick={this.addNote}>Submit</Button>
        </Form>
        <h2>Notes:</h2>
        {(() => {
          if (this.state.notes.length > 0) {
            return this.state.notes.map((note, i) => (
              <Label key={i}>
                {note.note_text}
                <Icon name="delete" onClick={()=>this.deleteNote(note.id)} />
              </Label>
            ))
          } else {
            return <div>You have not added any notes to this job application yet.</div>
          }
        })()}
      </div>
    )
  }
}

export default Notes;
