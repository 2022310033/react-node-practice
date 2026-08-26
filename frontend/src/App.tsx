import SearchTab from "./components/SearchTab"

function App() {
  return (
    <>
    <main className="flex flex-col min-h-screen w-auto bg-amber-100">

      <header className="flex flex-row justify-between items-center w-full p-6">
          <button className="flex h-13 w-13 items-center justify-center rounded-full bg-emerald-600 text-white">N</button>
          <h2 className="text-black">Navigation</h2>
      </header>

      <div className="flex flex-col justify-center items-center">
          <SearchTab />
      </div>


    </main>
    </>
  )
}

export default App
