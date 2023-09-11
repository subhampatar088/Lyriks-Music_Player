/* eslint-disable no-restricted-syntax */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable curly */
/* eslint-disable spaced-comment */
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error: err,
  } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails)
    return <Loader title="Loading Artist Details...." />;

  if (err) return <Error />;

  let data;
  if (
    typeof artistData?.resources?.songs !== 'undefined' &&
    artistData?.resources?.songs !== null
  ) {
    data = Object.values(artistData?.resources?.songs);
  }
  console.log('artist', artistData);
  console.log('v2', data);
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        // handlePauseClick={handlePauseClick}
        // handlePlay={() => handlePlayClick(artistData?.resources?.songs, i)}
      />
    </div>
  );
};

export default ArtistDetails;
