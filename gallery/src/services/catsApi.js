const BASE_URL = "https://cataas.com/api";
const LIMIT_RANDOM = 12;
const LIMIT_SEARCH = 13;

export async function getCats({ search, skip }) {
  if (search) {
    const url = `${BASE_URL}/cats?tags=${search}&limit=${LIMIT_SEARCH}&skip=${skip}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(res.status);
      }
      const data = await res.json();
      const hasNext = data.length === LIMIT_SEARCH;
      const cats = hasNext ? data.slice(0, LIMIT_SEARCH - 1) : data;
      return { cats, hasNext };
    } catch (error) {
      console.error("Error en getCats (search):", error);
      return { cats: [], hasNext: false };
    }
  }
  try {

    const fetchMaxValue = await fetch(`${BASE_URL}/count`);
    if (!fetchMaxValue.ok)
      throw new Error(`Error count: ${fetchMaxValue.status}`);

    const { count } = await fetchMaxValue.json();
    const maxValue = Math.max(0, (count - 20));
    const randomSkip = Math.floor(Math.random() * maxValue);
    const url = `${BASE_URL}/cats?limit=${LIMIT_RANDOM}&skip=${randomSkip}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error random: ${res.status}`);
    const data = await res.json();
    return { cats: data, hasNext: false };
  } catch (error) {
    console.error("Error en getCats (random):", error);
  }
}


export async function getTags(){
  try{
    const res = await fetch("https://cataas.com/api/tags");
    if(!res.ok) throw new Error(`Error tag: ${res.status}`);
    const data = await res.json();
    return data;
  }catch (error) {
    console.error("Error en getTags: ", error)
  }
}