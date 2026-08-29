import { useEffect, useState } from "react"

type Note = {
    id?: number | string
    title?: string
    description?: string
    body?: string
}

type NoteContainerProps = {
    reloadNotes: number
}

export default function NoteContainer({ reloadNotes }: NoteContainerProps) {
    const [notes, setNotes] = useState<Note[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

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

    if (loading) return <p className="text-black">Loading notes...</p>
    if (error) return <p className="text-red-700">{error}</p>

    return (
        <div className="flex w-full flex-wrap items-start gap-4">
            {notes.map((note, index) => (
            <article key={note.id ?? index} className="h-fit w-fit max-w-full rounded-xl bg-white p-3 text-black shadow-sm">
                    <h3 className="font-display text-lg text-emerald-700">
                        {note.title ?? "Untitled note"}
                    </h3>
                    <p className="mt-1 wrap-break-word text-sm">
                        {note.description ?? "No content"}
                    </p>
                </article>
            ))}
        </div>
    )
}
