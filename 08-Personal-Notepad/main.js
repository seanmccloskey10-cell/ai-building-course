// Idea Capture - main.js

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

const noteInput = document.getElementById('note-input');
const saveBtn = document.getElementById('save-btn');
const notesList = document.getElementById('notes-list');

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

function formatDate(date) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  const hour12 = hours % 12 || 12;
  return `${day} ${month} ${year} · ${hour12}:${minutes}${ampm}`;
}

function saveNote() {
  const content = noteInput.value.trim();
  if (!content) return;

  const note = {
    id: Date.now(),
    content: content,
    createdAt: new Date().toISOString()
  };

  notes.unshift(note);
  localStorage.setItem('notes', JSON.stringify(notes));
  noteInput.value = '';
  renderNotes();
}

function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
}

function renderNotes() {
  // Start from a clean slate each render.
  notesList.innerHTML = '';

  if (notes.length === 0) {
    // This block is fixed text we wrote ourselves, so building it as HTML is
    // safe - there's no user input in it.
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `
      Your million dollar idea<br>
      starts with one note.
      <span class="emoji">💸</span>
      What's on your mind?
      <span class="emoji">💭</span>
    `;
    notesList.appendChild(empty);
    return;
  }

  // IMPORTANT: a note's text is whatever the user typed, so we must NEVER drop
  // it into innerHTML. If someone typed something that looks like HTML - say
  // "<img src=x onerror=...>" - innerHTML would run it. Using textContent means
  // the browser shows those characters literally and never treats them as code.
  // (This is the difference between displaying text and executing markup.)
  notes.forEach(note => {
    const noteEl = document.createElement('div');
    noteEl.className = 'note';

    const p = document.createElement('p');
    p.className = 'note-content';
    p.textContent = note.content;   // safe: shown as text, never run as HTML

    const footer = document.createElement('div');
    footer.className = 'note-footer';

    const date = document.createElement('span');
    date.className = 'note-date';
    date.textContent = formatDate(note.createdAt);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteNote(note.id));

    footer.appendChild(date);
    footer.appendChild(deleteBtn);
    noteEl.appendChild(p);
    noteEl.appendChild(footer);
    notesList.appendChild(noteEl);
  });
}

// Event listeners
saveBtn.addEventListener('click', saveNote);
noteInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') saveNote();
});

// Initial render
renderNotes();
