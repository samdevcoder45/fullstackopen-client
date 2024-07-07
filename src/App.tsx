import { useEffect, useRef, useState } from "react";
import Note from "./component/Note";
import noteService from "./services/notes";
import Notification from "./component/Notification";
import Footer from "./component/Footer";
import Form from "./component/form/Form";
import NoteForm from "./component/form/NoteForm";
import Togglable from "./component/Togglable";

interface INote {
  id: number;
  content: string;
  important: boolean;
}
export default function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState<null | string>("");
  const [user, setUser] = useState<null | object>(null);
  const noteFormRef = useRef<React.MutableRefObject<void>>()


  const addNote = (noteObject:object) => {
    noteFormRef?.current?.toggleVisibility()
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };


  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toggleImportanceOf = (id: number) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note?.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) =>
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      )
      .catch((error: unknown) => {
        console.log(error);
        setErrorMessage(
          `the note '${note?.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };


  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <Form setErrorMessage={setErrorMessage} setUser={setUser} />
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm 
              createNote={addNote}
            />
          </Togglable>
        </div>
      )}
      <div onClick={() => setShowAll(!showAll)}>
        <button>show {showAll ? "important" : "all"}</button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
}
