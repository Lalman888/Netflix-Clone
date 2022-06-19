import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import YouTube from "react-youtube";



const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("")
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
    
  }, [fetchURL]);

  // console.log(movies);

  const opts = {
    height: "390",
    width: "80%",
    playerVars: {
       autoplay: 1,
    },
  };

  

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-transparent fill-slate-100 left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (<>
            <Movie item={item} key={id} trailerUrl={trailerUrl} setTrailerUrl={setTrailerUrl} setShowModal={setShowModal}  />
            </>
          ))}
          {/* <YouTube videoId='-1_s7kxfmEs' opts={opts} /> */}
        </div>
        
        
        <MdChevronRight
          onClick={slideRight}
          className="bg-transparent fill-slate-100 right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        
      </div>
     {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}  */}
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

export default Row;
