import React, { useContext, memo } from 'react'
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import DeleteNote from './DeleteNote';
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const { notes,updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote,editNote } = context;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                </div>
                <div className="card-body col-md-6">
                    <FaTrashAlt className="pr-4" onClick={() => {deleteNote(notes._id); props.showAlert("Deleted Successfully!","success")}} />
                    <FaRegEdit onClick={() => {updateNote(notes)}}/>
                </div>
            </div>
        </div>
    )
}

export default memo(NoteItem);
