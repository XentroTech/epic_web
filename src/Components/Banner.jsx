import bg from "../assets/bg.png";

const Banner = () => {
  return (
    <div className="flex items-center justify-center w-auto h-auto relative ">
      {/* Background Image */}
      <div className="relative w-full h-[85vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh]">
        <img src={bg} alt="Background" className="w-full h-full object-cover" />

        {/* Overlay Div */}
        <div
          className="bg-theme h-[85vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-full absolute top-0 left-0 z-10 flex items-center"
          style={{
            clipPath: "polygon(0 0, 60% 0, 40% 100%, 0 100%)",
          }}
        >
          <div className="flex flex-col justify-center items-start px-10 lg:px-16 text-black">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              EMPOWERING YOUR VISION <br />
              IN PHOTOGRAPHY
            </h1>
            <p className="text-sm lg:text-lg mb-6">
              Transform moments into masterpieces; let us take care of
              everything else.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold">
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
