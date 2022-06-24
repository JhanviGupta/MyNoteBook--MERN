import React, { useContext, useRef, useState, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, editNote, getAllData } = context;
    const ref = useRef(null);
    const refClose = useRef(null)
    const navigate = useNavigate();
    const [note, setNotes] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllData();
        }
        else{
            navigate('/login');
        }
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNotes({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        refClose.current.click();
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Updated Successfully!","success")
    }

    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit
                </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="m-3">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="name" name="etitle" value={note.etitle} className="form-control" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" name="edescription" value={note.edescription} className="form-control" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tag</label>
                                    <input type="text" name="etag" value={note.etag} className="form-control" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>Your Notes</h2>
                {notes.length == 0 && <div className="container">No Data!</div>}
                {notes.map((note, key) => {
                    return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} notes={note} />;
                })}
            </div>
        </>
    )
}
export default Notes;
