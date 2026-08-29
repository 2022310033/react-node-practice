import { useState } from "react"
import SearchTab from "./components/SearchTab"
import NoteContainer from "./components/NoteContainer"
import AddNoteModal from "./components/AddNoteModal"

function App() {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false)
  const [reloadNotes, setReloadNotes] = useState(0)

  function handleNoteAdded() {
    setReloadNotes((current) => current + 1)
  }

  return (
    <>
    <main className="flex flex-col min-h-screen w-auto bg-amber-100">

      <header className="flex flex-row justify-between items-center w-full p-6">
          <button className="flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-600 text-white">N</button>
          <button
            type="button"
            aria-label="Open navigation"
            className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-xl text-black"
          >
            <span className="block h-0.5 w-6 rounded-full bg-current" />
            <span className="block h-0.5 w-6 rounded-full bg-current" />
            <span className="block h-0.5 w-6 rounded-full bg-current" />
          </button>
      </header>

      <div className="flex flex-col justify-center items-center">
          <SearchTab onOpenAddNote={() => setIsAddNoteOpen(true)} />
      </div>

      <div className="flex flex-1 flex-row gap-4 w-full p-4">
        <NoteContainer reloadNotes={reloadNotes} />
      </div>

      {isAddNoteOpen && (
        <AddNoteModal
          onClose={() => setIsAddNoteOpen(false)}
          onNoteAdded={handleNoteAdded}
        />
      )}
    </main>
    </>
  )
}

export default App
