import React, { useState, useEffect } from 'react';
import { useActiveTab } from '../ActiveTabContext';
import '../CSS/news.css';

const News = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const { activeTab, setTab } = useActiveTab();

  const requestFullScreen = () => {
  	const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    };
  	if (checkIfMobile){
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Chrome, Safari, and Opera
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // Internet Explorer
      }
    }
  };

  useEffect(() => {
    requestFullScreen();
    setTab('news');
    const interval = setInterval(() => {
      const date = new Date();
      const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      };
      setCurrentDate(date.toLocaleDateString('en-US', options).toUpperCase());
    }, 300);

    window.addEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  const h1FontSize = windowWidth > windowHeight ? '8vh' : '4.5vh';
  const h2FontSize = windowWidth > windowHeight ? '4vh' : '2.25vh';

  const generatePlaceholderText = () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
    return text.repeat(4);
  };

  const articles = [
        {
          title: 'Headline Article',
          text: generatePlaceholderText(),
          image: 'https://drive.google.com/uc?export=view&id=1PvwcnaUlNwUM6FyBqtIIa35G-RRGVdSr',
        },
        {
          title: 'Breaking News',
          text: generatePlaceholderText(),
          image: 'https://drive.google.com/uc?export=view&id=185shqJ11h1C7Nnf2DJb5fxtCG_0auN3K'
        },
        {
          title: 'Featured Story',
          text: generatePlaceholderText(),
          image: 'https://drive.google.com/uc?export=view&id=1qGVWVCtY0VRZkZewX5fJtw5oC1VsENA3'
        },
      ]

  const articleStyle = {
    color: 'black',
    fontSize: '1.4em',
  };

  const pageStyle = {
    backgroundColor: '#f3f3f3',
    borderRadius: '6px',
    padding: '25px',
    width: '90vw',
    marginBottom: '25px',
  };

  const columnStyle = {
    margin: '0px'
  };

  const headerStyle = {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
    height: 'fitwidth',
    marginTop: '10px',
  };

  return (
    <div className='container text-black' style={pageStyle}>
      <div className='text-center mb-3'>
        <h1 style={{ fontFamily: 'Cantebury', fontSize: h1FontSize }}>
          LANCASTER LEDGER
        </h1>
        <h2 style={{ fontFamily: 'Cantebury', fontSize: h2FontSize }}>
          {currentDate}
        </h2>
      </div>

      <div className='row my-custom-scroll-skinny' style={{overflowY: 'auto', }}>
        {articles.map((article, index) => (
          <div className='col-md-4 mb-4' key={index} style={columnStyle}>
            <div className='card mb-3' style={articleStyle}>
              <div className='card-body'>
                
                <h5
                  className='card-title header-text text-black'
                  style={headerStyle}
                >
                  {article.title}
                </h5>
                <img
                  src={article.image}
                  alt={`Image ${index}`}
                  className='card-img-top'
                  style={{
                    maxHeight: '40vh',
                    maxWidth: '50vw',
                    margin: '10px auto',
                    display: 'block', //
                    alignSelf: 'center',
                  }}
                />
                
                <div>
                  <p
                    className='card-text mt-4 my-custom-scroll'
                    style={{ height: '30vh', overflowY: 'auto' }}
                  >
                    {article.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
