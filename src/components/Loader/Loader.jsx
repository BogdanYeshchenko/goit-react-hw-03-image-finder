import { InfinitySpin } from 'react-loader-spinner';
import './Loader.css';

export const Loader = () => {
  return (
    <div className="Loder-box">
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
};
