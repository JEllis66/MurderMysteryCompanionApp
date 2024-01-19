//CharacterProtal.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FiEdit, FiTrash, FiPower } from 'react-icons/fi';
import { useConfirmation } from '../ConfirmationContext.js';
import '../CSS/table.css';

const CharacterPortal = () => {
  const { showConfirmation } = useConfirmation();
  const [characters, setCharacters] = useState([]);

  const handleConf = () => {
    console.log('char conf');
  };

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

  const fetchData = () => {
    const char = [
      {
        id: '001',
        name: 'Jerry Lancaster',
        isActive: true,
        role: 'The Host',
        relationship: 'Self',
        motive: 'Suicidal',
        isKiller: false,
      },
      {
        id: '002',
        name: 'Neon Styx',
        role: 'The Rockstar',
        relationship: 'Signed to Lancaster Records',
        motive: "Blames Jerry for his band's downfall",
        isActive: true,
        isKiller: false,
      },
      {
        id: '003',
        name: 'Justice LaMont',
        role: 'The Assistant',
        relationship: "Jerry Lancaster's Personal Assistant",
        motive: 'Underpaid for years to do an endlessly growing list of personal tasks on top of the usual business responsibilities',
        isActive: true,
        isKiller: false,
      },
      {
        id: '004',
        name: 'Bailey Eugene',
        role: 'The Manager',
        relationship: 'Arthouse Hipster who used to own the theater until it went under and Jerry purchased it',
        motive: 'Believes Jerry is destroying the retuation of their once prestigious theater',
        isActive: true,
        isKiller: false,
      },
      {
        id: '005',
        name: 'Ishana Lancaster-Dunbar',
        role: 'The Partner and Model',
        relationship: `2nd Wife of Jerry Lancaster, who met Jerry at getting casted in LBC's hot medical drama, "Blue's Biology"`,
        motive: 'Thinks that Jerry has ruined the company and wants to run off with his money and her boy-toy',
        isActive: true,
        isKiller: false,
      },
      {
        id: '006',
        name: 'Taylor Lancaster',
        role: 'The Parent',
        relationship: "Jerry's Mother; Has kept tabs on the company since her husband passed away.",
        motive: 'Ousted as prospective CEO by Jerry.',
        isActive: true,
        isKiller: true,
      },
      {
        id: '007',
        name: 'Punchy LaRue',
        role: 'The Influencer',
        relationship: "Signed to Lancaster's Talent Agency 2 years ago.",
        motive: 'Jerry told them that they were too young and he was going to drop them. Addtionally, Punchy had been responsible for out-of-contract marketing videos for the theater. Now they believe they can go viral by covering the death of Jerry',
        isActive: true,
        isKiller: false,
      },
      {
        id: '008',
        name: 'Donovan White',
        role: 'The Ex-Executive',
        relationship: 'Former Business Partner',
        motive: 'Fired by Jerry shortly after he took over the company. Jerry did this to cover a mistake he made',
        isActive: true,
        isKiller: false,
      },
      {
        id: '009',
        name: 'Onyx Magnolia',
        role: 'The Spirit Guide',
        relationship: "Jerry's Personal Shaman",
        motive: 'Jerry has been questioning their methods for quite some time, has been horrendously mocking their beliefs, and has mentioned firing them',
        isActive: true,
        isKiller: false,
      },
      {
        id: '010',
        name: 'Ryan Powers',
        role: 'The Magician',
        relationship: "Works under Lancaster's Talent Management",
        motive: 'Demoted from being a lead Las Vegas act for no particular reason by Lancster, only to now infrequently perform at unpopular venues',
        isActive: true,
        isKiller: false,
      },
      {
        id: '011',
        name: 'Anette Chambers',
        role: 'The Reporter',
        relationship: 'Lead reporter of all things "Lancaster" for the past 5 years',
        motive: 'Has been desparetly seeking "The Big Story" to make them famous',
        isActive: true,
        isKiller: false,
      },
      {
        id: '012',
        name: 'Baron Lancaster',
        role: 'The Late Great "Baron of Media"',
        relationship: "Jerry's Father",
        motive: 'N/A, already deceased',
        isActive: false,
        isKiller: false,
      },
      {
        id: '013',
        name: 'The Leiutenant',
        role: 'The Leiutenant',
        relationship: 'No Relation',
        motive: 'A magic show explosion only moments before the power outage caused the leiutenant to go into a PTSD-fueled tantrum; last seen quickly walking out of the auditorium before the power outage',
        isActive: true,
        isKiller: false,
      },
    ];
      setCharacters(char);
  };

  useEffect(() => {
    requestFullScreen();
    fetchData();
  }, []);

  return (
    <div className='container text-start'>
      <div
        className='d-flex justify-content-around'
        style={{ marginBottom: '15px' }}
      >
        <div></div>
        <Link to={'/create-character'}>
          <button
            className='btn btn-primary'
            style={{ width: '35vw', maxWidth: '150px' }}
          >
            Create
          </button>
        </Link>
        <Link
          to={''}
          onClick={() => {
            showConfirmation(
              'Are you sure you want to Clear the Character Data Table?',
              () => handleConf(),
              'clearCharacters'
            );
          }}
        >
          <button
            className='btn btn-danger'
            style={{ width: '35vw', maxWidth: '150px' }}
          >
            Clear
          </button>
        </Link>
        <div></div>
      </div>

      <div className='table-container my-custom-scroll-skinny'>
        <Table
          id='customTable'
          style={{
            whiteSpace: 'nowrap',
            overflowY: 'auto',
            height: 'calc(100% - 150px)',
          }}
        >
          <thead className='text-white text-uppercase'>
            <tr className='border-table'>
              <th>Actions</th>
              <th>ID#</th>
              <th>Username</th>
              <th>Role</th>
              <th style={{ width: '400px' }}>Relationship</th>
              <th style={{ width: '400px' }}>Motive</th>
              <th>Time Created</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((_, index) => (
              <tr className='border-table' key={index}>
                <td className='d-flex-column'>
                  <div>
                    <Link to={`/character-edit/${characters[index].id}`}>
                      <button
                        className='btn btn-secondary vView'
                        style={{ margin: '2px' }}
                      >
                        <FiEdit size={24} />
                      </button>
                    </Link>
                  </div>
                  <div>
                    {characters[index].isActive ? (
                      <button
                        className='btn btn-success vPowerOff'
                        style={{ margin: '2px' }}
                        onClick={() => {
                          showConfirmation(
                            `Are you sure you want to deactivate Character ID: ${characters[index].id}?`,
                            () => handleConf(),
                            `charDea${characters[index].id}` //chand item isActive on confnotification file
                          );
                        }}
                      >
                        <FiPower size={24} />
                      </button>
                    ) : (
                      <button
                        className='btn vPowerOn'
                        style={{ margin: '2px' }}
                        onClick={() => {
                          //setTempActiveCheck(!tempActiveCheck);
                          showConfirmation(
                            `Are you sure you want to activate Character ID: ${characters[index].id}?`,
                            () => handleConf(),
                            `charAct${characters[index].id}`
                          );
                        }}
                      >
                        <FiPower size={24} />
                      </button>
                    )}
                    </div>
                  <div>
                    <button
                      className='btn btn-danger vRemove'
                      style={{ margin: '2px' }}
                      onClick={() => {
                        showConfirmation(
                          `Are you sure you want to delete Character ID#:${characters[index].id}?`, //add string variable for name of char
                          () => handleConf(),
                          `delChar${characters[index].id}`
                        );
                      }}
                    >
                      <FiTrash size={24} />
                    </button>
                  </div>
                </td>
                <td>{characters[index].id}</td>
                <td
                  className={
                    characters[index].isKiller ? 'text-danger text-uppercase fw-bold' : ''
                  }
                >
                  <span
                    className={
                      !characters[index].isActive ? 'italic text-secondary' : ''
                    }
                  >
                    {characters[index].name}
                  </span>
                </td>
                <td>{characters[index].role}</td>
                <td style={{ whiteSpace: 'normal', minWidth: '300px' }}>{characters[index].relationship}</td>
                <td style={{ whiteSpace: 'normal', minWidth: '300px' }}>{characters[index].motive}</td>
                <td>17:01 22 SEP 2023</td>
                <td>17:01 22 SEP 2023</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CharacterPortal;
