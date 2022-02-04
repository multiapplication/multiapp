const Searchbar = ({keyword, setKeyword, placeholder}) => {
    return (

        <div className="w-3/4 mt-5 h-10 pl-3 pr-2 bg-white border shadow-md rounded-full flex justify-between items-center relative">
            <input type="search" name="search" id="search" placeholder={placeholder}
                className="appearance-none w-full outline-none focus:outline-none active:outline-none"
                value={keyword}
                
                onChange={(e) => setKeyword(e.target.value)}
                
                />
            <button type="submit" className="ml-1 outline-none focus:outline-none active:outline-none">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </div>

    );
}

export default Searchbar;