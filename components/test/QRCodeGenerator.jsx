import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

class PrintContent extends React.Component {
  render() {
    const { text, isPrinting, isLandscape } = this.props;

    return (
      <div
        id='print-container'
        className={`mt-2 mb-3 text-center my-page-font-color ${
          isLandscape ? 'landscape' : ''
        }`}
        style={{backgroundColor: 'white',
            borderRadius: '6px', paddingTop: '20px'}}
      >
        <div
          id='qr-code-container'
          style={{
            backgroundColor: 'white',
            borderRadius: '6px',
            width: isLandscape ? '40vh' : '60vw',
            height: isLandscape ? '40vh' : '60vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            border: '3px solid black'
          }}
        >
          <QRCode
            style={{
              height: isLandscape ? '36vh' : '56vw',
              width: isLandscape ? '36vh' : '56vw',
              padding: '10px',
            }}
            value={text}
          />
        </div>
        <p
          id='print-text-qr'
          className='text-center'
          style={{
            marginTop: '10px',
            fontSize: '44pt',
            color: 'black',
            backgroundColor: 'white',
            borderRadius: '6px',
          }}
        >
          {text}
        </p>
      </div>
    );
  }
}

const QRCodeGenerator = () => {
  const { id } = useParams();
  const [text, setText] = useState('');
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia('(orientation: landscape)').matches
  );
  const componentRef = useRef();

  const requestFullScreen = () => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    };
    if (checkIfMobile) {
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

  const exitFullScreen = () => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    };
    if (checkIfMobile) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Chrome, Safari, and Opera
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // Internet Explorer
      }
    }
  };

  const handleInputChange = e => {
    setText(e.target.value);
  };

  useEffect(() => {
    setText(id);

    // Add event listener for orientation change
    const handleOrientationChange = () => {
      setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    // Clean up event listener
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    requestFullScreen();
  }, []);

  return (
    <div className='d-flex-column container text-center my-0'>
      <div>
        <label className='header-text' htmlFor='qr-text'>
          Your QR code:
        </label>
      </div>
      <div>
        <input
          type='text'
          id='qr-text'
          value={text}
          className='my-1 text-center'
          style={{
            height: '60px',
            width: '280px',
            padding: '5px',
            borderRadius: '6px',
            fontSize: '32pt',
          }}
          onChange={e => handleInputChange(e)}
        />
      </div>

      {text && (
        <div>
          <button
            className='btn btn-primary my-2'
            style={{ borderRadius: '3px' }}
            onClick={() => {
              exitFullScreen();
              handlePrint();
            }}
          >
            Print QR Code
          </button>
        </div>
      )}

      {text && (
        <div ref={componentRef}>
          <PrintContent text={text} isLandscape={isLandscape} />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
