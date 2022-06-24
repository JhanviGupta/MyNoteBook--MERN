import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import Notes from './Notes';

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
