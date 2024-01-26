export interface Note {
  _id: string,
  title: string,
  text: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

export interface NoteForm {
  title: string;
  text: string;
}

export interface NoteFormErrors {
  title?: string;
  text?: string;
}

export interface NoteList {
  notes: Note[];
}

export interface NoteListProps {
  notes: Note[];
}