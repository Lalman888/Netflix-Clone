import axios from "axios";
import requests from "../Requests";
import React, { useEffect, useState } from "react";
import {BsFillPlayFill} from 'react-icons/bs'
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { AiOutlineClose } from "react-icons/ai";


const Main = () => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("")
  const [showModal, setShowModal] = useState(false);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  // console.log(movie)

  const handleClick = (movie) => {
    if(trailerUrl){
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.title || "")
      .then(url => {
         const urlParams = new URLSearchParams(new URL(url).search);
         setTrailerUrl(urlParams.get("v"));
      }).catch(error => console.log(error))
    }
  }
  const opts = {
    height: "390",
    width: "80%",
    playerVars: {
       autoplay: 1,
    },
  };


  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + ".";
    } else {
      return str;
    }
  };

  return (
    <>
      <div className="w-full h-[550px] text-white">
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] sm:bg-gradient-to-r from-black"></div>

          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.title}
          />
          <div className="absolute w-full top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
            <div className="my-4 flex">
              <button className="border bg-gray-300 text-black border-gray-300 py-2  px-7 flex items-center" onClick={() => handleClick(movie)}>
              <BsFillPlayFill size={30}  className="pr-1" />
                Play
              </button>
              <button className="border text-white border-gray-300 py-2 px-5 ml-4">
                Watch Later
              </button>
            </div>
            <p className="text-gray-400 text-sm ">
              Released: {movie?.release_date}
            </p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
              {truncateString(movie?.overview, 180)}
            </p>
          </div>
        </div>
      </div>

      <div>
     {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative bg-black p-[5%] my-6 mx-auto w-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                {/*header*/}
                
                   <div>
                   <p onClick={()=>setShowModal(false)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose className="cursor-pointer" /></p>
                   </div> 
                  
                
                <div className="w-full"> {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} </div>
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
     </div>

    </>
  );
};

export default Main;
