import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = 'https://notemaster-backend-o15d.onrender.com';
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
                method: 'GET',
                headers: {
                    'auth-token': token,
                }
            });
    
            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
            setNotes([]);
        }
    };
    

    // Add a note
    const addNote = async (title, description, tag) => {
        const token = localStorage.getItem('token'); 
        const response = await fetch(`${host}/api/notes/addNotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token,
            },
            body: JSON.stringify({ title, description, tag: tag || 'General' })
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    };

    // Delete a note
    const deleteNote = async (id) => { 
        const token = localStorage.getItem('token'); 
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token,
            },
        });

        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        const token = localStorage.getItem('token'); 
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token,
            },
            body: JSON.stringify({ title, description, tag })
        });

        let newNotes = [...notes];
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index] = { ...element, title, description, tag };
                break;
            }
        }
        setNotes(newNotes);
    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
