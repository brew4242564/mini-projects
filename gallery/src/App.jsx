import { useEffect, useState } from "react";
import { getCats } from "./services/catsApi";
const Header = () => (
  <div className="header">
    <p>Header :D</p>
  </div>
);

const PrevButton = ({ skip, decrementSkip }) => {
  if (skip > 0) {
    return <button onClick={decrementSkip}>Prev!</button>;
  }
};
const NextButton = ({ hasNext, incrementSkip }) => {
  if (hasNext) {
    return <button onClick={incrementSkip}>Next!</button>;
  }
};

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
  const [inputValue, setInputValue] = useState("");
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    async function loadCats() {
      const { cats, hasNext } = await getCats({ search, skip });
      setCats(cats);
      console.log(hasNext);
      setHasNext(hasNext);
    }
    loadCats();
  }, [search, skip]);

  const changeSearch = () => {
    setSkip(0);
    setSearch(inputValue);
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
        <NextButton hasNext={hasNext} incrementSkip={incrementSkip} />
        <PrevButton skip={skip} decrementSkip={decreaseSkip} />
      </div>
    </>
  );
}

export default App;
