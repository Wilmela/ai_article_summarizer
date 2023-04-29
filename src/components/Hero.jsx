import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex flex-col justify-center items-center">
      <nav className="w-full mb-10 pt-3 flex justify-between items-center ">
        <img src={logo} alt="logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://github.com/Wilmela")}
          className="black_btn"
        >
          Github
        </button>
      </nav>

      <h1 className="head_text">
        {" "}
        Summarize articles with <br className="max-md:overflow-x-hidden" />
        <span className="orange_gradient">OpenAi GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with summarizer, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
