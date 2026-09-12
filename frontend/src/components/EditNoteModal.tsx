import { useState } from "react"

type Note = {
    id?: number | string
    title?: string
    description?: string
}

type EditNoteModalProps = {
    note: Note
    onClose: () => void
    onNoteUpdated: (updatedNote: Note) => void
}

export default function EditNoteModal({ note, onClose, onNoteUpdated }: EditNoteModalProps) {
    const [title, setTitle] = useState(note.title ?? "")
    const [description, setDescription] = useState(note.description ?? "")
    const [error, setError] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")

        if (!title.trim()) {
            setError("Please add a title.")
            return
        }

        setIsSaving(true)

        try {
            const response = await fetch(`http://localhost:2000/notes/${note.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.trim(),
                    description: description.trim(),
                }),
            })

            if (!response.ok) throw new Error("Failed to update note")

            const updatedNote = await response.json() as Note
            onNoteUpdated(updatedNote)
            onClose()
        } catch {
            setError("Could not update note. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50">
            <div className="relative flex w-md flex-col items-center justify-center gap-3 rounded-xl bg-amber-100 p-4">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close edit note modal"
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-xl leading-none text-emerald-700 transition hover:bg-emerald-200 hover:text-emerald-900 focus:outline-none"
                >
                    ×
                </button>

                <div className="flex w-full flex-row items-center justify-between pt-2">
                    <h2 className="font-display text-2xl text-emerald-600">Edit Note</h2>
                </div>

                <form id="edit-note-form" className="w-full" onSubmit={handleSubmit}>
                    <div className="my-3">
                        <h2 className="mb-1 font-medium text-emerald-600">Title</h2>
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            className="w-full rounded-xl border-[1.5px] border-[#f8e7b5] bg-[#f8e7b5] p-2 text-black"
                        />
                    </div>
                    <div className="my-3">
                        <h2 className="mb-1 font-medium text-emerald-600">Description</h2>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            className="w-full resize-none rounded-xl border-[#f8e7b5] bg-[#f8e7b5] p-2 text-black"
                        />
                    </div>
                    {error && <p className="text-sm text-red-700">{error}</p>}
                </form>

                <div className="flex w-full justify-end">
                    <button
                        type="submit"
                        form="edit-note-form"
                        disabled={isSaving}
                        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50 sm:text-base"
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    )
}
