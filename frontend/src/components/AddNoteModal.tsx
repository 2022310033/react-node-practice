import { useState } from "react"

type AddNoteModalProps = {
    onClose: () => void
    onNoteAdded: () => void
}

export default function AddNoteModal({ onClose, onNoteAdded }: AddNoteModalProps){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")

        if (!title.trim()) {
            setError("Please add a title.")
            return
        }

        try {
            const response = await fetch("http://localhost:2000/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title.trim(), description: description.trim() }),
            })

            if (!response.ok) throw new Error("Failed to add note")

            onNoteAdded()
            onClose()
        } catch {
            setError("Could not add note. Please try again.")
        }
    }
    return(
        <>
        <div className="flex flex-col justify-center items-center fixed inset-0 bg-black/50">
            <div className="relative flex flex-col justify-center items-center bg-amber-100 p-4 w-md rounded-xl gap-3">

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close add note modal"
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-xl leading-none text-emerald-700 transition hover:bg-emerald-200 hover:text-emerald-900 focus:outline-none"
                >
                    ×
                </button>

                <div className="flex flex-row justify-between items-center w-full pt-2">
                    <h2 className="text-emerald-600 font-display text-2xl">Add Notes</h2>
                </div>          

                <form id="add-note-form" className="w-full" onSubmit={handleSubmit}>
                    <div className="my-3">
                        <h2 className="text-emerald-600 font-medium mb-1">Title</h2>
                        <input 
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Type the title here"
                            className="w-full border-[1.5px] border-[#f8e7b5] rounded-xl bg-[#f8e7b5] p-2 text-black"
                        >
                        </input>
                    </div>
                    <div className="my-3">
                        <h2 className="text-emerald-600 font-medium mb-1">Description</h2>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Type the description here"
                            className="w-full resize-none rounded-xl border-[#f8e7b5] bg-[#f8e7b5] p-2 text-black"
                        />
                    </div>
                    {error && <p className="text-sm text-red-700">{error}</p>}
                </form> 
                <div className="flex w-full justify-end">
                    <button type="submit" form="add-note-form" className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 sm:text-base">
                        Add
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}
