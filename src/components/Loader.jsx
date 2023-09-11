/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
import { loader } from '../assets';

const Loader = (props) => {
  return (
    <div>
      <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
      <h1 className="font-bold text-2xl text-white mt-2">{props.title}</h1>
    </div>
  );
};

export default Loader;
