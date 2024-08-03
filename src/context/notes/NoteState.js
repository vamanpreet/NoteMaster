import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: 'GET',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5MjM1ZTNiOTJiNDViMTAzZThkOTJkIn0sImlhdCI6MTcyMDg1ODA4M30.tZRz1gXGM9AUWPfQaVLhyz0eTTWfau-y6e-k8lSRU9I',
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addNotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5MjM1ZTNiOTJiNDViMTAzZThkOTJkIn0sImlhdCI6MTcyMDg1ODA4M30.tZRz1gXGM9AUWPfQaVLhyz0eTTWfau-y6e-k8lSRU9I",
            },
            body: JSON.stringify({title, description, tag})
        });
        const note =  {
            "_id": "6693b77649w16283f70eb20f8",
            "user": "669235e3bk92b45b103e8d92d",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-07-14T11:33:10.487+00:00",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    // Delete a note
    const deleteNote = async (id) => {
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5MjM1ZTNiOTJiNDViMTAzZThkOTJkIn0sImlhdCI6MTcyMDg1ODA4M30.tZRz1gXGM9AUWPfQaVLhyz0eTTWfau-y6e-k8lSRU9I",
            },
        });
        const newNotes = notes.filter((note) => {return note._id !== id});
        setNotes(newNotes);
    }
    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5MjM1ZTNiOTJiNDViMTAzZThkOTJkIn0sImlhdCI6MTcyMDg1ODA4M30.tZRz1gXGM9AUWPfQaVLhyz0eTTWfau-y6e-k8lSRU9I",
            },
            body: JSON.stringify({title, description, tag})
        });
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <NoteContext.Provider value={{notes, setNotes, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;