import React, { useContext, useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import noteContext from '../context/notes/NoteContext';
import Notes from './Notes';
import axios from 'axios';
import AddNote from './AddNote';

export default function Home(props) {
    const context = useContext(noteContext);
    const [note, setNote] = useState()
    const { showAlert } = props;
    return (
        <div>
            <Notes showAlert={showAlert} />
        </div>
    )
}
