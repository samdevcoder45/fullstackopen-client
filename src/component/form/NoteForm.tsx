import { useState } from "react"

  export default function NoteForm({createNote}:{
    createNote:({content, important}:{content:string,important:boolean})=>void;
  }){

    const [newNote,setNewNote] = useState('')

    const addNote=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

        createNote({
            content:newNote,
            important:true
        })

        setNewNote('')
        
    }
        return (
        <div ddata-testid="formDiv">
          <h2>Create a new note</h2>
          
          <form onSubmit={addNote}>
            <input 
            placeholder="write note content here..."
            value={newNote} 
            onChange={event=>setNewNote(event.target.value)} 
            />
           <button type="submit">save</button>
          </form>
        </div>
    )
  }
  