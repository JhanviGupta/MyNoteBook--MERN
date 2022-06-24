import React, { useContext, useState, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        props.showAlert("Added Successfully","success");
    }

    return (
        <div>
            <div className="container">
                <form className="m-3">
                    <h1>Add Note</h1>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="name" id="title" name="title" className="form-control" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" id="description" name="description" className="form-control" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" name="tag" className="form-control" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote;
