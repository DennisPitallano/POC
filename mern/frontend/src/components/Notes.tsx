import styles from "../styles/Note.module.css";
import stylesUtils from "../styles/utils.module.css";
import { Note as NoteModel } from "../models/notes";
import { Card } from "react-bootstrap";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel,
  onDeleteNoteClicked: (note: NoteModel) => void,
  className?: string
}

const Note = ({ note, onDeleteNoteClicked, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  let createdUpdated: string;
  if (updatedAt > createdAt) {
    createdUpdated = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdated = "Created: " + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={stylesUtils.flexCenter}>
          {title}
          <MdDelete
            className={`text-muted ms-auto`}
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted" style={{ fontSize: "12px" }}>
          {createdUpdated}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default Note;
