import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const {note, updateNote} = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="d-flex align-items-center">
                    <div className="card-body">{note.title}</div>
                    <i className="far fa-solid fa-trash-alt mx-2" onClick={() => { deleteNote(note._id)}}></i>
                    <i className="far fa-solid fa-pen-to-square mx-2" onClick={() => {updateNote(note)}}></i>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    )
}

export default NoteItem
