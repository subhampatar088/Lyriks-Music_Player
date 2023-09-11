/* eslint-disable no-restricted-syntax */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable curly */
/* eslint-disable spaced-comment */
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetTopChartsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error: err,
  } = useGetSongDetailsQuery({ songid }); //PROVIDING LYRICS

  //i have to use this api again bcz the above api endpoint is not giving me song
  //coverart, title and subtitle
  const { data, isFetching, error } = useGetTopChartsQuery();

  // const {
  //   data: relatedSongData,
  //   isFetching: isFetchingRelatedSongs,
  //   error: err2,
  // } = useGetSongRelatedQuery({ songid });
  //console.log('related', relatedSongData);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetching || isFetchingRelatedSongs)
    return <Loader title="Loading Song Details...." />;

  if (err || error || err2) return <Error />;

  let currSong;
  for (const song of data?.tracks || []) {
    if (song.key === songid) {
      currSong = song;
      break;
    }
  }

  let lyricsKeys;
  if (
    typeof songData?.resources.lyrics !== 'undefined' &&
    songData?.resources.lyrics !== null
  ) {
    lyricsKeys = Object.keys(songData.resources.lyrics);
  }
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={currSong} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bol">Lyrics:</h2>
        <div className="mt-5">
          {songData?.resources?.lyrics !== undefined ? (
            songData?.resources.lyrics[lyricsKeys[0]].attributes.text.map(
              (line) => <p className="text-gray-400 text-base my-1">{line}</p>
            )
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!!
            </p>
          )}
        </div>
      </div>
      {/* <RelatedSongs
        data={relatedSongData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      /> */}
    </div>
  );
};

export default SongDetails;
