import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_VIDEOS_API_BY_ID } from "../utils/constants";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const Watch = () => {
  const [searchParams] = useSearchParams();

  const [videos, setVideos] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
    getVideoById();
  }, []);

  const getVideoById = async () => {
    const data = await fetch(
      YOUTUBE_VIDEOS_API_BY_ID + "&id=" + searchParams.get("v")
    );
    const json = await data.json();

    setVideos(json.items[0].snippet.title);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-5 flex w-full">
        <div className="w-full">
          <iframe
            width="1000"
            height="500"
            src={"https://www.youtube.com/embed/" + searchParams.get("v")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="font-bold text-xl">{videos}</div>
        </div>
        <div className="w-full">
          <LiveChat />
        </div>
      </div>
      <CommentsContainer />
    </div>
  );
};

export default Watch;
