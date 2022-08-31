import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import { sendHoneyEvent } from "../services/HoneyEvents"
import Gallery from "./Gallery";
import Loader from "./Loader";

const Container = ({ searchTerm }) => {

  //Can use async await to capture time difference

  const { images, loading, runSearch } = useContext(PhotoContext);
  useEffect(() => {

    let endTime;
    let startTime;
    const fetchData = async () => {
      await runSearch(searchTerm);
      endTime = +new Date();
      let timeLapse = endTime - startTime;
      sendHoneyEvent("search-event", searchTerm, timeLapse);
    }

    startTime = +new Date();
    fetchData();
    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <div className="photo-container">
      {loading ? <Loader /> : <Gallery data={images} />}
    </div>
  );
};

export default Container;

