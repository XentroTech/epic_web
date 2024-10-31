import image1 from "../assets/emotions.jpg";
import image2 from "../assets/emotions0.jpg";
import image3 from "../assets/image-3.jpg";
function Sections() {
  return (
    <div className="mt-24">
      <h1 className="text-3xl text-center font-bold  pb-24">
        FEEL THE DEPTH OF EMOTIONS RIGHT AT YOUR FINGERTIPS
      </h1>
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="relative grid md:grid-cols-2 gap-8 items-center rounded-lg  overflow-hidden">
          {/* Image Section */}
          <div className="md:flex-shrink-0 ">
            <img
              src={image2}
              alt="People in sleeping bags outdoors"
              className="w-full h-[400px]  rounded-lg"
            />
          </div>

          {/* Text Section */}
          <div className="">
            <div className="absolute p-8 top-[110px] left-[500px] border shadow-lg w-[550px] h-[200px] bg-white rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Embrace the Creator Economy
              </h2>
              <p className="text-gray-600">
                Creator-driven content builds brand awareness, sparks
                engagement, and drives sales momentum.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="relative grid md:grid-cols-2 gap-8 items-center  rounded-lg  overflow-hidden">
          {/* Text Section */}
          <div className="">
            <div className="absolute p-8 top-[110px] right-[500px] border shadow-lg w-[550px] h-[200px] bg-white rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-right">
                Accelerate Content Creation
              </h2>
              <p className="text-gray-600 text-right">
                Activate continuous, on-demand production with a steady flow of
                captivating creator-generated content—saving time by removing
                the need for one-on-one communication with individual creators.
              </p>
            </div>
          </div>
          {/* Image Section */}
          <div className="md:flex-shrink-0 ">
            <img
              src={image1}
              alt="People in sleeping bags outdoors"
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="relative grid md:grid-cols-2 gap-8 items-center rounded-lg  overflow-hidden">
          {/* Image Section */}
          <div className="md:flex-shrink-0 ">
            <img
              src={image3}
              alt="People in sleeping bags outdoors"
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          {/* Text Section */}
          <div className="">
            <div className="absolute p-8 top-[110px] left-[500px] border shadow-lg w-[550px] h-[200px] bg-white rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Drive Results with Targeted Precision Marketing
              </h2>
              <p className="text-gray-600">
                We are consumers, we are photographers, we are videographers
                eager to interact with your brand, and present authentic
                experiences with genuine emotions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sections;
