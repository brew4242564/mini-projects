import { useEffect, useState } from "react";
// services
import { getCats } from "./services/catsApi";
// components
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Gallery from "./components/Gallery";
import MainContent from "./components/MainContent";
// css
import "./App.css";
import Sidebar from "./components/Sidebar";
import Tags from "./components/Tags";
function App() {
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [bookmark, setBookmarks] = useState(() => {
    const localData = localStorage.getItem("bookmarks");
    return localData ? JSON.parse(localData) : [];
  });
  const [view, setView] = useState("gallery");

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmark));
  }, [bookmark]);

  const renderView = () => {
    switch (view) {
      case "gallery":
        return (
          <Gallery
            cats={cats}
            onBookmark={onBookmark}
            setTag={changeSearch}
            skip={skip}
            decreaseSkip={decreaseSkip}
            incrementSkip={incrementSkip}
            search={search}
            hasNext={hasNext}
            handleRefresh={handleRefresh}
            view={view}
            bookmark={bookmark}
          />
        );
      case "tags":
        return <Tags setTag={changeSearch}/>;
      case "bookmarks":
        return (
          <Gallery
            cats={bookmark}
            onBookmark={onBookmark}
            setTag={changeSearch}
            skip={skip}
            decreaseSkip={decreaseSkip}
            incrementSkip={incrementSkip}
            search={search}
            hasNext={hasNext}
            handleRefresh={handleRefresh}
            view={view}
            bookmark={bookmark}
          />
        );
    }
  };

  useEffect(() => {
    async function loadCats() {
      const { cats, hasNext } = await getCats({ search, skip });
      setCats(cats);
      console.log(hasNext);
      setHasNext(hasNext);
    }
    loadCats();
  }, [search, skip, refreshKey]);

  const changeSearch = (tag) => {
    setSkip(0);
    setView("gallery");
    if (tag) {
      setSearch(tag);
    } else {
      setSearch(inputValue);
    }
  };
  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const incrementSkip = () => {
    const increment = 5;
    setSkip((prev) => prev + increment);
  };

  const decreaseSkip = () => {
    const decrease = 5;
    setSkip((prev) => prev - decrease);
  };
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // css
  const [isSidebar, setIsSidebar] = useState(false);

  const handleSidebar = () => {
    setIsSidebar((prev) => !prev);
  };

  const onBookmark = (clickedCat) => {
    const isBookmarked = bookmark.some((fav) => fav.id === clickedCat.id);
    if (isBookmarked) {
      setBookmarks((prev) => prev.filter((fav) => fav.id !== clickedCat.id));
    } else {
      setBookmarks((prev) => [...prev, clickedCat]);
    }
  };

  const handleView = (newView) => {
    setSearch("");
    setView(newView);
  };


  return (
    <>
      <Header handleSidebar={handleSidebar}>
        <SearchBar
          inputValue={inputValue}
          handleInputValue={handleInputValue}
          changeSearch={changeSearch}
          text={"🔎"}
        />
      </Header>
      <MainContent>
        <Sidebar isSidebar={isSidebar} view={handleView} />
        {renderView()}
      </MainContent>
    </>
  );
}

export default App;
