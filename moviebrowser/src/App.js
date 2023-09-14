import "./App.css";
import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutView from "./components/AboutView";
import SearchView from './components/SearchView';
import MovieView from './components/MovieView';
import WrongPage from './components/WrongPage';
import { Switch, Route } from "react-router-dom";

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=fe5ca6bab35c36c2c6bdadf2f56666b0&language=en-US&query=${searchText}&page=1&include_adult=false`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.results);
      });
  }, [searchText]);
  


  return (
    <div>
      <Navbar  searchText={searchText} setSearchText={setSearchText} setSearchResults={setSearchResults}/>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about" component={AboutView} />
        <Route path="/search">
          <SearchView keyword={searchText} searchResults={searchResults} />
        </Route>
        <Route path="/movies/:id" component={MovieView} />
        <Route component={WrongPage}/>

      </Switch>
    </div>
  );
}

export default App;
