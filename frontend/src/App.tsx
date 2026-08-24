
import { useEffect, useMemo, useState } from 'react'

type Note = {
  id?: number | string
  title?: string
  content?: string
  body?: string
  description?: string
  created_at?: string
  createdAt?: string
}

const API_URL = 'http://localhost:2000/notes'
const cardColors = ['bg-[#dfe9dd]', 'bg-[#f5e8a9]', 'bg-[#f5d6c7]']

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadNotes = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Could not load notes')

      const data: unknown = await response.json()
      setNotes(Array.isArray(data) ? data : [])
    } catch {
      setError('We could not connect to your notes right now.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => void loadNotes(), 0)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return notes

    return notes.filter((note) =>
      [note.title, note.content, note.body, note.description].some((value) =>
        value?.toLowerCase().includes(query),
      ),
    )
  }, [notes, search])

  const formatDate = (note: Note) => {
    const date = note.created_at ?? note.createdAt
    if (!date) return 'No date'

    const parsedDate = new Date(date)
    return Number.isNaN(parsedDate.getTime())
      ? 'No date'
      : parsedDate.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
  }


  return (
    <main className="min-h-screen bg-[#f4f5ef] bg-[radial-gradient(circle_at_84%_7%,#e2ead8_0,transparent_27%)] px-[18px] py-5 text-[#1e2d29] sm:px-6 sm:py-7">
      <section className="mx-auto max-w-[1080px]" aria-labelledby="page-title">
        <header className="flex items-center justify-between border-b border-[#dfe4dc] pb-[18px]">
          <a className="flex items-center gap-2.5 font-mono text-sm font-medium uppercase tracking-[.04em] text-[#1e2d29] no-underline" href="/" aria-label="Notes home">
            <span className="grid size-[30px] place-items-center bg-[#1e2d29] font-display text-[15px] font-semibold text-[#f4f5ef]">N</span>
            <span>Notes</span>
          </a>
          <button className="border border-[#1e2d29] bg-transparent px-[15px] py-[9px] font-mono text-[11px] font-medium uppercase tracking-[.04em] text-[#1e2d29] transition-colors hover:bg-[#1e2d29] hover:text-white disabled:cursor-wait disabled:opacity-50" type="button" onClick={() => void loadNotes()} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </header>

        <div className="py-16 sm:py-[82px]">
          <p className="mb-[18px] font-mono text-[11px] font-medium uppercase tracking-[.08em] text-[#75827c]">Your personal space</p>
          <h1 className="mb-[21px] max-w-[600px] font-display text-[clamp(48px,8vw,88px)] font-medium leading-[.96] tracking-normal" id="page-title">A clear mind<br /><em className="text-[#8b9c82]">starts here.</em></h1>
          <p className="m-0 max-w-[360px] font-body text-[15px] leading-[1.6] text-[#75827c]">Keep the ideas worth coming back to, all in one quiet place.</p>
        </div>

        <div className="flex items-center justify-between gap-5 border-y border-[#dfe4dc] py-4">
          <label className="flex max-w-[310px] items-center gap-2.5 text-[#75827c]">
            <span className="-rotate-20 text-[25px] leading-none" aria-hidden="true">⌕</span>
            <input
              className="w-full border-0 bg-transparent font-body text-sm text-[#1e2d29] outline-none placeholder:text-[#9ca7a0]"
              type="search"
              placeholder="Search your notes"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search your notes"
            />
          </label>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[.08em] text-[#75827c]">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
        </div>

        {error && (
          <div className="mt-5 flex items-center justify-between gap-5 border border-[#dbb9ad] bg-[#f8e7df] px-4 py-3.5 font-body text-sm text-[#854f44]" role="alert">
            <span>{error}</span>
            <button className="shrink-0 border border-[#854f44] bg-transparent px-[15px] py-[9px] font-mono text-[11px] uppercase tracking-[.04em] text-[#854f44] transition-colors hover:bg-[#854f44] hover:text-white" type="button" onClick={() => void loadNotes()}>Try again</button>
          </div>
        )}

        {isLoading ? (
          <div className="px-5 py-16 text-center font-body text-sm text-[#75827c]" role="status">Gathering your notes...</div>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 gap-[18px] pt-7 md:grid-cols-3">
            {filteredNotes.map((note, index) => (
              <article className={`min-h-[205px] border border-[rgba(30,45,41,.07)] p-[22px] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_15px_28px_rgba(30,45,41,.09)] md:min-h-[245px] ${cardColors[index % cardColors.length]}`} key={note.id ?? `${note.title}-${index}`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[.08em] text-[#75827c]">{formatDate(note)}</span>
                  <span className="size-[7px] rounded-full bg-[#1e2d29] opacity-55" aria-hidden="true" />
                </div>
                <h2 className="mb-3 mt-[38px] font-display text-[25px] font-semibold leading-[1.1] md:mt-[50px]">{note.title || 'Untitled note'}</h2>
                <p className="m-0 font-body text-sm leading-[1.6] text-[#50605a]">{note.content || note.body || note.description || 'This note is waiting for its first thought.'}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="px-5 py-16 text-center font-body text-sm text-[#75827c]">
            <span className="mb-3.5 block text-[27px] text-[#9bab91]" aria-hidden="true">✦</span>
            <h2 className="mb-2 font-display text-[26px] font-medium text-[#1e2d29]">{search ? 'No notes found' : 'Your notebook is empty'}</h2>
            <p className="m-0">{search ? 'Try a different search term.' : 'Your next idea will have a place to land.'}</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
