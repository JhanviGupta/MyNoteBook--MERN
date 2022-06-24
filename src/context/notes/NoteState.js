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

// const getAllData = async () => {
//     const data = await axios.get("http://localhost:5000/api/notes/fetchallnotes", {
//         headers: {
//             'Content-Type': 'application/json',
//             'auth-token': localStorage.getItem('token')
//         },
//     })
//     setNote(data);
// }
// useEffect(() => {
//     getAllData()
// },[])

// // Add Note
// // const addNote = async (datas) => {
// //     console.log(note,"er")
// //     const data = await axios.post("http://localhost:5000/api/notes/createnotes",datas, {
// //         headers: {
// //             'Content-Type': 'application/json',
// //             'auth-token': localStorage.getItem('token')
// //         },
// //     })
// //     .then(response => response.json())
// //     .catch(err => console.log("error " + err));

// //     setNote(data);
// //     console.log("Adding!")
// //     console.log("2",note.data)
// //     const notes = {datas
// //     };
// //     setNote(note.data.concat(notes));

// // }
// const addNote = async (title, description, tag) => {
//     // TODO: API Call
//     const response = await fetch('http://localhost:5000/api/notes/createnotes', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'auth-token': localStorage.getItem('token')
//         },
//         body: JSON.stringify({ title, description, tag })
//     });
//     const json = response.json();
//     console.log(json)
//     // const notes = await response.json();
//     // setNote(note.concat(notes))
// }
// // Delete Note
// const deleteNote = async (id) => {
//     console.log("deleting " + id)
//     const data = await axios.delete(`http://localhost:5000/api/notes/deletenote/${id}`, {
//         headers: {
//             'Content-Type': 'application/json',
//             'auth-token': localStorage.getItem('token')
//         },
//     })

//     // const newNotes = note.data.filter((n) =>{ 
//     //     return n._id !== id
//     // })
//     setNote(data.data)
// }

// // Edit Note
// const editNote = async (id, title, description, tag) => {
//     const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'auth-token': localStorage.getItem('token')
//         },
//         body: JSON.stringify({ title, description, tag })
//     });
//     const json = response.json();
//     let newNotes = JSON.parse(JSON.stringify(note.data));
//     for (let index = 0; index < newNotes.length; index++) {
//         const element = newNotes[index];
//         if (element._id === id) {
//             newNotes[index].title = title;
//             newNotes[index].description = description;
//             newNotes[index].tag = tag;
//         }
//         break;
//     }
//     console.log(newNotes)
//     setNote(newNotes);
// }









//     const getAllData = async () => {
//         // API Call 
//         const response = await fetch('http://localhost:5000/api/notes/fetchallnotes', {
//           method: 'GET'
//         });
//         const json = await response.json() 
//         setNotes(json)
//       }

//       // Add a Note
//       const addNote = async (title, description, tag) => {
//         // TODO: API Call
//         // API Call 
//         const response = await fetch(`http://localhost:5000/api/notes/createnotes`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//            'auth-token': localStorage.getItem('token')
//           },
//           body: JSON.stringify({title, description, tag})
//         });

//         const note = await response.json();
//         setNotes(notes.concat(note.data))
//       }

//       // Delete a Note
//       const deleteNote = async (id) => {
//         // API Call
//         const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//            'auth-token': localStorage.getItem('token')
//           }
//         });
//         const json = response.json(); 
//         const newNotes = notes.filter((note) => { return note._id !== id })
//         setNotes(newNotes)
//       }

//       // Edit a Note
//       const editNote = async (id, title, description, tag) => {
//         // API Call 
//         const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//            'auth-token': localStorage.getItem('token')
//           },
//           body: JSON.stringify({title, description, tag})
//         });
//         const json = await response.json(); 

//          let newNotes = JSON.parse(JSON.stringify(notes))
//         // Logic to edit in client
//         for (let index = 0; index < newNotes.length; index++) {
//           const element = newNotes[index];
//           if (element._id === id) {
//             newNotes[index].title = title;
//             newNotes[index].description = description;
//             newNotes[index].tag = tag; 
//             break; 
//           }
//         }  
//         setNotes(newNotes);
//       }

//     return (
//         <noteContext.Provider value={{ notes, getAllData, addNote, deleteNote, editNote }}>
//             {props.children}
//         </noteContext.Provider>
//     )
// }

export default NoteState;