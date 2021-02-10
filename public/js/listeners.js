'use strict';

// Import functions
import { addNote, changeState, deleteNote, getId, getNote, init, updateNote, searchNote } from "./store.js"
import { generateTimestamp, removeAllChild } from "./utils.js";

const title = document.querySelector('#noteTitle');
const body = document.querySelector('#noteText');
const search = document.querySelector('#searchBar');
let noteBodyElement = document.getElementById("note-body");

window.onload = () => {
    init();
    noteBodyElement.scrollTop = -noteBodyElement.clientHeight;
}

// listener function and render notes into screen
window.addEventListener("reRenderNotes", e => {
    const parent = document.getElementById('view-notes-con');
    removeAllChild(parent);

    // render notes
    const htmlStr = e.detail.reduce((acc, item) => {
        const note = `<div class="note-container">
            <div class="note-text">
                <h2 class="note-title">${item.title}</h2>
                <p class="note-desc">${item.note}</p>
            </div>
            <div class="note-action">
                <button onclick="editNote(${item.id})" class="edit-btn btn">Edit</button>
                <button onclick="deleteNote(${item.id})" class="del-btn btn">Delete</button>
            </div>
        </div>`
        acc += note
        return acc
    }, '')
    parent.innerHTML = htmlStr
});

// add or update note
window.upsertNote = () => {
    if( title.value || note.value ){
        if (getId()) {
            updateNote({
                title: title.value,
                note: body.value,
            })
            changeState(null)
        } else {
            addNote({
                id: getId() || generateTimestamp(),
                title: title.value,
                note: body.value,
                createdAt: getId() || generateTimestamp()
            })
        }
        title.value = '';
        body.value = '';
    }
}

// edit note
window.editNote = id => {
    changeState(id)
    const note = getNote();
    title.value = note.title;
    body.value = note.note;
}

// delete note 
window.deleteNote = id => {
    deleteNote(id)
}

// search notes
search.addEventListener('keyup', e => {
    const { value } = e.target;
    searchNote(value);
})