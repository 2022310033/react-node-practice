import { useEffect, useState } from "react"
import EditNoteModal from "./EditNoteModal"

type Note = {
    id?: number | string
    title?: string
    description?: string
    body?: string
}

type NoteContainerProps = {
    reloadNotes: number
    searchTerm: string
}

export default function NoteContainer({ reloadNotes, searchTerm }: NoteContainerProps) {
    const [notes, setNotes] = useState<Note[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [editingNote, setEditingNote] = useState<Note | null>(null)

    useEffect(() => {
        async function fetchNotes() {
            setLoading(true)
            setError("")
            try {
                const response = await fetch("http://localhost:2000/notes")
                if (!response.ok) {
                    throw new Error("Failed to fetch notes")
                }
                const data = await response.json() as Note[]
                setNotes(data)
            } catch {
                setError("Could not load notes")
            } finally {
                setLoading(false)
            }
        }

        fetchNotes()
    }, [reloadNotes])

    async function handleDelete(noteId: number | string | undefined){
        if (noteId == undefined) return

        const response = await fetch(`http://localhost:2000/notes/${noteId}`,{
            method: "DELETE"
        })

        if (!response.ok) {
            setError("Could not delete note")
            return
        }

        setNotes((currentNotes) =>
            currentNotes.filter((note) => note.id !== noteId)
        )
    }

    const normalizedSearchTerm = searchTerm.trim().toLowerCase()
    const visibleNotes = notes.filter((note) =>
        `${note.title ?? ""} ${note.description ?? ""}`
            .toLowerCase()
            .includes(normalizedSearchTerm)
    )

    if (loading) return <p className="text-black">Loading notes...</p>
    if (error) return <p className="text-red-700">{error}</p>

    return (
        <div className="flex w-full flex-wrap items-start gap-4">
            {visibleNotes.map((note, index) => (
            <article key={note.id ?? index} className="flex h-fit w-fit max-w-md flex-col gap-2 rounded-xl bg-white p-3 text-black shadow-sm">
                <div className="flex w-full items-start justify-between gap-8">
                    <h3 className="min-w-0 max-w-32 flex-1 whitespace-normal font-display text-lg text-emerald-700">
                        {note.title ?? "Untitled note"}
                    </h3>
                    <div className="flex shrink-0 gap-2">
                        <button
                            type="button"
                            onClick={() => setEditingNote(note)}
                            className="text-sm text-emerald-700 hover:text-emerald-900">
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDelete(note.id)}
                            className="text-sm text-red-700 hover:text-red-900">
                            Delete
                        </button>
                    </div>
                </div>



                    <p className="wrap-break-word text-sm">
                        {note.description ?? "No content"}
                    </p>
                </article>
            ))}

            {visibleNotes.length === 0 && (
                <p className="text-black">No matching notes found.</p>
            )}

            {editingNote && (
                <EditNoteModal
                    note={editingNote}
                    onClose={() => setEditingNote(null)}
                    onNoteUpdated={(updatedNote) => {
                        setNotes((currentNotes) =>
                            currentNotes.map((currentNote) =>
                                String(currentNote.id) === String(updatedNote.id)
                                    ? updatedNote
                                    : currentNote
                            )
                        )
                    }}
                />
            )}
        </div>
    )
}
