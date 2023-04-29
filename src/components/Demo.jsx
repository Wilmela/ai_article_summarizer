import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [copied, setCopied] = useState("");

  // Fetches all the articles for the local storage as soon as component mounts
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  //Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  //Copy to clipboard
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);

    setTimeout(() => {
      setCopied(false);
    }, [3000]);
  };

  const removeItemFromLocalStorage = (url) => {
    const filteredArticles = allArticles.filter((item) => item.url !== url);
    localStorage.setItem("articles", JSON.stringify(filteredArticles));
    location.reload();
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="Link Icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a url"
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            required
            className="url_input peer"
          />
          <button type="Submit" className="submit_btn">
            ↲
          </button>
        </form>
        {/* Browser history*/}
        <div className="flex flex-col gap-1 mx-h-60 overflow-y-auto ">
          {allArticles.map((item, index) => {
            return (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(item)}
                className="link_card"
              >
                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                  <img
                    src={copied === item.url ? tick : copy}
                    alt="copy_icon"
                    className="w-[40%] h-[40%] object-contain cursor-pointer"
                  />
                </div>
                <p className="flex-1 font-satoshi text-blue-700 font-medium truncate">
                  {item.url}
                </p>
                <button
                  type="button"
                  className="w-7 h-7 rounded-full bg-gray-200 text-red-500 font-satoshi flex item-center justify-center font-bold cursor-pointer"
                  onClick={() => removeItemFromLocalStorage(item.url)}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {/* Show results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Sorry, something went wrong...
            <br />
            <span className="font-satoshi fot-normal text-gray-700">
              {error?.data.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold font-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
