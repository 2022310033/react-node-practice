import { useState } from "react";

export default function SearchTab(){

const [search, setSearch] = useState("");

    return(
        <>
        <h2 className="font-display text-emerald-600 text-5xl">Notes</h2>
        <div className="flex w-full max-w-xs flex-row items-center justify-center gap-1 p-4">
            <button className="w-16 shrink-0 whitespace-nowrap rounded-md bg-emerald-600 px-2 py-1 text-sm text-white text-center">Add</button>
            <input 
                type="search"
                placeholder="Search.."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="min-w-0 flex-1 rounded-md border border-black px-2 py-1 text-sm"
            >
            </input>
        </div>
        </>
    )
}