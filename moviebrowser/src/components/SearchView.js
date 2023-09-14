import Hero from "./Hero";
import MisMatch from "./MisMatch";

import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  const detailUrl = `/movies/${movie.id}`
  const isPosterUrl= movie.poster_path
  const unavailbleUrl = 'https://images.unsplash.com/photo-1692303058998-ea47b94f6627?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  return (
    <div className="col-lg-3 col-md-3 col-2 my-4">
      <div className="card">
        <img src={isPosterUrl ? posterUrl : unavailbleUrl}  className="card-img-top" alt={movie.original_title} />
        <div className="card-body">
          <h5 className="card-title">{movie.original_title}</h5>
          <Link to={detailUrl} className="btn btn-primary">Show details</Link>
        </div>
      </div>
    </div>
  )
}


const SearchView = ({ keyword, searchResults }) => {
  const title = `You are searching ${keyword}`

  const resultsHtml = searchResults.map((obj, i) => {
    return <MovieCard movie={obj} key={i} />
  });

  return (
    <>
      <Hero text={title} />
      {resultsHtml &&
        <div className="container">
          <div className="row">
            {resultsHtml.length ?resultsHtml:<MisMatch/>}
          </div>
        </div> 
      } 
    </>
  );
};

export default SearchView;
