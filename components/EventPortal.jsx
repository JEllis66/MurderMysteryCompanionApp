import React, { useState, useEffect } from 'react';
import { useActiveTab } from '../ActiveTabContext';
import Table from 'react-bootstrap/Table';
import '../CSS/table.css';

const EventPortal = () => {
  const { activeTab, setTab } = useActiveTab();
  const [players, setPlayers] = useState([]);
  const [items, setItems] = useState([]);
  const [requests, setRequests] = useState([]);
  const [articles, setArticles] = useState([]);
  const [votes, setVotes] = useState([]);

  const generatePlaceholderText = () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
    return text.repeat(4);
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
    //SQL GET for all players with active true (include vote totals column)
    setPlayers([
      {
        Name: 'Jerry Lancaster',
        isActive: true,
        isKiller: false,
      },
      {
        Name: 'Neon Styx',
        isActive: true,
        isKiller: false,
      },
      {
        Name: 'Justice LaMont',
        isActive: true,
        isKiller: false,
      },
      {
        Name: 'Bailey Eugene',
        isActive: true,
        isKiller: false,
      },
      {
        Name: 'Ishana Lancaster-Dunbar',
        isActive: true,
        isKiller: false,
      },
      {
        Name: 'Taylor Lancaster',
        isActive: true,
        isKiller: true,
      },
      {
        Name: 'Punchy LaRue',
        isActive: true,
        isKiller: false,
      },
      {
        Name: 'Donovan White',
        isActive: true,
        isKiller: false,
      },
      {
        Name: 'Onyx Magnolia',
        isActive: true,
        isKiller: false,
      },
      {
        Name: 'Ryan Powers',
        isActive: true,
        isKiller: false,
      },
      {
        Name: 'Anette Chambers',
        isActive: true,
        isKiller: false,
      },
      {
        Name: 'Baron Lancaster',
        isActive: true,
        isKiller: false,
      },
      {
        Name: 'The Leiutenant',
        isActive: true,
        isKiller: false,
      },
    ]);
    //SQL GET all items (must include at least these columns: murderMethod Boolean, and title)
    setItems([
      {
        Title: 'Plane Ticket',
        isMurderLinked: false,
      },
      {
        Title: 'Knife',
        isMurderLinked: true,
      },
      {
        Title: 'Mask',
        isMurderLinked: false,
      },
    ]);
    //SQL GET Requests table with at least these cols: id, resolved boolean
    setRequests([
      {
        Title: "Dan's Request",
        isResolved: false,
        requester: 'Dan'
      },
      {
        Title: "Jamie's Request",
        isResolved: true,
        requester: 'Jamie',
      },
      {
        Title: "Jerry's Request",
        isResolved: false,
        requester: 'Jerry'
      },
    ]);

    //SQL GET NewsArticles, just title and Active cols for now...
    setArticles([
      {
        title: 'Headline Article',
        text: generatePlaceholderText(),
        image:
          'https://drive.google.com/uc?export=view&id=1PvwcnaUlNwUM6FyBqtIIa35G-RRGVdSr',
      },
      {
        title: 'Breaking News',
        text: generatePlaceholderText(),
        image:
          'https://drive.google.com/uc?export=view&id=185shqJ11h1C7Nnf2DJb5fxtCG_0auN3K',
      },
      {
        title: 'Featured Story',
        text: generatePlaceholderText(),
        image:
          'https://drive.google.com/uc?export=view&id=1qGVWVCtY0VRZkZewX5fJtw5oC1VsENA3',
      },
    ]);
    //SQL GET Votes table voteBy, voteFor, isCorrect
    setVotes([
      {
        votedBy: 'Onyx Magnolia',
        votedFor: 'Taylor Lancaster',
      },
      {
        votedBy: 'Jerry Lancaster',
        votedFor: 'Anette Chambers',
      },
      {
        votedBy: 'The Leiutenant',
        votedFor: 'Taylor Lancaster',
      },
      {
        votedBy: 'Taylor Lancaster',
        votedFor: 'Baron Lancaster',
      },
    ]);
  };

  useEffect(() => {
    requestFullScreen();
    setTab('event-portal');
    fetchData();
  }, []);

  return (
    <div className='container'>
      <h1 className='header-text text-center mt-1 mb-3'>Gameplay Stats:</h1>
      <div
        className='table-container my-custom-scroll'
        style={{ maxHeight: '65vh' }}
      >
        <Table
          id='customTable'
          style={{
            overflowY: 'auto',
            maxHeight: 'calc(60% - 150px)',
          }}
        >
          <thead className='my-nav-font-color text-uppercase'>
            <tr className='border-table'>
              <th style={{ width: '33%' }}>Parameter</th>
              <th className='text-center' style={{ width: '67%' }}>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-table'>
              <td>Killer</td>
              <td>
                {players.find(character => character.isKiller === true)?.Name ||
                  'Not Set'}
              </td>
            </tr>
            <tr className='border-table'>
              <td>Murder Linked Clues</td>
              <td>
                {items
                  .filter(item => item.isMurderLinked)
                  .map(item => item.Title)
                  .join(', ') || 'None'}
              </td>
            </tr>
            <tr className='border-table'>
              <td># of Requests</td>
              <td>{requests.length}</td>
            </tr>
            <tr className='border-table'>
              <td># Open Requests</td>
              <td>{requests.filter(request => !request.isResolved).length}</td>
            </tr>
            <tr className='border-table'>
              <td>Active Requesters</td>
              <td>{requests.filter(request => !request.isResolved).map(request => request.requester).join(", ")}</td>
            </tr>
            <tr className='border-table'>
              <td># of Items</td>
              <td>{items.length}</td>
            </tr>
            <tr className='border-table'>
              <td>Items</td>
              <td>{items.map(i => i.Title).join(', ')}</td>
            </tr>
            <tr className='border-table'>
              <td># of Articles</td>
              <td>{articles.length}</td>
            </tr>
            <tr className='border-table'>
              <td># of Players</td>
              <td>{players.length}</td>
            </tr>
            <tr className='border-table'>
              <td># Active Players</td>
              <td>{players.filter(player => player.isActive).length}</td>
            </tr>
            <tr className='border-table'>
              <td>Active Players</td>
              <td>{
                players.filter(player => player.isActive).map(player => player.Name).length === 0
                  ? 'None'
                  : players.filter(player => player.isActive).map(player => player.Name).join(", ")
                }</td>
            </tr>
            <tr className='border-table'>
              <td>Inactive Players</td>
              <td>{
                players.filter(player => !player.isActive).map(player => player.Name).length === 0
                  ? 'None'
                  : players.filter(player => !player.isActive).map(player => player.Name).join(", ")
                }</td>
            </tr>
            <tr className='border-table'>
              <td># Votes Cast</td>
              <td>{votes.length}</td>
            </tr>
            <tr className='border-table'>
              <td>Voters:</td>
              <td>
                {players
                  .filter(player => player.isActive)
                  .filter(player =>
                    votes.some(vote => vote.votedBy === player.Name)
                  )
                  .map(player => player.Name)
                  .join(', ')}
              </td>
            </tr>
            <tr className='border-table'>
              <td># Remaining Votes</td>
              <td>
                {players.filter(player => player.isActive).length -
                  votes.length}
              </td>
            </tr>
            <tr className='border-table'>
              <td>Remaining Voters</td>
              <td>
                {players
                  .filter(player => player.isActive)
                  .filter(
                    player => !votes.some(vote => vote.votedBy === player.Name)
                  )
                  .map(player => player.Name)
                  .join(', ')}
              </td>
            </tr>
            <tr className='border-table'>
              <td># Correct Votes</td>
              <td>
                {
                  votes.filter(vote =>
                    players.find(
                      player => player.isKiller && player.Name === vote.votedFor
                    )
                  ).length
                }
              </td>
            </tr>
            <tr className='border-table'>
              <td>Correct Voters</td>
              <td style={{ whiteSpace: 'normal' }}>
                {votes
                  .filter(vote =>
                    players.some(
                      player => player.isKiller && player.Name === vote.votedFor
                    )
                  )
                  .map(vote => vote.votedBy)
                  .join(', ')}
              </td>
            </tr>
            <tr className='border-table'>
              <td className='botLef'>Incorrect Voters</td>
              <td style={{ whiteSpace: 'normal' }}>
                {votes
                  .filter(vote =>
                    players.some(
                      player => !player.isKiller && player.Name === vote.votedFor
                    )
                  )
                  .map(vote => vote.votedBy)
                  .join(', ')}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EventPortal;
