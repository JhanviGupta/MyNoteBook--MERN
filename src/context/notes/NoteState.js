import noteContext from './NoteContext';
import { useState } from 'react';
import axios from 'axios';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getAllData = async () => {
    // API Call 
    const response = await axios.get(`${host}/api/notes/fetchallnotes`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    setNotes(response.data)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await axios.request({
      method: 'POST',
      url: `${host}/api/notes/createnotes`,
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      data: { title, description, tag }
    }
    );
    setNotes(notes.concat(response.data))
  }

  // Delete a Note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {

    const response = await axios.request(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      data: { title, description, tag }
    });
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
        break;
      }
    }
    setNotes(notes);
  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllData }}>
      {props.children}
    </noteContext.Provider>
  )

}

export default NoteState;