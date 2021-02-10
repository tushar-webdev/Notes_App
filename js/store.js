'use strict';

let store = 'notes';
let textState = {
    id: null
}

// getting note id
export const getId = () => {
    return textState.id
}

// set note id
export const changeState = id => {
    textState.id = id
}

// custom listner function 
export const reRenderNotes = (data) => {
    const evt = new CustomEvent("reRenderNotes", {
        detail: data
    });

    window.dispatchEvent(evt)
}

// getting all notes
export const getNotes = () => {
    return JSON.parse(localStorage.getItem(store));
}

// iniital application and show all notes to screen
export const init = () => {
    const allNotes = getNotes();
    if (allNotes) {
        reRenderNotes(allNotes);
    } else {
        localStorage.setItem(store, `[]`)
        reRenderNotes([]);
    }
}

// get single note
export const getNote = () => {
    const notes = getNotes();
    return notes.find(note => note.id === textState.id)
}

// adding note
export const addNote = (note) => {
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem(store, JSON.stringify(notes))
    reRenderNotes(notes);
}

// update note
export const updateNote = (noteTobeUpdated) => {
    const allNotes = getNotes();
    allNotes.map(note => {
        if (note.id === textState.id) {
            const updatedNote = Object.keys(noteTobeUpdated).map(item => {
                return note[item] = noteTobeUpdated[item];
            })
            return updatedNote
        }

        return note
    })

    localStorage.setItem(store, JSON.stringify(allNotes))
    reRenderNotes(allNotes);
}

// delete note
export const deleteNote = (id) => {
    const allNotes = getNotes();
    const filteredNotes = allNotes.filter(note => note.id !== id && note)
    localStorage.setItem(store, JSON.stringify(filteredNotes))
    reRenderNotes(filteredNotes);
}

// search notes
export const searchNote = async query => {
    let allNotes = getNotes();
    if (query !== '') {
        allNotes = await allNotes.filter(item => {
            if (item.title.toLowerCase().includes(query.toLowerCase()) || item.note.toLowerCase().includes(query.toLowerCase())) {
                return item
            }
        })
    }
    reRenderNotes(allNotes);
}