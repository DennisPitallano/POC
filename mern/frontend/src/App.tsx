import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Notes";
import styles from "./styles/NotePage.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  // [...]
  // Load notes on page load
  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.getNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert("Failed to load notes" + error);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
       NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete note" + error);
    }
  }

  // [...]

  return (
    <Container>
      <Row>
        <h1>Notes</h1>
      </Row>
      <Row style={{ paddingInline: "20px" }}>
        <Button onClick={() => setShowAddNoteDialog(true)}>Add Note</Button>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4" style={{ marginTop: "10px" }}>
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              note={note}
              className={styles.note}
              onDeleteNoteClicked= {() => deleteNote(note)}
            />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
