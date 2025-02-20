import PS from "../assets/PS.png"
import author from "../assets/author.jpg"

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#D8D9D8] p-6">
      <div className="max-w-5xl bg-[#F4F3F0] shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center border-4">
        {/* Left Side: Project Description */}
        <div className="md:w-1/2 text-center md:text-left">
          <div className="brand flex gap-4 items-center justify-center md:justify-start">
          <img src={PS} className="w-12 h-12 rounded-full" />
          <p className="text-xl font-semibold font-serif bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 text-transparent bg-clip-text rounded-xl">Ripple Read</p>
          </div>
          <h1 className=" text-4xl lg:text-5xl pt-10 md:pl-16 font-bold font-serif text-black">Priyangshu</h1>
          <h1 className="text-4xl lg:text-5xl md:pt-3 md:pl-36 font-bold font-serif text-black">Shome's</h1>

          <p className=" lg:pl-36 pt-10 md:pt-16 text-[#8B8886] text-md font-light">
            RippleRead is a modern blog and news platform, offering insightful content with intelligent features like AI-generated summaries, real-time search, and personalized recommendations.
          </p>
          <p className=" lg:pl-36 pt-8 pb-8 md:pb-24 text-[#8B8886] text-md font-light">
            Designed to enhance content discovery and readability, RippleRead ensures that users stay informed with a seamless and engaging reading experience.
          </p>
        </div>
        
        {/* Right Side: Developer Profile */}
        <div className="md:w-1/2 flex flex-col items-center mt-6 md:mt-0">
          <img 
            src={author} 
            alt="Developer" 
            className="w-[18rem] h-[24rem] md:w-[24rem] md:h-[34rem] rounded-xl md:rounded-md object-cover shadow-md" 
          />
          <div className="flex mt-4 space-x-4">
            <a href="https://github.com/priyanggshu" target="_blank" className="text-black hover:underline">GitHub</a>
            <a href="https://linkedin.com/in/priyanggshu" target="_blank" className="text-black hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;