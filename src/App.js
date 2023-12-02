import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [mode, setMode] = useState('light')

  useEffect(() => {
    getQuote();
  }, []); // Fetch initial quote on component mount

  const getQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();

      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark") 
      document.body.style.backgroundColor = "black"
      document.getElementById('text').style.color = "#c9c016"
      document.getElementById('author').style.color = "white"
    } else {
      setMode("light") 
      document.body.style.backgroundColor = "white"
      document.getElementById('text').style.color = "black"
      document.getElementById('author').style.color = "black"
    }
  }

  const handleNewQuote = () => {
    getQuote();
  };

  const handleTweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <>
    <Navbar mode = {mode} toggleMode = {toggleMode}/>
    <div id="quote-box" className="quote-box">
      <div id="text" className="quote-text">
        "{quote}"
      </div>
      <div id="author" className="quote-author">
        - {author}
      </div>
      <button id="new-quote" className="quote-button" onClick={handleNewQuote}>
        New Quote
      </button>
      <a
        id="tweet-quote"
        className="quote-button"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `"${quote}" - ${author}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleTweetQuote}
      >
        Tweet Quote
      </a>
      <div id="name">- by Sohan</div>
    </div>
    
  </>
  );
};

export default App;
