type SearchTabProps = {
    onOpenAddNote: () => void
    searchTerm: string
    onSearchChange: (value: string) => void
}

export default function SearchTab({ onOpenAddNote, searchTerm, onSearchChange }: SearchTabProps){

    return(
        <>
        <h2 className="font-display text-emerald-600 text-5xl">Notes</h2>
        <div className="flex w-full max-w-xs flex-row items-center justify-center gap-1 p-4">
            <button type="button" onClick={onOpenAddNote} className="w-16 shrink-0 whitespace-nowrap rounded-md bg-emerald-600 px-2 py-1 text-sm text-white text-center">Add</button>
            <input 
                type="search"
                placeholder="Search.."
                onChange={(event) => onSearchChange(event.target.value)}
                value={searchTerm}
                className="min-w-0 flex-1 rounded-md border-[1.5px] border-black px-2 py-1 text-sm"
            >
            </input>
        </div>
        </>
    )
}
