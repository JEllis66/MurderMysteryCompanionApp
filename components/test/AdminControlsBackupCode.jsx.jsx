import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiUpload, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useActiveTab } from '../ActiveTabContext';
import { useUser } from '../UserContext.js';
import '../CSS/Create.css';

const AdminControls = () => {
  const { activeTab, setTab } = useActiveTab();
  const navigate = useNavigate();
  const { user } = useUser();

  const [appTitle, setAppTitle] = useState(``);
  const [appKey, setAppKey] = useState(``);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [killer, setKiller] = useState('');
  const [activePlayers, setActivePlayers] = useState([]);
  const [newspaperTitle, setNewspaperTitle] = useState('');
  const [isInit, setIsInit] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [appLogo, setAppLogo] = useState(null);
  const [imageObject, setImageObject] = useState(null);
  const [defaultAppColor, setDefaultAppColor] = useState('#6B001E');
  const [appBackgroundColor, setAppBackgroundColor] = useState('#303030');
  const [themeColorLighter, setThemeColorLighter] = useState('#C8184A');
  const [themeColorDarker, setThemeColorDarker] = useState('#3f0515');
  const [navThemeFontColor, setNavThemeFontColor] = useState('#FFFFFF');
  const [primaryFontColor, setPrimaryFontColor] = useState('#DC4C64');
  const [primaryButtonColor, setPrimaryButtonColor] = useState('#DC4C64');
  const [primaryButtonFontColor, setPrimaryButtonFontColor] =
    useState('#FFFFFF');
  const [allowUserUserMessaging, setAllowUserUserMessaging] = useState(false);

  const [players, setPlayers] = useState([]);
  const [activeSettings, setActiveSettings] = useState({});
  const [crimes, setCrimes] = useState([]);

  const [isValidToSubmit, setIsValidToSubmit] = useState(false);
  const [isSettingsChange, setIsSettingsChange] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    appTitle: false,
    appKey: false,
    newspaperTitle: false,
  });

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen(); // Firefox
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // Chrome, Safari, and Opera
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // Internet Explorer
    }
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
  

  const getRandomCode = () => {
    const validChars = 'ABCDEFGHJKLMNPRTUVWXY23456789';
    let codeRes = '';
    while (codeRes.length < 9) {
      let randomIndex = Math.floor(Math.random() * validChars.length);
      let newChar = validChars[randomIndex];
      codeRes += newChar;
    }
    setAppKey(codeRes);
  };

  const parseCharData = data => {
    const crimesObj = {};

    data.forEach(entry => {
      const {
        Name,
        method1,
        linkedItem1,
        method2,
        linkedItem2,
        method3,
        linkedItem3,
      } = entry;

      if (!crimesObj[Name]) {
        crimesObj[Name] = { name: Name };
      }

      if (linkedItem1) crimesObj[Name][`method1`] = linkedItem1;
      if (linkedItem2) crimesObj[Name][`method2`] = linkedItem2;
      if (linkedItem3) crimesObj[Name][`method3`] = linkedItem3;
    });

    // Convert crimesObj values to an array
    const crimesArray = Object.values(crimesObj);
    setCrimes(crimesArray);
  };

  const getRandomCrime = () => {
    const allMethods = crimes.reduce(
      (methods, crime) =>
        [...methods, crime.method1, crime.method2, crime.method3].filter(
          Boolean
        ),
      []
    );
    const randomMethod =
      allMethods[Math.floor(Math.random() * allMethods.length)];
    const randomCrime = crimes.find(
      crime =>
        crime.method1 === randomMethod ||
        crime.method2 === randomMethod ||
        crime.method3 === randomMethod
    );
    return randomCrime;
  };

  const selectRandomMethod = () => {
    const randomCrime = getRandomCrime();
    setSelectedMethod(randomCrime ? randomCrime.method1 : '');
    setKiller(randomCrime ? randomCrime.name : '');
  };

  const handleMethodChange = e => {
    const selectedCrime = crimes.find(
      crime =>
        crime.method1 === e.target.value ||
        crime.method2 === e.target.value ||
        crime.method3 === e.target.value
    );
    setSelectedMethod(selectedCrime ? e.target.value : '');
    setKiller(selectedCrime ? selectedCrime.name : '');
  };

  const fetchData = async () => {
    try {
      // Emulating an Axios request with a setTimeout
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: [
              {
                Name: 'Jerry Lancaster',
                isActive: true,
                isKiller: false,
                privLevel: 'Standard',
                method1:
                  'Jerry Lancaster, attending a theater dinner party, discretely aims his Silent Sniper from the shadows, ensuring the "soundtrack" masks the shot.',
                linkedItem1: 'Silent Sniper',
                method2:
                  "In a cunning move at the magic show, Jerry Lancaster switches the magician's Poisoned Chalice with a lethal dose, creating a deadly illusion during the performance.",
                linkedItem2: 'Poisoned Chalice',
                method3:
                  'Jerry Lancaster, mingling at the theater dinner party, swiftly incapacitates the target with a Concealed Blade disguised as a prop.',
                linkedItem3: 'Concealed Blade',
              },
              {
                Name: 'Neon Styx',
                isActive: true,
                isKiller: false,
                privLevel: 'Standard',
                method1:
                  'Neon Styx, dressed as a waiter at the theater dinner party, discreetly fires Poison Dart from a seemingly innocent serving tray.',
                linkedItem1: 'Poison Dart',
                method2:
                  'Using advanced hacking skills during the magic show, Neon Styx manipulates the lighting, creating a distraction to administer a Lethal Dose.',
                linkedItem2: 'Lethal Dose',
                method3:
                  "Neon Styx, posing as a magician's assistant, utilizes a Concealed Garrote during the performance, catching the target off guard.",
                linkedItem3: 'Concealed Garrote',
              },
              {
                Name: 'Justice LaMont',
                isActive: true,
                isKiller: false,
                privLevel: 'Standard',
                method1:
                  "Justice LaMont, attending a theater dinner party, discreetly administers a Lethal Dose through an unsuspecting target's drink using a Concealed Syringe.",
                linkedItem1: 'Concealed Syringe',
                method2:
                  'During the magic show, Justice LaMont exploits the pyrotechnics display, creating chaos to swiftly eliminate the target with a Poisoned Dagger.',
                linkedItem2: 'Poisoned Dagger',
                method3:
                  'Justice LaMont, a skilled illusionist at the magic show, orchestrates a Deadly Misdirection, causing the target to unknowingly step into a trap.',
                linkedItem3: 'Deadly Misdirection Trap',
              },
              {
                Name: 'Bailey Eugene',
                isActive: true,
                isKiller: false,
                privLevel: 'Standard',
                method1:
                  'Bailey Eugene, working as a waiter at the theater dinner party, discreetly uses a Disguised Dart to deliver a lethal toxin to the unsuspecting target.',
                linkedItem1: 'Disguised Dart',
                method2:
                  'In a magical twist during the show, Bailey Eugene manipulates a seemingly harmless Prop, turning it into a deadly weapon to eliminate the target.',
                linkedItem2: 'Transforming Prop',
                method3:
                  'Bailey Eugene, posing as an audience member, triggers a Hidden Trap during the magic show, ensuring the target meets a mysterious and lethal end.',
                linkedItem3: 'Hidden Lethal Trap',
              },
              {
                Name: 'Ishana Lancaster-Dunbar',
                isActive: true,
                isKiller: false,
                privLevel: 'Standard',
                method1:
                  'Ishana Lancaster-Dunbar, an expert in disguise, infiltrates the theater dinner party and eliminates the target using a Disguised Crossbow.',
                linkedItem1: 'Disguised Crossbow',
                method2:
                  'Using her knowledge of magic, Ishana Lancaster-Dunbar incorporates an Enchanted Object into the magic show, causing a fatal accident for the target.',
                linkedItem2: 'Enchanted Object',
              },
              {
                Name: 'Taylor Lancaster',
                isActive: true,
                isKiller: true,
                privLevel: 'Standard',
                method1:
                  'At the theater dinner party, Taylor Lancaster skillfully deploys a Silent Poison Dart, ensuring a discreet and lethal strike.',
                linkedItem1: 'Silent Poison Dart',
                method2:
                  'During the magic show, Taylor Lancaster manipulates the stage lights, creating a distraction to deliver a Deadly Illusion with a concealed weapon.',
                linkedItem2: 'Deadly Illusion',
                method3:
                  'Taylor Lancaster, posing as part of the magic act, surprises the target with a Hidden Dagger, leaving no time for a defense.',
                linkedItem3: 'Hidden Dagger',
              },
              {
                Name: 'Punchy LaRue',
                isActive: true,
                isKiller: false,
                privLevel: 'Standard',
                method1:
                  "Punchy LaRue, the energetic waiter at the theater dinner party, uses a Hidden Syringe to inject a lethal concoction into the target's drink.",
                linkedItem1: 'Hidden Syringe',
                method2:
                  'Punchy LaRue, showcasing sleight of hand at the magic show, seamlessly switches a harmless Prop with a Poisoned Wand for a fatal outcome.',
                linkedItem2: 'Poisoned Wand',
                method3:
                  'During the magic show, Punchy LaRue triggers a concealed Trap Door, causing the target to meet an unexpected and deadly fate.',
                linkedItem3: 'Concealed Trap Door',
              },
              {
                Name: 'Donovan White',
                isActive: true,
                isKiller: false,
                privLevel: 'Standard',
                method1:
                  'Donovan White, the suave guest at the theater dinner party, discreetly uses a Disguised Cane to deliver a deadly blow to the unsuspecting target.',
                linkedItem1: 'Disguised Cane',
                method2:
                  'In a surprising twist during the magic show, Donovan White enchants a seemingly ordinary Ring, turning it into a Lethal Charm for the target.',
                linkedItem2: 'Lethal Charm',
                method3:
                  'Donovan White, a master of misdirection, creates a Dazzling Mirage during the magic show, allowing for a swift and fatal strike.',
                linkedItem3: 'Dazzling Mirage',
              },
              {
                Name: 'Onyx Magnolia',
                isActive: true,
                isKiller: false,
                privLevel: 'Standard',
                method1:
                  'Onyx Magnolia, the mysterious figure at the theater dinner party, utilizes a Hidden Blade to silently eliminate the target during the festivities.',
                linkedItem1: 'Hidden Blade',
                method2:
                  'During the magic show, Onyx Magnolia manipulates the Smoke Machine, creating an Obscured Path for a concealed and lethal approach.',
                linkedItem2: 'Obscured Path',
                method3:
                  'Onyx Magnolia, skilled in the art of escapology, incorporates a Deadly Escape Act into the magic show, leading to an unexpected demise for the target.',
                linkedItem3: 'Deadly Escape Act',
              },
              {
                Name: 'Ryan Powers',
                isActive: true,
                isKiller: false,
                privLevel: 'Standard',
                method1:
                  "Ryan Powers, a charismatic guest at the theater dinner party, discreetly administers a Lethal Elixir to the unsuspecting target's drink.",
                linkedItem1: 'Lethal Elixir',
                method2:
                  'In a magical performance during the show, Ryan Powers enchants a seemingly ordinary Deck of Cards, turning them into a Deadly Cascade for the target.',
                linkedItem2: 'Deadly Cascade',
                method3:
                  'Ryan Powers, posing as a volunteer in the magic act, surprises the target with a RPG-7, leaving no room for escape.',
                linkedItem3: 'RPG-7',
              },
              {
                Name: 'Anette Chambers',
                isActive: true,
                isKiller: false,
                privLevel: 'Standard',
                method1:
                  'Anette Chambers, an elegant guest at the theater dinner party, discreetly deploys a Silent Dart, ensuring a lethal and unnoticed strike.',
                linkedItem1: 'Silent Dart',
                method2:
                  'During the magic show, Anette Chambers enchants a seemingly ordinary Rose, turning it into a Poisoned Bloom for a fatal outcome.',
                linkedItem2: 'Poisoned Bloom',
                method3:
                  'Anette Chambers, posing as part of the magic act, surprises the target with a Hidden Wand, leaving no time for a defense.',
                linkedItem3: 'Hidden Wand',
              },
              {
                Name: 'Baron Lancaster',
                isActive: true,
                isKiller: false,
                privLevel: 'Standard',
                method1:
                  "Baron Lancaster, attending the theater dinner party, discreetly administers a Lethal Dose through an unsuspecting target's drink using a Concealed Vial.",
                linkedItem1: 'Concealed Vial',
                method2:
                  'During the magic show, Baron Lancaster manipulates the Grand Illusion, creating a chaotic diversion to swiftly eliminate the target with their switchblade shoe.',
                linkedItem2: 'Switchblade shoe',
                method3:
                  'Baron Lancaster, a master of disguise, infiltrates the magic show, eliminating the target with a Disguised Device hidden in plain sight.',
                linkedItem3: 'Disguised Device',
              },
              {
                Name: 'The Lieutenant',
                isActive: true,
                isKiller: false,
                privLevel: 'Authorized',
                method1:
                  'The Lieutenant, authorized personnel at the theater dinner party, discreetly utilizes a Silent Pistol for a precise and covert elimination of the target.',
                linkedItem1: 'Silent Pistol',
                method2:
                  'During the authorized magic show, The Lieutenant employs a Tactical Diversion, allowing for a swift and lethal strike with a Covert Weapon.',
                linkedItem2: 'Covert Weapon',
                method3:
                  'The Lieutenant, authorized to use force, ensures a calculated and lethal outcome during the magic show with a Precision Strike from a Disguised Blade.',
                linkedItem3: 'Disguised Blade',
              },
              {
                Name: 'Jamie',
                isActive: false,
                isKiller: false,
                privLevel: 'Admin',
                method1:
                  'As an admin, Jamie discreetly deploys a Admin-Only Device during the theater dinner party, ensuring a precise and silent elimination of the target.',
                linkedItem1: 'Admin-Only Device',
                method2:
                  'Using admin privileges during the magic show, Jamie manipulates the Illusion Server, creating a digital diversion for a stealthy and lethal strike.',
                linkedItem2: 'Illusion Server',
                method3:
                  'Jamie, leveraging admin access, orchestrates a Fatal Glitch in the magic show, leading to an unexpected demise for the target.',
                linkedItem3: 'Fatal Glitch',
              },
              {
                Name: 'Dan',
                isActive: false,
                isKiller: false,
                privLevel: 'Admin',
                method1:
                  'As an admin, Dan deploys a Hidden Admin Tool during the theater dinner party, ensuring a discreet and lethal elimination of the target.',
                linkedItem1: 'Hidden Admin Tool',
                method2:
                  'Using admin privileges during the magic show, Dan manipulates the Virtual Illusion, creating a digital diversion for a stealthy and lethal strike.',
                linkedItem2: 'Virtual Illusion',
                method3:
                  'Dan, leveraging admin access, orchestrates a System Override in the magic show, leading to an unexpected demise for the target.',
                linkedItem3: 'System Override',
              },
            ],
          });
        }, 300);
      });
      parseCharData(response.data);
      setPlayers(response.data);
      setActivePlayers(
        response.data.filter(player => player.isActive === true)
      );

      const retrievedSettings = {
        appTitle: "Jerry's",
        appKey: 'LANCASTER',
        selectedMethod: 'Hidden Dagger',
        killer: 'Taylor Lancaster',
        defaultAppColor: '#6B001E',
        appBackgroundColor: '#303030',
        themeColorDarker: '#3f0515',
        themeColorLighter: '#C8184A',
        navThemeFontColor: '#FFFFFF',
        primaryFontColor: '#DC4C64',
        primaryButtonColor: '#DC4C64',
        primaryButtonFontColor: '#FFFFFF',
        newspaperTitle: 'Lancaster Ledger',
        allowUserUserMessaging: false,
        appLogo: 'test.jpg',
      };
      setAppTitle(retrievedSettings.appTitle);
      setAppKey(retrievedSettings.appKey);
      setSelectedMethod(retrievedSettings.selectedMethod);
      setKiller(retrievedSettings.killer);
      setDefaultAppColor(retrievedSettings.defaultAppColor);
      setThemeColorDarker(retrievedSettings.themeColorDarker);
      setThemeColorLighter(retrievedSettings.themeColorLighter);
      setNavThemeFontColor(retrievedSettings.navThemeFontColor);
      setPrimaryFontColor(retrievedSettings.primaryFontColor);
      setPrimaryButtonColor(retrievedSettings.primaryButtonColor);
      setPrimaryButtonFontColor(retrievedSettings.primaryButtonFontColor);
      setAppLogo(retrievedSettings.appLogo);
      setNewspaperTitle(retrievedSettings.newspaperTitle);
      setAllowUserUserMessaging(retrievedSettings.allowUserUserMessaging);
      setActiveSettings(retrievedSettings);

      // const databaseMurderWeaponResponse = await axios.get(
      //   'your_endpoint_here', // Replace with your actual endpoint
      //   {
      //     // Replace with your actual Axios configuration (headers, params, etc.)
      //   }
      // );

      // Continue with your data processing logic...
      const parsedData = parseCharData(response.data);
      // Other processing steps...

      // You might want to return the parsed data or handle it as needed
      return parsedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error as needed
    }
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    setImageObject(file);
    setAppLogo(fileName);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    // Add form submission logic here
    ///////////CONFIRMATION/////////////
  };

  const clearForm = () => {
    setTouchedFields({
      appTitle: false,
      appKey: false,
      newspaperTitle: false,
    });
    setAppTitle('');
    setAppKey('');
    setIsInit(true);
    setClicked(false);
    setSelectedMethod('-- Choose --');
    setKiller('');
    setDefaultAppColor('#6B001E');
    setAppBackgroundColor('#303030');
    setThemeColorLighter('#c8184a');
    setThemeColorDarker('#3f0515');
    setNavThemeFontColor('#FFFFFF');
    setPrimaryFontColor('#DC4C64');
    setPrimaryButtonColor('#DC4C64');
    setPrimaryButtonFontColor('#FFFFFF');
    setAppLogo(null);
    setNewspaperTitle('');
    setAllowUserUserMessaging(false);
  };

  const isValidHex = inputHexString => {
    const test = inputHexString.toUpperCase();
    const testHexChar = char => /^[0-9A-F]$/.test(char);

    return (
      test.length === 7 &&
      test[0] === '#' &&
      Array.from(test.slice(1)).every(testHexChar)
    );
  };

  const checkValidation = () => {
    const currentSettings = {
      appTitle: appTitle,
      appKey: appKey,
      selectedMethod: selectedMethod,
      killer: killer,
      defaultAppColor: defaultAppColor,
      appBackgroundColor: appBackgroundColor,
      themeColorDarker: themeColorDarker,
      themeColorLighter: themeColorLighter,
      navThemeFontColor: navThemeFontColor,
      primaryFontColor: primaryFontColor,
      primaryButtonColor: primaryButtonColor,
      primaryButtonFontColor: primaryButtonFontColor,
      newspaperTitle: newspaperTitle,
      allowUserUserMessaging: allowUserUserMessaging,
      appLogo: appLogo,
    };

    const currentSettingsString = JSON.stringify(currentSettings);
    const activeSettingsString = JSON.stringify(activeSettings);

  if (currentSettingsString === activeSettingsString){
    setIsSettingsChange(false);
    setIsValidToSubmit(false);
  } else if (
      appTitle.length < 4 ||
      appTitle.length > 32 ||
      appKey.length !== 9 ||
      newspaperTitle.length < 8 ||
      newspaperTitle.length > 64 ||
      appLogo === null ||
      appLogo === undefined ||
      !isValidHex(defaultAppColor) ||
      !isValidHex(appBackgroundColor) ||
      !isValidHex(themeColorDarker) ||
      !isValidHex(themeColorLighter) ||
      !isValidHex(navThemeFontColor) ||
      !isValidHex(primaryFontColor) ||
      !isValidHex(primaryButtonColor) ||
      !isValidHex(primaryButtonFontColor)
    ) {
      setIsValidToSubmit(false);
      setIsSettingsChange(true);
    } else {
      setIsValidToSubmit(true);
      setIsSettingsChange(true);
    }

    console.log('current settings: ',currentSettings);
    console.log('active settings: ',activeSettings);
  };

  const markFieldAsTouched = fieldName => {
    setTouchedFields(prevTouchedFields => ({
      ...prevTouchedFields,
      [fieldName]: true,
    }));
  };

  useEffect(() => {
    checkValidation();
  }, [
    appTitle,
    appKey,
    selectedMethod,
    killer,
    defaultAppColor,
    appBackgroundColor,
    themeColorDarker,
    themeColorLighter,
    navThemeFontColor,
    primaryFontColor,
    primaryButtonColor,
    primaryButtonFontColor,
    newspaperTitle,
    appLogo,
    allowUserUserMessaging,
  ]);

  const nonInit = () => {
    setIsInit(false);
  };

  useEffect(() => {
    if (clicked && isInit) {
      nonInit();
    }
  }, [clicked]);

  useEffect(() => {
    if (selectedMethod !== '-- Choose --') {
      nonInit();
    }
  }, [selectedMethod]);

  useEffect(() => {
    const guiltyPlayer = players.find(player => player.isKiller === true)?.Name;
    setKiller(guiltyPlayer || '');
  }, [players]);

  const imgCheck = input => {
    if (input === 1) {
      let idVal;
      if (appLogo) {
        idVal = 'fileInputPopulated';
      } else {
        idVal = 'fileInput';
      }
      return idVal;
    }
  };

  useEffect(() => {
    requestFullScreen();
    setTab('admin-controls');
    setAppTitle("Jerry's"); /////change!!!!!!!!!!!!!!!!!!!!!!!!
    fetchData().then(resolve => {
      resolve();
    });
    const databaseMurderWeapon = 'Silent Sniper';

    // Search for the killer associated with the given databaseMurderWeapon
    const foundCrime = crimes.find(
      crime =>
        crime.method1 === databaseMurderWeapon ||
        crime.method2 === databaseMurderWeapon ||
        crime.method3 === databaseMurderWeapon
    );

    // If a matching crime is found, set the selected method and killer
    if (foundCrime) {
      if (foundCrime.method1 === databaseMurderWeapon) {
        setSelectedMethod(foundCrime.method1);
      } else if (foundCrime.method2 === databaseMurderWeapon) {
        setSelectedMethod(foundCrime.method2);
      } else {
        setSelectedMethod(foundCrime.method3);
      }
      setKiller(foundCrime.Name);
    } else {
      // Handle the case when no matching crime is found
      setSelectedMethod('');
      setKiller('');
    }
    //returnSelectedValueViaSQL, otherwise set -- Choose --
  }, []);

  return (
    <div
      className='create-character-container mt-1 my-custom-scroll-skinny'
      style={{ height: '73vh' }}
    >
      <h1 className='header-text mb-0' style={{ width: 'max-content' }}>
        App Settings:
      </h1>
      <div className='create-character-form text-start' onClick={() => exitFullScreen()}>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-3 pt-1'>
            <label htmlFor='appTitle' className='form-label text-danger'>
              App Title:
            </label>
            <input
              type='text'
              className='form-control custInput'
              id='appTitle'
              placeholder={`Murder Mystery's Title...`}
              value={appTitle}
              onChange={e => {
                setAppTitle(e.target.value);
                markFieldAsTouched('appTitle');
              }}
              style={
                touchedFields.appTitle &&
                (appTitle.length < 4 || appTitle.length > 32)
                  ? {
                      backgroundColor: 'rgb(253, 193, 193)',
                      borderRadius: '5px',
                      padding: '10px',
                    }
                  : { borderRadius: '5px', padding: '10px' }
              }
            />
            {touchedFields.appTitle &&
            (appTitle.length < 4 || appTitle.length > 32) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *App Title must be 4-32 characters in length!
                </p>
              </div>
            ) : null}
          </div>
          <div className='mb-3'>
            <label htmlFor='appKey' className='form-label text-danger'>
              App Keycode:
            </label>
            <input
              type='text'
              className='form-input'
              id='appKey'
              placeholder={`Enter App's Keycode...`}
              value={appKey}
              onChange={e => {
                setAppKey(e.target.value.toUpperCase());
                markFieldAsTouched('appKey');
              }}
              style={
                touchedFields.appKey && appKey.length !== 9
                  ? {
                      backgroundColor: 'rgb(253, 193, 193)',
                      borderRadius: '5px 0px 0px 5px',
                      padding: '10px',
                      width: 'calc(100%-36px)',
                    }
                  : {
                      borderRadius: '5px 0px 0px 5px',
                      padding: '10px',
                      width: 'calc(100%-36px)',
                    }
              }
            />
            <button
              type='button'
              className='refresh-button'
              style={{
                width: '36px',
                height: '48px',
                borderRadius: '0px 5px 5px 0px',
                border: '1px solid #ccc',
                borderLeft: 'none',
              }}
              onClick={getRandomCode}
            >
              <FiRefreshCw />
            </button>
            {touchedFields.appKey && appKey.length !== 9 ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *App Key must be 9 characters in length!
                </p>
              </div>
            ) : null}
          </div>

          <div className='mb-3'>
            <label
              htmlFor='appTitle'
              className='form-label my-app-button-color-to-font'
            >
              Murder Method/Weapon:
            </label>
            <div className='d-flex'>
              <select
                className={`form-input ${isInit ? 'fst-italic' : ''}`}
                id='selectedMethod'
                value={selectedMethod}
                onChange={handleMethodChange}
                onClick={() => {
                  if (!clicked) setClicked(true);
                  exitFullScreen();
                }}
                style={{
                  color: `${isInit ? 'gray' : 'black'}`,
                  width: 'calc(100%-36px)',
                  backgroundColor: 'white',
                }}
              >
                <option disabled value=''>
                  -- Choose --
                </option>
                {crimes.map(crime => (
                  <React.Fragment key={crime.name}>
                    {crime.method1 && (
                      <option value={crime.method1}>{crime.method1}</option>
                    )}
                    {crime.method2 && (
                      <option value={crime.method2}>{crime.method2}</option>
                    )}
                    {crime.method3 && (
                      <option value={crime.method3}>{crime.method3}</option>
                    )}
                  </React.Fragment>
                ))}
              </select>
              <button
                type='button'
                className='refresh-button custInput2'
                onClick={selectRandomMethod}
                style={{
                  height: '48px',
                  width: '36px',
                  borderRadius: '0 5px 5px 0',
                }}
              >
                <FiRefreshCw size={16} />
              </button>
            </div>
          </div>

          <div className='mb-3'>
            <label
              htmlFor='killer'
              className='form-label my-app-button-color-to-font'
            >
              Killer:
            </label>
            <div className='d-flex'>
              <select
                className={`form-control custInput`}
                id='killer'
                value={killer}
                readOnly
                style={{
                  height: '48px',
                  width: 'calc(100%-36px)',
                  backgroundColor: 'white',
                }}
              >
                <option disabled value={killer}>
                  {killer}
                </option>
              </select>
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label
                htmlFor='defaultAppColor'
                className='form-label text-danger'
              >
                Theme/Nav Color:
              </label>
              <div className='input-group mb-3'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='defaultAppColor'
                  value={defaultAppColor}
                  onChange={e => setDefaultAppColor(e.target.value)}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={defaultAppColor}
                  onChange={e => setDefaultAppColor(e.target.value.toUpperCase())}
                  style={
                    isValidHex(defaultAppColor)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(defaultAppColor) ? (
                <div style={{ marginTop: '-10px' }}>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>

            <div className='col-md-6'>
              <label
                htmlFor='appBackgroundColor'
                className='form-label text-danger'
              >
                App Background Color:
              </label>
              <div className='input-group'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='appBackgroundColor'
                  value={appBackgroundColor}
                  onChange={e => setAppBackgroundColor(e.target.value)}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={appBackgroundColor}
                  onChange={e => setAppBackgroundColor(e.target.value.toUpperCase())}
                  style={
                    isValidHex(appBackgroundColor)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(appBackgroundColor) ? (
                <div>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label
                htmlFor='themeColorLighter'
                className='form-label text-danger'
              >
                Theme Lighter Color:
              </label>
              <div className='input-group mb-3'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='themeColorLighter'
                  value={themeColorLighter}
                  onChange={e => setThemeColorLighter(e.target.value)}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={themeColorLighter}
                  onChange={e => setThemeColorLighter(e.target.value.toUpperCase())}
                  style={
                    isValidHex(themeColorLighter)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(themeColorLighter) ? (
                <div style={{ marginTop: '-10px' }}>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>

            <div className='col-md-6'>
              <label
                htmlFor='themeColorDarker'
                className='form-label text-danger'
              >
                Theme Darker Color:
              </label>
              <div className='input-group'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='themeColorDarker'
                  value={themeColorDarker}
                  onChange={e => setThemeColorDarker(e.target.value)}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={themeColorDarker}
                  onChange={e => setThemeColorDarker(e.target.value.toUpperCase())}
                  style={
                    isValidHex(themeColorDarker)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(themeColorDarker) ? (
                <div>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label
                htmlFor='primaryFontColor'
                className='form-label text-danger'
              >
                Primary Font Color:
              </label>
              <div className='input-group mb-3'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='primaryFontColor'
                  value={primaryFontColor}
                  onChange={e => setPrimaryFontColor(e.target.value)}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={primaryFontColor}
                  onChange={e => setPrimaryFontColor(e.target.value.toUpperCase())}
                  style={
                    isValidHex(primaryFontColor)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(primaryFontColor) ? (
                <div style={{ marginTop: '-10px' }}>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>

            <div className='col-md-6'>
              <label
                htmlFor='navThemeFontColor'
                className='form-label text-danger'
              >
                Nav/Theme Font Color:
              </label>
              <div className='input-group'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='navThemeFontColor'
                  value={navThemeFontColor}
                  onChange={e => setNavThemeFontColor(e.target.value)}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={navThemeFontColor}
                  onChange={e => setNavThemeFontColor(e.target.value.toUpperCase())}
                  style={
                    isValidHex(navThemeFontColor)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(navThemeFontColor) ? (
                <div>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-6'>
              <label
                htmlFor='primaryButtonColor'
                className='form-label text-danger'
              >
                Primary Button Color:
              </label>
              <div className='input-group mb-3'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='primaryButtonColor'
                  value={primaryButtonColor}
                  onChange={e => setPrimaryButtonColor(e.target.value)}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={primaryButtonColor}
                  onChange={e => setPrimaryButtonColor(e.target.value.toUpperCase())}
                  style={
                    isValidHex(primaryButtonColor)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(primaryButtonColor) ? (
                <div style={{ marginTop: '-10px' }}>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>

            <div className='col-md-6'>
              <label
                htmlFor='primaryButtonFontColor'
                className='form-label text-danger'
              >
                Button Font Color
              </label>
              <div className='input-group'>
                <input
                  type='color'
                  className='form-control custInput'
                  id='primaryButtonFontColor'
                  value={primaryButtonFontColor}
                  onChange={e => setPrimaryButtonFontColor(e.target.value)}
                  style={{
                    borderRadius: '5px 0 0 5px',
                    padding: '10px',
                    height: '48px',
                    width: '48px',
                  }}
                />
                <input
                  type='text'
                  className='form-control custInput text-uppercase'
                  placeholder='Enter #HEXNUM...'
                  value={primaryButtonFontColor}
                  onChange={e => setPrimaryButtonFontColor(e.target.value.toUpperCase())}
                  style={
                    isValidHex(primaryButtonFontColor)
                      ? {
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                      : {
                          backgroundColor: 'rgb(253, 193, 193)',
                          borderRadius: '0 5px 5px 0',
                          padding: '10px',
                          width: 'calc(100% - 48px)',
                          cursor: 'pointer',
                        }
                  }
                />
              </div>
              {!isValidHex(primaryButtonFontColor) ? (
                <div>
                  <p className='form-error-message'>
                    *Invalid HEX code! #0-9A-F
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='mb-3'>
            <label
              htmlFor='newspaperTitle'
              className='form-label my-app-button-color-to-font'
            >
              Newspaper Title:
            </label>
            <input
              type='text'
              className='form-control custInput'
              id='newspaperTitle'
              placeholder={`Enter your Newspaper Title...`}
              value={newspaperTitle}
              onChange={e => {
                setNewspaperTitle(e.target.value);
                markFieldAsTouched('newspaperTitle');
              }}
              onClick={() => exitFullScreen()}
              style={
                touchedFields.newspaperTitle &&
                (newspaperTitle.length < 8 || newspaperTitle.length > 64)
                  ? {
                      backgroundColor: 'rgb(253, 193, 193)',
                      borderRadius: '5px',
                      padding: '10px',
                    }
                  : { borderRadius: '5px', padding: '10px' }
              }
            />
            {touchedFields.newspaperTitle &&
            (newspaperTitle.length < 8 || newspaperTitle.length > 64) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Your App's Newspaper Title must be 8-64 characters in length!
                </p>
              </div>
            ) : null}
          </div>

          <div className='form-group mb-2'>
            <label className='my-app-button-color-to-font' htmlFor='allowUserUserMessaging'>User-to-User Texting: </label>
            <div className='input-group'>
              <select
                id='allowUserUserMessaging'
                name='allowUserUserMessaging'
                className={`form-input-password`}
                value={allowUserUserMessaging}
                style={{ backgroundColor: 'white' }}
                onChange={e => {
                  e.target.value === 'true'
                    ? setAllowUserUserMessaging(true)
                    : setAllowUserUserMessaging(false)
                }}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='appLogo' className='form-label text-danger'>
              App Logo:
            </label>
            <input
              type='file'
              className='form-control-file text-primary custom-file-input'
              id='appLogo'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={e => handleImageUpload(e)}
            />
            <div className='d-flex'>
              <div
                className={`d-flex justify-content-start align-items-center`}
                id={imgCheck(1)}
              >
                <div
                  className='custom-upload-button'
                  onClick={() => document.getElementById('appLogo').click()}
                >
                  File <FiUpload />
                </div>
                <div id='input1-name-text' className='text-primary fs-italic'>
                  {appLogo ? appLogo : '*No File...'}
                </div>
              </div>
              {appLogo ? (
                <div
                  className='delete-img-div'
                  style={{
                    width: '15%',
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    padding: '0px 5px',
                  }}
                >
                  {' '}
                  <FiX
                    className='delete-image-attachment'
                    onClick={() => setAppLogo(null)}
                  />{' '}
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
      <div className='d-flex justify-content-around py-2'>
        <button
          disabled={!isValidToSubmit}
          className='btn'
          id='create-submit'
          type='submit'
          style={{ width: '75px' }}
        >
          Submit
        </button>
        <button
          onClick={() => {
            requestFullScreen();
            clearForm();
          }}
          id='create-clear'
          className='btn'
          style={{ width: '75px' }}
        >
          Clear
        </button>
        <button
          id='create-cancel'
          className='btn'
          onClick={() => navigate('/event-portal')}
          style={{ width: '75px', marginLeft: '4px' }}
        >
          Cancel
        </button>
      </div>
      {
        !isSettingsChange ?
        <div>
          <p className='text-center my-page-font-color italic'>
            *No settings have been altered yet
          </p>
        </div> : null
      }
    </div>
  );
};

export default AdminControls;
