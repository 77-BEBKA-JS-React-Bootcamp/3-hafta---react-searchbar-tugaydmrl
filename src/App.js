import { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://universities.hipolabs.com/search")
      .then((response) => response.json())
      .then((data) => setData(data.reduce((acc, value) => [...acc.concat(value)], [])));
  }

  return (
    <div className="App">
        <form class="search-form">
          <input 
            type="text" 
            className="search" 
            placeholder="Find a university"
            value={search}
            onChange={(text) => setSearch(text.target.value)} />
            {search == "" ? ( <li className="no-search">Filter for a university</li> ) : 
            (
              <ul className="suggestions">
                {data.filter((item) => item.name.includes(search) || item.country.includes(search)).map((item, key) => (<li key = {key}> {item.name} {item.country}</li>)) }
              </ul>
            )}
        </form>
    </div>
  );
}

export default App;
