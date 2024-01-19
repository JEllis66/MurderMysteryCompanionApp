import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../UserContext.js'

class PrintContent extends React.Component {
  render() {
    const { text, isLandscape } = this.props;

    return (
      <div
        id='print-container'
        className={`mt-4 mb-3 text-center my-page-font-color ${isLandscape ? 'landscape' : ''}`}
      >
        <div
          id='qr-code-container'
          style={{
            backgroundColor: 'white',
            borderRadius: '6px',
            width: isLandscape ? '40vh' : '70vw',
            height: isLandscape ? '40vh' : '70vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
          }}
        >
          <QRCode
            style={{ height: isLandscape ? '36vh' : '66vw', width: isLandscape ? '36vh' : '66vw', padding: '10px' }}
            value={text}
          />
        </div>
        <p style={{ marginTop: '10px', fontSize: '32pt', color: 'var(--page-font-color)' }}>
          {text}
        </p>
      </div>
    );
  }
}

const QRCodeShare = () => {
  const { id } = useParams();
  const [text, setText] = useState('');
  const [isLandscape, setIsLandscape] = useState(window.matchMedia("(orientation: landscape)").matches);
  const componentRef = useRef();
  const { user } = useUser();

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

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setText(id);

    // Add event listener for orientation change
    const handleOrientationChange = () => {
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    // Clean up event listener
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [id]);

  useEffect(()=>{
    requestFullScreen();
  },[])

  return (
    <div className='d-flex-column container text-center my-2'>
      <div>
        <label className='header-text' htmlFor='qr-text'>
          Share QR code:
        </label>
      </div>
      {text && (
        <div ref={componentRef}>
          <PrintContent text={text} isLandscape={isLandscape} />
        </div>
      )}
      {(
        <div>
          <Link to={`/my-clues`}>
            <button className='btn btn-secondary my-2' style={{borderRadius: '3px'}}>
              Back to My Items
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default QRCodeShare;
