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
        <form onSubmit={addNote}>
            <input 
            value={newNote} 
            onChange={event=>setNewNote(event.target.value)} 
            />
        <button type="submit">save</button>
        </form>
    )
  }
  