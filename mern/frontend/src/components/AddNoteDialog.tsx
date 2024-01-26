import { Button, Form, Modal, ModalHeader } from "react-bootstrap";
import { Note } from "../models/notes";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";

interface AddNoteDialogProps {
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
  // onConfirm: () => void,
  // onDismiss: () => void,
  // onSave: () => void,
  //onCancel: () => void,
  // title: string,
  // text?: string
}

const AddNoteDialog = ({ onDismiss, onNoteSaved }: AddNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();

  const onSubmit = async (input: NoteInput) => {
    try {
      const noteResponse = await NotesApi.createNote(input);
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show onHide={onDismiss} backdrop="static" keyboard={false}>
      <ModalHeader closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Title is required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={3} {...register("text")} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onDismiss}>
          Close
        </Button>
        <Button
          type="submit"
          variant="primary"
          form="addNoteForm"
          disabled={isSubmitting}
        >
          Save Changes{" "}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteDialog;
