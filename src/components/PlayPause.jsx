/* eslint-disable arrow-body-style */
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({
  song,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
}) => {
  return isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={22} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={22} className="text-gray-300" onClick={handlePlay} />
  );
};
export default PlayPause;
