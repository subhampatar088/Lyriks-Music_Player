/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-restricted-syntax */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable curly */
/* eslint-disable spaced-comment */
import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader } from '../components';

import {
  useGetSongDetailsQuery,
  useGetTopChartsQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const { songid } = useParams();
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error: err,
  } = useGetSongDetailsQuery({ songid }); //PROVIDING LYRICS

  //i have to use this api again bcz the above api endpoint is not giving me song
  //coverart, title and subtitle
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetchingSongDetails || isFetching)
    return <Loader title="Loading Song Details...." />;

  if (err || error) return <Error />;

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
