import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spineer from "./Spineer";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async () => {
    props.setProgress(10)   
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parseData = await data.json();
    props.setProgress(75)
    setArticles(parseData.articles)
    settotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - News Adda`;
    updateNews();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pagesize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles))
    settotalResults(parseData.totalResults)
  };

  return (
    <>
      <h1 className="text-center text-danger my-4">News Adda - Top {capitalizeFirstLetter(props.category)} Hedlines</h1>
      {loading && <Spineer />};
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spineer />}
      >
        <div className="container">

          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 my-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 85)
                        : "Discrition is not define in api so no any discripton are showing there you can see "
                    }
                    urlToImage={
                      element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/id/1483013789/photo/ai-artificial-intelligence-robot-and-human-hands-are-touching-and-connecting-unity-with-human.jpg?s=2048x2048&w=is&k=20&c=HPDfNyIIBdLj_3MHs2RyE0qG2UPmpF_qduIDyJndlzw="
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );


}

News.defultProps = {
  country: "in",
  pageSize: 6,
  category: "sports",
};
News.propTypes = {
  courtry: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
