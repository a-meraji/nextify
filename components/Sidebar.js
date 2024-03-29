import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPllaylists] = useState([]);
  const [playlistID, setPlaylistID] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPllaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  console.log(playlistID);

  return (
    <div
      className="hidden md:inline-flex text-gray-500 p-5 text-sm lg:text-xs border-r 
      border-gray-900 overflow-y-scroll scrollbar-hide h-screen
      sm:max-w-[12rem] lg:max-w-[15rem]"
    >
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"></hr>

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create PlayList</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episode</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"></hr>
        {/* playlist */}
        {playlists.map((playlist) => (
          <p
            onClick={() => setPlaylistID(playlist.id)}
            key={playlist.id}
            className="cursor-pointer hover: text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
