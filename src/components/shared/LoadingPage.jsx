import { SyncLoader } from "react-spinners";

const LoadingPage = ({ size = 15, color = "#023e8a" }) => {
  return (
    <div className="fixed inset-0 flex pt-17 justify-center items-center   backdrop-blur-md z-50">
      <SyncLoader size={size} color={color} />
    </div>
  );
};

export default LoadingPage;