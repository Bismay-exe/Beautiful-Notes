let notes = JSON.parse(localStorage.getItem("notes") || "[]");

const notesContainer = document.getElementById("notes-container");
const modal = document.getElementById("modal");
const addBtn = document.getElementById("add-btn");
const search = document.getElementById("search");

function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, i) => {
    const div = document.createElement("div");
    div.className = "note glass";
    div.innerHTML = `<h3>${note.title}</h3><p>${note.text}</p>`;
    div.onclick = () => openFullscreen(note.title, note.text);
    notesContainer.appendChild(div);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function saveNote() {
  const title = document.getElementById("note-title").value.trim();
  const text = document.getElementById("note-text").value.trim();
  if (!title && !text) return;
  notes.unshift({ title, text, date: Date.now() });
  modal.classList.remove("show");
  renderNotes();
}

function openFullscreen(title, text) {
  document.getElementById("fullscreen-title").innerText = title;
  document.getElementById("fullscreen-text").innerText = text;
  document.getElementById("fullscreen-view").classList.add("show");
}
function closeFullscreen() {
  document.getElementById("fullscreen-view").classList.remove("show");
}

function sortNotes(type) {
  if (type === "newest") notes.sort((a,b)=>b.date-a.date);
  if (type === "oldest") notes.sort((a,b)=>a.date-b.date);
  if (type === "title") notes.sort((a,b)=>a.title.localeCompare(b.title));
  renderNotes();
}

function clearNotes() {
  if (confirm("Delete all notes?")) {
    notes = [];
    renderNotes();
  }
}

search.addEventListener("input", () => {
  const query = search.value.toLowerCase();
  document.querySelectorAll(".note").forEach(note => {
    note.style.display = note.innerText.toLowerCase().includes(query) ? "block" : "none";
  });
});

addBtn.onclick = () => modal.classList.add("show");
window.onclick = e => { if(e.target===modal) modal.classList.remove("show"); };

renderNotes();
