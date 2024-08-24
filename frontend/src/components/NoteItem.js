import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import '../App.css'; // Ensure this path is correct

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className='col-md-3'>
            <div className="card my-3 note-card">
                <div className="d-flex justify-content-between align-items-center card-header">
                    <h5 className="card-title">{note.title}</h5>
                    <div className="note-actions">
                        <i className="fas fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fas fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <span className="tag">{note.tag}</span>
                </div>
                <div className="card-body">
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
