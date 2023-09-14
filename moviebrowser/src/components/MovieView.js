import Hero from "./Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieView = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo]=useState("")
  const [trailer, setTrailer] = useState(false)

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=fe5ca6bab35c36c2c6bdadf2f56666b0&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        setIsLoading(false);
      });
  }, [id]);
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${movieDetails.id}/videos?api_key=fe5ca6bab35c36c2c6bdadf2f56666b0`)
    .then((response)=>response.json())
    .then((data)=>{
      if(data.results && data.results.length>0){
      setVideo(`https://www.youtube.com/embed/${data.results[0].key}`)
      }
    })
  },[movieDetails])
  const youTube = (e) => {
    e.preventDefault();
    setTrailer(true)

  }

  function renderMovieDetails() {
    if (isLoading) {
      return <Hero text="Loading..." />;
    }
    if (movieDetails) {
     
      const posterPath = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
      const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
      return (
        <>
          <Hero text={movieDetails.original_title} backdrop={backdropUrl} />
          <div className="container my-5">
            <div className="row">
              <div className=" image col-md-3">
                <img
                  src={posterPath}
                  alt="..."
                  className="img-fluid shadow rounded"
                />
              </div>
              <div className="col-md-9">
                <h2 className="title">{movieDetails.original_title}</h2>
                <p className="lead">{movieDetails.overview}</p>
              </div>
              
              <button className ="trailer" onClick ={youTube}>Watch Trailer</button>
              
            </div>
          </div>
          <div className="frame">
            {trailer &&(
          <iframe width="560" height="315" src={video} title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen></iframe>)}
          </div>
        </>
      );
    }
  }

  return renderMovieDetails();
};

export default MovieView;

