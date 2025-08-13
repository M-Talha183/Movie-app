
function Search ({searchTrem , setSearchTrem}) {
    return (
        <div className="search">
            <div>
                <img src="/search.svg" alt="search" />
                <input type="text"
                placeholder="Search for movies..."
                value={searchTrem}
                onChange={(e) => setSearchTrem(e.target.value)}
                />
            </div>
        </div>
    )
}
export { Search };