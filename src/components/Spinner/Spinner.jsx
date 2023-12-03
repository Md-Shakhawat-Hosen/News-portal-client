import { Circles } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex justify-center h-[80vh] items-center">
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Spinner;
