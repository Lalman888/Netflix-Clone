import axios from "axios";
import React, { useEffect, useState } from "react";
import Tvseries from "./Tvseries";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import YouTube from "react-youtube";

const TvRow = ({ title,fetchTVURL, rowID }) => {
  const [tv, setTv] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("")

  useEffect(() => {
   
    axios.get(fetchTVURL).then((response) => {
      setTv(response.data.results);
    });
  }, [fetchTVURL]);

  
  console.log(tv);
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
          {tv.map((item, ids) => (<>
            <Tvseries item={item} key={ids} trailerUrl={trailerUrl} setTrailerUrl={setTrailerUrl} />
            </>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-transparent fill-slate-100 right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
      {trailerUrl && <YouTube videoId="m9EX0f6V11Y" opts={opts} />} 
    </>
  );
};

export default TvRow;
