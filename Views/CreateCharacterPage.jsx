import React from 'react';
import TopNav from '../components/CharacterPortalNav';
import CreateCharacter from '../components/CreateCharacter.jsx';

export function CreateCharacterPage(props) {
  return (
    <div className='App'>
      <div
        className='Navbar'
        style={{
          height: '65px',
          width: '100vw',
        }}
      >
        <TopNav />
      </div>
      <div
        className='my-custom-scroll'
        style={{
          marginTop: '65px',
          padding: `10px 0px`,
          width: '100vw',
          overflowY: 'auto',
          height: 'calc( 100vh - 75px )',
        }}
      >
        <CreateCharacter />
      </div>
    </div>
  );
}

export default CreateCharacterPage;
