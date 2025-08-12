import { Search } from "./components/Search.jsx";
import { useState } from "react";

function App () {
  const [searchTrem , setSearchTrem] = useState("");

  return (
    <main>
        <div className="pattern"/>

        <div className="wrapper">
          <header>
            <img src="/hero.png" alt="" />
            <h1>Find <span className="text-gradient">Movies</span>You have Enjoy without the Hassle</h1>
          </header>
          <Search searchTrem={searchTrem} setSearchTrem={setSearchTrem}/>
          
        </div>

    </main>
  )
}

export default App