import { useEffect, useState } from "react";

const Header = () => (
  <div className="header">
    <p>Header :D</p>
  </div>
);

const Body = () => <div>Body</div>;

const Footer = () => <div>Footer</div>;
const Gallery = ({ cats }) => (
  <>
    {cats.map((cat) => (
      <div key={cat.id}>
        <img src={`https://cataas.com/cat/${cat.id}`} alt="cat" />
      </div>
    ))}
  </>
);
function App() {
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    async function fetchCats() {
      const url = search
        ? `https://cataas.com/api/cats?tags=${search}`
        : `https://cataas.com/api/cats?limit=10`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(res.status);
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    }

    async function loadCats() {
      const kitty = await fetchCats();
      setCats(kitty);
    }
    loadCats();
  }, [search]);

  const changeSearch = ()=>{
    setSearch(inputValue)
  }
  const handleInputValue = (e) =>{
    setInputValue(e.target.value)
  }
  return (
    <>
      <Header />
      <Body />
      <Footer />
      <div>
        <h1>Test</h1>
        <div>
          <input type="text" value={inputValue} onChange={handleInputValue} />
          <button onClick={changeSearch}>Search</button>
        </div>
        <Gallery cats={cats} />
      </div>
    </>
  );
}

export default App;
