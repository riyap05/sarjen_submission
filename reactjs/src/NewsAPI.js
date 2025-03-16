import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles"; 
const NewsAPI = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const API_KEY = "**************************";
        const response = await axios.get(
          `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${API_KEY}`
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <div className="news-container">
        <div>
        <Link to="/" style={styles.backButton}>
          Back to Home
        </Link>
        </div>
        <h1>Top 10 news today worldwide</h1>
        {loading ? (
          <h1 className="loading">Loading</h1>
        ) : (
          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-card">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="news-image"
                  />
                  <h2 className="news-title">{article.title}</h2>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NewsAPI;
