import { Note } from "../models/notes";

async function fetchNotes(intput: RequestInfo, init?: RequestInit) {
  const response = await fetch(intput, init);
  if (!response.ok) {
    const error = await response.json();
    const errorMessage = `An error has occured: ${error.error}`;
    throw new Error(errorMessage);
  }
  return response;
}

export async function getNotes(): Promise<Note[]> {
  const response = await fetchNotes("/api/notes", {
    method: "GET",
  });
  return response.json();
}

export async function getNote(id: string) {
  const response = await fetchNotes(`/api/notes/${id}`, {
    method: "GET",
  });
  return response.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchNotes("/api/notes", {
    method: "POST",
    body: JSON.stringify(note), // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function updateNote(id: string, note: NoteInput): Promise<Note> {
  const response = await fetchNotes(`/api/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(note),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function deleteNote(id: string) {
  await fetchNotes(`/api/notes/${id}`, {
    method: "DELETE"
  });
}
