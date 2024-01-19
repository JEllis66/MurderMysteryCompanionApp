import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { FiRefreshCw, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const GenStrings = {
  firstNames: [
    'Aaron',
    'Adam',
    'Adrian',
    'Aiden',
    'Alan',
    'Albert',
    'Alex',
    'Alexander',
    'Andrew',
    'Anthony',
    'Arthur',
    'Austin',
    'Benjamin',
    'Bentley',
    'Blake',
    'Brandon',
    'Brayden',
    'Bryan',
    'Caleb',
    'Cameron',
    'Carter',
    'Charles',
    'Chase',
    'Christian',
    'Christopher',
    'Colton',
    'Connor',
    'Daniel',
    'David',
    'Dominic',
    'Dylan',
    'Eli',
    'Elijah',
    'Ethan',
    'Evan',
    'Finn',
    'Gabriel',
    'Gavin',
    'George',
    'Grayson',
    'Henry',
    'Hudson',
    'Hunter',
    'Ian',
    'Isaac',
    'Isaiah',
    'Jack',
    'Jackson',
    'Jacob',
    'James',
    'Jason',
    'Jaxon',
    'Jayden',
    'Jeremiah',
    'John',
    'Jonathan',
    'Jordan',
    'Joseph',
    'Joshua',
    'Josiah',
    'Julian',
    'Justin',
    'Kaden',
    'Kaiden',
    'Kayden',
    'Kevin',
    'Landon',
    'Leo',
    'Levi',
    'Liam',
    'Logan',
    'Lucas',
    'Luke',
    'Mason',
    'Matthew',
    'Max',
    'Michael',
    'Nathan',
    'Nathaniel',
    'Nicholas',
    'Noah',
    'Oliver',
    'Owen',
    'Parker',
    'Ryan',
    'Samuel',
    'Sebastian',
    'Sophia',
    'Toby',
    'William',
    'Wyatt',
    'Xavier',
    'Zachary',
    'Zane',
    'Abigail',
    'Addison',
    'Adeline',
    'Aaliyah',
    'Alice',
    'Alexa',
    'Allison',
    'Amelia',
    'Anna',
    'Aria',
    'Ariana',
    'Arianna',
    'Audrey',
    'Aurora',
    'Aubrey',
    'Ava',
    'Avery',
    'Autumn',
    'Bella',
    'Brielle',
    'Brooklyn',
    'Camila',
    'Caroline',
    'Charlotte',
    'Chloe',
    'Cora',
    'Cora',
    'Delilah',
    'Eleanor',
    'Elena',
    'Eliana',
    'Ella',
    'Elliana',
    'Ellie',
    'Emery',
    'Emilia',
    'Eva',
    'Evelyn',
    'Everly',
    'Gabriella',
    'Genesis',
    'Gianna',
    'Giuliana',
    'Grace',
    'Hannah',
    'Hailey',
    'Harper',
    'Hazel',
    'Isla',
    'Ivy',
    'Josephine',
    'Julia',
    'Kaylee',
    'Kennedy',
    'Kinsley',
    'Layla',
    'Leah',
    'Liliana',
    'Lily',
    'Lucy',
    'Luna',
    'Lydia',
    'Madeline',
    'Madelyn',
    'Mia',
    'Mila',
    'Natalie',
    'Nevaeh',
    'Nora',
    'Nova',
    'Olivia',
    'Paisley',
    'Penelope',
    'Peyton',
    'Piper',
    'Quinn',
    'Rylie',
    'Ruby',
    'Sadie',
    'Samantha',
    'Savannah',
    'Scarlett',
    'Serenity',
    'Skylar',
    'Sophia',
    'Sophia',
    'Sophie',
    'Stella',
    'Valentina',
    'Violet',
    'Vivian',
    'Willow',
    'Zoe',
    'Zoey',
  ],
  surnames: [
    'Adams',
    'Aguilar',
    'Alvarez',
    'Anderson',
    'Arroyo',
    'Bates',
    'Bailey',
    'Brown',
    'Campbell',
    'Carter',
    'Castro',
    'Chang',
    'Choi',
    'Davis',
    'Delgado',
    'Diaz',
    'Dixon',
    'Edwards',
    'Elliott',
    'Espinoza',
    'Estrada',
    'Ferguson',
    'Flores',
    'Foster',
    'Fuentes',
    'Garcia',
    'Gibson',
    'Gomez',
    'Gonzalez',
    'Gutierrez',
    'Hanson',
    'Harris',
    'Hernandez',
    'Holland',
    'Ingram',
    'Inoue',
    'Ishikawa',
    'Ito',
    'Jackson',
    'Jenkins',
    'Johnson',
    'Jones',
    'Kato',
    'Kaur',
    'Kim',
    'Lam',
    'Larson',
    'Liu',
    'Lopez',
    'Martinez',
    'Medina',
    'Mendoza',
    'Morgan',
    'Murray',
    'Nakamura',
    'Nelson',
    'Nguyen',
    'Norton',
    'Nunez',
    "O'Neill",
    'Ochoa',
    'Ortega',
    'Ortiz',
    'Owens',
    'Parker',
    'Patel',
    'Park',
    'Pena',
    'Perez',
    'Quinn',
    'Quintero',
    'Ramirez',
    'Ramos',
    'Reid',
    'Reyes',
    'Roberts',
    'Santos',
    'Sato',
    'Silva',
    'Smith',
    'Taylor',
    'Thompson',
    'Torres',
    'Tran',
    'Turner',
    'Ueda',
    'Ueno',
    'Underwood',
    'Uribe',
    'Vargas',
    'Vasquez',
    'Villa',
    'Villanueva',
    'Watson',
    'Williams',
    'Wong',
    'Wu',
    'Xander',
    'Xia',
    'Xiao',
    'Xiong',
    'Xu',
    'Yan',
    'Yates',
    'Yilmaz',
    'Yoo',
    'Zamora',
    'Zavala',
    'Zhang',
    'Zhao',
    'Zimmerman',
  ],
  occupations: [
    'Accountant',
    'Actor',
    'Architect',
    'Artist',
    'Astronomer',
    'Barista',
    'Bartender',
    'Biologist',
    'Chef',
    'Chiropractor',
    'Dentist',
    'Designer',
    'Detective',
    'Dietitian',
    'Economist',
    'Electrician',
    'Engineer',
    'Fashion Designer',
    'Firefighter',
    'Flight Attendant',
    'Graphic Designer',
    'Historian',
    'Interior Designer',
    'Journalist',
    'Judge',
    'Landscape Architect',
    'Lawyer',
    'Librarian',
    'Lifeguard',
    'Meteorologist',
    'Model',
    'Nurse',
    'Optometrist',
    'Paramedic',
    'Pharmacist',
    'Photographer',
    'Physician',
    'Physicist',
    'Pilot',
    'Police Officer',
    'Professor',
    'Psychiatrist',
    'Psychologist',
    'Radiologist',
    'Real Estate Agent',
    'Research Scientist',
    'Sales Manager',
    'Scientist',
    'Sculptor',
    'Social Worker',
    'Software Developer',
    'Speech Therapist',
    'Surgeon',
    'Teacher',
    'Translator',
    'Veterinarian',
    'Web Developer',
    'Writer',
    'Zoologist',
    'Acupuncturist',
    'Agricultural Engineer',
    'Air Traffic Controller',
    'Animal Trainer',
    'Animator',
    'Aromatherapist',
    'Auctioneer',
    'Blacksmith',
    'Bricklayer',
    'Cartographer',
    'Chimney Sweep',
    'Cobbler',
    'Criminal Profiler',
    'Cryptographer',
    'Dance Instructor',
    'Dermatologist',
    'Embalmer',
    'Ethnographer',
    'Exterminator',
    'Farrier',
    'Film Director',
    'Fisherman',
    'Flight Instructor',
    'Florist',
    'Forensic Scientist',
    'Glassblower',
    'Herpetologist',
    'Hypnotherapist',
    'Jeweler',
    'Linguist',
    'Magician',
    'Makeup Artist',
    'Marine Biologist',
    'Mixologist',
    'Nanny',
    'Nutritionist',
    'Oceanographer',
    'Paralegal',
    'Park Ranger',
    'Pawnbroker',
    'Pedicurist',
    'Personal Trainer',
    'Pet Groomer',
    'Puppeteer',
    'Sommelier',
    'Taxidermist',
    'Technical Writer',
    'Tour Guide',
    'Upholsterer',
    'Ventriloquist',
    'Welder',
    'Yoga Instructor',
    'Zookeeper',
  ],
  meetingPhrases: [
    'A chance encounter at a coffee shop led to a lifelong friendship.',
    'A mutual interest in books sparked a conversation in the library.',
    'An unexpected conversation at a park led to a new friendship.',
    'During a charity event, they crossed paths and discussed their shared passion for helping others.',
    'He bumped into her at a crowded music festival and they danced the night away.',
    'In a cooking class, they were paired as cooking partners and became fast friends.',
    'She met him at a community gardening event and discovered their shared love for plants.',
    'They were both waiting in line at a food truck and struck up a conversation about their favorite foods.',
    'While volunteering at a local shelter, they met and realized they had similar values.',
    'At a neighborhood block party, they bonded over their love for BBQ.',
    'During a hiking trip, they got lost together and had to work as a team to find their way back.',
    'At a technology conference, they met during a breakout session and discussed their innovative ideas.',
    'In an art gallery, they both admired the same painting and started talking about their love for art.',
    'She accidentally spilled her coffee on him at a cafe, and they laughed it off and became friends.',
    'During a yoga class, they were both beginners and struggled together, forming a yoga buddy friendship.',
    "At a local farmers' market, they bonded over their appreciation for fresh, organic produce.",
    'They were both waiting for their kids at the school gates and struck up a conversation about parenting.',
    'In a foreign country, they met at a tourist attraction and decided to explore the city together.',
    'During a work conference, they met at a networking event and shared professional insights.',
    'She met him at a dog park while their furry companions played together, leading to a doggy playdate friendship.',
    'At a charity run, they encouraged each other to finish the race and celebrated together at the finish line.',
    'During a dance class, they partnered up and learned the steps together, becoming dance buddies.',
    'At a local comedy show, they sat next to each other and laughed at the same jokes.',
    'They met while waiting for their cars to be serviced at the auto shop and discussed their favorite car models.',
    'In a community choir, they sang harmoniously together and developed a close-knit friendship.',
    'At a neighborhood watch meeting, they connected over their commitment to keeping their community safe.',
    'During a knitting class, they both struggled with purling and helped each other master the technique.',
    'She met him while attending a neighborhood cleanup event and realized they shared a love for environmental conservation.',
    'At a language exchange meetup, they practiced speaking a new language together and became language partners.',
    'In a city park, they both enjoyed bird-watching and shared their passion for ornithology.',
    'They met while shopping for groceries and bonded over their love for cooking and food.',
    'During a book club meeting, they discussed their favorite novels and formed a literary friendship.',
    'At a local theater, they watched the same play and later analyzed its themes over coffee.',
    'She met him at a meditation retreat, and their shared quest for mindfulness brought them together.',
    'In a pet adoption center, they both fell in love with the same rescue dog and decided to co-adopt it.',
    'At a local gym, they were workout buddies and motivated each other to achieve their fitness goals.',
    'During a gardening workshop, they planted seeds together and nurtured their budding friendship.',
    'She met him at a local astronomy club, and their shared interest in stargazing led to late-night observations.',
    "At a photography exhibition, they admired the same photographer's work and exchanged creative ideas.",
    'They crossed paths at a city marathon and cheered each other on to the finish line.',
    'In a historical reenactment group, they portrayed characters from the past and learned about history together.',
    'She met him at a beach cleanup event and discussed their love for marine conservation.',
    'At a charity gala, they both volunteered as event organizers and worked closely to make the night a success.',
    'During a charity bike ride, they pedaled side by side and raised funds for a meaningful cause.',
    'In a woodworking class, they crafted wooden masterpieces together, forming a crafty friendship.',
    'They met at a local farm during apple picking season and bonded over fresh apple pie recipes.',
    'At a neighborhood watch meeting, they connected over their commitment to keeping their community safe.',
    'During a knitting class, they both struggled with purling and helped each other master the technique.',
    'She met him while attending a neighborhood cleanup event and realized they shared a love for environmental conservation.',
    'At a language exchange meetup, they practiced speaking a new language together and became language partners.',
    'In a city park, they both enjoyed bird-watching and shared their passion for ornithology.',
    'They met while shopping for groceries and bonded over their love for cooking and food.',
    'During a book club meeting, they discussed their favorite novels and formed a literary friendship.',
    'At a local theater, they watched the same play and later analyzed its themes over coffee.',
    'She met him at a meditation retreat, and their shared quest for mindfulness brought them together.',
    'In a pet adoption center, they both fell in love with the same rescue dog and decided to co-adopt it.',
    'At a local gym, they were workout buddies and motivated each other to achieve their fitness goals.',
    'During a gardening workshop, they planted seeds together and nurtured their budding friendship.',
    'She met him at a local astronomy club, and their shared interest in stargazing led to late-night observations.',
    "At a photography exhibition, they admired the same photographer's work and exchanged creative ideas.",
    'They crossed paths at a city marathon and cheered each other on to the finish line.',
    'In a historical reenactment group, they portrayed characters from the past and learned about history together.',
    'She met him at a beach cleanup event and discussed their love for marine conservation.',
    'At a charity gala, they both volunteered as event organizers and worked closely to make the night a success.',
    'During a charity bike ride, they pedaled side by side and raised funds for a meaningful cause.',
    'In a woodworking class, they crafted wooden masterpieces together, forming a crafty friendship.',
    'They met at a local farm during apple picking season and bonded over fresh apple pie recipes.',
  ],
  motives: [
    'Accused of stealing a cherished possession: Accusations flew as cherished items went missing.',
    'Argument over a parking space: Fender-benders and shouting matches in the crowded lot.',
    'Betrayed trust in a friendship: Broken confidences eroded bonds of friendship.',
    'Caught cheating in a competition: A cheating scandal tarnished their reputation.',
    'Clashed over parenting styles: Arguments over discipline and upbringing grew relentless.',
    'Competed for academic achievements: The quest for top grades led to fierce rivalry.',
    'Conflict in a professional setting: Office politics and backstabbing soured camaraderie.',
    'Confrontation at a family gathering: Heated debates turned family gatherings into battlegrounds.',
    'Criticism of personal appearance: Hurtful remarks about looks and appearance.',
    'Differing opinions on art or music: Tastes diverged, appreciation became disdain.',
    'Disagreed on a political issue: Heated debates over conflicting ideologies tore them apart.',
    'Disagreement over a social event: Parties and gatherings turned into battlegrounds.',
    'Disapproved of dietary choices: Food preferences became a point of contention.',
    'Disapproval of lifestyle choices: Clashing values led to judgment and a growing rift.',
    "Disliked the other person's humor: Sense of humor clashed, jokes fell flat.",
    'Divorce and custody battles: Legal disputes strained relationships beyond repair.',
    'Felt betrayed in a romantic relationship: Heartbreak and mistrust fueled resentment.',
    "Fought over an inheritance: Siblings battled over a loved one's assets.",
    'Gossip and spreading false rumors: Lies and gossip poisoned relationships.',
    'Grudges from past rivalries: Childhood competitors never buried the hatchet.',
    'Historical animosity between their families: Generations of animosity weighed down their bond.',
    'Insulted family or loved ones: Offensive comments about loved ones hurt deeply.',
    "Jealousy over the other person's success: Envy grew as their peer's achievements overshadowed their own.",
    'Lied or deceived in a relationship: Deceit shattered trust and fueled animosity.',
    'Made hurtful comments about appearance: Insults about looks and image led to resentment.',
    'Miscommunication that led to anger: Lost in translation, emotions flared and tensions rose.',
    'Misunderstanding a comment or action: Words twisted, feelings hurt, a friendship strained.',
    'Overstepped boundaries in a friendship: Friendship crossed into uncomfortable territory.',
    'Personal betrayal in a business deal: Business partners turned adversaries after betrayal.',
    'Rivalry in a sports team: Teammates turned against each other in fierce competition.',
    'Romantic infidelity and affairs: Betrayal of trust in relationships led to anger and hatred.',
    "Sabotaged each other's success: Underhanded tactics soured professional relationships.",
    'Spreading false rumors about each other: Gossip poisoned relationships, truth buried.',
    'Stole a romantic partner: Love triangles and betrayal of trust.',
    'Struggles for dominance in a group: Power struggles caused rifts in friendships.',
    'Teasing and mocking: Hurtful taunts and mockery led to resentment.',
    'Tension over cultural or religious differences: Deep-seated divisions over beliefs and traditions.',
    'Theft of personal property: Accusations of theft led to anger and mistrust.',
    'Unresolved conflict from childhood: Childhood rivalries left scars that never faded.',
    'Workplace envy and competition: Professional jealousy strained workplace relationships.',
    'Broke their promise to be there when I needed them most.',
    'Publicly humiliated me during a crucial presentation at work.',
    'Gossiped behind my back and spread malicious rumors.',
    'Stole my cherished childhood memento, leaving me heartbroken.',
    'Lied about their intentions in our friendship, betraying my trust.',
    'Took credit for my idea, leaving me feeling undervalued.',
    'Always found a way to undermine my successes and achievements.',
    'Made snide comments about my appearance, causing self-esteem issues.',
    'Mocked my dreams and aspirations, belittling my ambitions.',
    'Disregarded my opinions and ideas consistently, making me feel worthless.',
    'Cancelled plans at the last minute without any consideration.',
    'Showed no empathy or support when I was going through a tough time.',
    'Used our friendship for personal gain, then discarded it like trash.',
    'Drove a wedge between me and my significant other out of jealousy.',
    'Spewed hateful comments about my family, crossing a line.',
    'Betrayed my confidence by sharing my deepest secrets with others.',
    'Took advantage of my kindness and generosity repeatedly.',
    'Sabotaged my chances for a promotion at work out of spite.',
    'Rudely interrupted me every time I tried to voice my opinions.',
    'Always seemed to be competing with me, even in trivial matters.',
    'Sided with my ex during a messy breakup, adding insult to injury.',
    'Relentlessly criticized my hobbies and interests, killing my passion.',
    'Made inappropriate advances and unwanted advances despite my protests.',
    'Demonstrated zero accountability for their mistakes, shifting blame.',
    'Frequently made backhanded compliments that were more hurtful than helpful.',
    'Took credit for my project idea and presented it as their own work.',
    'Spent years belittling my career choices and financial decisions.',
    'Repeatedly borrowed money without ever repaying their debts.',
    'Betrayed my trust by revealing my deepest fears to our entire friend group.',
    'Engaged in cruel pranks that caused lasting emotional pain.',
    'Became bitter after I succeeded and started spreading lies about me.',
    'Destroyed a cherished item of sentimental value out of spite.',
    'Persistently interfered in my romantic relationships, causing breakups.',
    'Made fun of my insecurities, amplifying my self-doubt.',
    'Ignored my boundaries and personal space, making me uncomfortable.',
    'Gaslighted me, making me question my own reality and sanity.',
    'Slandered my name and reputation, tarnishing my image.',
    'Sabotaged my wedding day, turning it into a disaster.',
    "Stole my partner's affection, leading to a painful breakup.",
    'Vandalized my car, causing thousands of dollars in damages.',
    'Tried to turn my closest friends against me with manipulation.',
    'Constantly competed with me for attention, leaving me exhausted.',
    'Publicly berated me during an important social event, humiliating me.',
    'Persistently guilt-tripped me into doing things against my will.',
    'Blamed me for their mistakes and failures, deflecting responsibility.',
    'Used me as a scapegoat to avoid facing consequences of their actions.',
    'Ruined a once-in-a-lifetime opportunity for me out of jealousy.',
    'Faked being sick to prevent me from attending a major event.',
    'Alienated me from our mutual friends with their lies.',
    'Betrayed a long-standing friendship over a minor disagreement.',
    'Stole my creative work and profited from it without giving credit.',
    'Hijacked my social media accounts to spread false information.',
    'Stalked me online and offline, invading my privacy.',
    'Excluded me from important gatherings, isolating me from the group.',
    'Pretended to be supportive while secretly hoping for my failure.',
    'Used our past against me, dredging up painful memories.',
    'Betrayed my trust in business dealings, causing financial losses.',
    'Insulted my cultural background, showing blatant prejudice.',
    'Involved me in their dishonest schemes without my consent.',
    'Constantly put me down with hurtful jokes, damaging my self-esteem.',
    'Bragged about their accomplishments while downplaying mine.',
    'Publicly mocked my relationship status, humiliating me in front of others.',
    'Broke my heart by choosing someone else over me.',
    'Smeared my name in professional circles, affecting my career.',
    'Manipulated my emotions to control my actions and decisions.',
    'Sent anonymous hate mail to tarnish my reputation.',
    'Routinely belittled my achievements and aspirations, sapping my motivation.',
    'Stole credit for my humanitarian work, leaving me unacknowledged.',
    'Lied about my character to ruin my relationships with others.',
    'Purposely damaged my personal belongings, causing financial strain.',
    'Excluded me from social circles and events, leaving me lonely.',
    'Deliberately ignored my feelings and needs in our relationship.',
    'Undermined my parenting decisions, causing family conflicts.',
    'Made offensive comments about my religious beliefs, showing intolerance.',
    'Withheld crucial information to sabotage my success.',
    'Tried to sabotage my health and well-being through manipulation.',
    'Exploited my vulnerabilities for their personal gain.',
    'Continuously insulted my intelligence and competence, damaging my confidence.',
    'Accused me of wrongdoing to deflect attention from their own misdeeds.',
    'Caused a major financial loss by spreading false rumors.',
    'Deliberately embarrassed me in front of peers, leaving me humiliated.',
    'Jealousy drove them to sabotage my love life, leading to heartbreak.',
    'Destroyed my chances of being promoted through cunning schemes.',
    'Made my life a living hell with relentless harassment.',
    'Fueled a toxic work environment with their malicious gossip.',
    'Became hostile over trivial disagreements, escalating conflicts.',
    'Used our shared history to manipulate and hurt me.',
    'Spent years pretending to be a friend while plotting betrayal.',
    'Exploited my weaknesses, pushing me to the brink of despair.',
    'Infiltrated my inner circle to turn friends against me.',
    'Set me up for failure in professional and personal endeavors.',
    'Took pleasure in causing me physical and emotional pain.',
    'Went to great lengths to tarnish my personal and professional life.',
    'Masterminded a smear campaign against me, causing immense suffering.',
    'Sowed discord and division within my family, creating rifts.',
    'Led a campaign of harassment that impacted my mental health.',
    'Went as far as framing me for their own wrongdoings.',
    'Enlisted others to join their vendetta against me.',
    'Persistently undermined my self-worth and self-esteem.',
    'Made false allegations that damaged my reputation and credibility.',
    'Employed manipulation to turn my allies into adversaries.',
    'Deliberately created chaos and turmoil in my life.',
    'Took pleasure in my pain and suffering, showing no remorse.',
    'Waged a relentless campaign of emotional and psychological torment.',
    'Waged a relentless campaign of emotional and psychological torment.',
    'Engaged in a campaign of cyberbullying that left lasting scars.',
    'Tore apart my closest relationships with lies and deceit.',
    'Went to great lengths to destroy my happiness and peace of mind.',
    'Used their power and influence to harm my life and livelihood.',
    'Stooped to unimaginable lows to destroy me and all I held dear.',
    'Schemed against me for years, causing immeasurable suffering.',
    'Drove me to the brink of despair with their ruthless vendetta.',
    'Spared no effort to ruin my life and everything I held dear.',
  ],
};

const CreateCharacter = () => {
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [role, setRole] = useState('');
  const [relationship, setRelationship] = useState('');
  const [motive, setMotive] = useState('');
  const [backstory, setBackstory] = useState('');
  const [priv, setPriv] = useState('-- Select Privilege Level --');
  const [method1, setMethod1] = useState('');
  const [linkedItem1, setLinkedItem1] = useState('');  
  const [method2, setMethod2] = useState('');
  const [linkedItem2, setLinkedItem2] = useState('');
  const [method3, setMethod3] = useState('');
  const [linkedItem3, setLinkedItem3] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [passOneVisible, setPassOneVisible] = useState(false);
  const [passTwoVisible, setPassTwoVisible] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [isValidToSubmit, setIsValidToSubmit] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    username: false,
    userEmail: false,
    password: false,
    password_verify: false,
    role: false,
    relationship: false,
    motive: false,
    backstory: false,
    method1: false,
    linkedItem1: false,
    method2: false,
    linkedItem2: false,
    method3: false,
    linkedItem3: false,
  });

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

  const markFieldAsTouched = fieldName => {
    setTouchedFields(prevTouchedFields => ({
      ...prevTouchedFields,
      [fieldName]: true,
    }));
  };

  const markFieldAsUntouched = fieldName => {
    setTouchedFields(prevTouchedFields => ({
      ...prevTouchedFields,
      [fieldName]: false,
    }));
  };

  function getRandomValueFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  function getRandomValueFromArrays(arr1, arr2) {
    const randomIndex1 = Math.floor(Math.random() * arr1.length);
    const randomIndex2 = Math.floor(Math.random() * arr2.length);
    return arr1[randomIndex1] + ' ' + arr2[randomIndex2];
  }

  const toggleVisiblePass = num => {
    num === 1
      ? setPassOneVisible(!passOneVisible)
      : setPassTwoVisible(!passTwoVisible);
  };

  const setRandomUsername = () => {
    setUsername(
      getRandomValueFromArrays(GenStrings.firstNames, GenStrings.surnames)
    );
  };

  const setRandomRole = () => {
    setRole(getRandomValueFromArray(GenStrings.occupations));
  };

  const setRandomRelationship = () => {
    setRelationship(getRandomValueFromArray(GenStrings.meetingPhrases));
    setTimeout(() => {
      adjustTextAreaRows();
    }, 100);
  };

  const setRandomMotive = () => {
    setMotive(getRandomValueFromArray(GenStrings.motives));
    setTimeout(() => {
      adjustTextAreaRows2();
    }, 100);
  };

  const adjustTextAreaRows = () => {
    const textarea = document.getElementById('relationship');
    textarea.style.height = 'auto';
    textarea.style.height = `${(textarea.scrollHeight)+5}px`;
  };

  const adjustTextAreaRows2 = () => {
    const textarea = document.getElementById('motive');
    textarea.style.height = 'auto';
    textarea.style.height = `${(textarea.scrollHeight)+5}px`;
  };

  const adjustTextAreaRows3 = () => {
    const textarea = document.getElementById('backstory');
    textarea.style.height = 'auto';
    textarea.style.height = `${(textarea.scrollHeight)+5}px`;
  };

  const nonInit = () => {
    setIsInit(false);
  };

  useEffect(() => {
    if (clicked && isInit) {
      nonInit();
      setPriv('Standard');
    }
  }, [clicked]);

  useEffect(() => {
    if (priv !== '-- Select Privilege Level --') {
      nonInit();
    }
  }, [priv]);

  const checkValidation = () => {
    if(method2.length === 0){
      setLinkedItem2('');
      markFieldAsUntouched('linkedItem2')
    }
    if(method3.length === 0){
      setLinkedItem3('');
      markFieldAsUntouched('linkedItem3')
    }
    if (
      username.length < 1 ||
      username.length > 64 ||
      (userEmail.length > 0 && !isValidEmail) ||
      (userEmail.length < 5 && userEmail.length !== 0) ||
      role.length < 1 ||
      role.length > 256 ||
      relationship.length < 1 ||
      relationship.length > 1000 ||
      motive.length < 1 ||
      motive.length > 1000 ||
      backstory.length < 8 ||
      backstory.length > 2000 ||
      priv === '-- Select Privilege Level --' ||
      priv === '' ||
      priv === null ||
      priv === undefined ||
      method1.length < 1 ||
      method1.length > 256 ||
      method2.length > 256 ||
      method3.length > 256 ||
      password.length < 8 ||
      password.length > 64 ||
      linkedItem1.length < 2 ||
      linkedItem1.length > 32 ||
      (method2.length > 0 && linkedItem2.length < 2) ||
      (method2.length > 0 && linkedItem2.length > 32) ||
      (method3.length > 0 && linkedItem3.length < 2) ||
      (method3.length > 0 && linkedItem3.length > 32) ||
      password !== passwordVerify
    ) {
      setIsValidToSubmit(false);
    } else {
      setIsValidToSubmit(true);
    }
  };

  useEffect(() => {
    checkValidation();
  }, [
    username,
    userEmail,
    role,
    relationship,
    motive,
    passwordVerify,
    password,
    backstory,
    method1,
    method2,
    method3,
    linkedItem1,
    linkedItem2,
    linkedItem3,
  ]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isValidToSubmit) {
      return alert('Please review form fields and re-submit.');
    }

    // Create a character object from the state
    const characterData = {
      login_username: username,
      login_password: password,
      userEmail,
      role,
      relationship,
      potential_motive: motive,
      backstory,
      priv,
      alert_active: false,
      method_1: method1,
      method_2: method2,
      method_3: method3,
      linked_item_1: linkedItem1,
      linked_item_2: linkedItem2,
      linked_item_3: linkedItem3,
    };

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post(
        'http://my-api-url/api/characters',
        characterData
      );

      // Handle the response, you can redirect to another page or show a success message
      console.log(response.data); // Log the response for now
    } catch (error) {
      // Handle errors, you can show an error message
      console.error('Error creating character:', error);
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setIsValidEmail(emailRegex.test(userEmail));
  }, [userEmail]);

  useEffect(()=>{
    requestFullScreen();
  },[])

  return (
    <div className='create-character-container'>
      <div>
        <h1 className='header-text' style={{ marginBottom: '-10px' }}>Create Character:</h1>
      </div>
      <div className='create-character-form' onClick={() => exitFullScreen()}>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='create-edit-label' htmlFor='username'>Username</label>
            <div className='input-group'>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Enter Character Name...'
                className='form-input'
                value={username}
                style={
                  touchedFields.username &&
                  (username.length < 1 || username.length > 64)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setUsername(e.target.value);
                  markFieldAsTouched('username');
                }}
              />
              <button
                type='button'
                className='refresh-button'
                style={{
                  width: '38px',
                }}
                onClick={setRandomUsername}
              >
                <FiRefreshCw />
              </button>
              {touchedFields.username &&
              (username.length < 1 || username.length > 64) ? (
                <div>
                  <p className='form-error-message'>
                    {' '}
                    *Usernames must be 1-64 characters in length!
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='form-group'>
            <label className='text-secondary' htmlFor='userEmail'>
              User Email (optional)
            </label>
            <input
              type='text'
              className={`form-control custInput ${
                !isValidEmail && 'invalid-input'
              }`}
              id='userEmail'
              placeholder={`User email...`}
              value={userEmail}
              onChange={e => {
                setUserEmail(e.target.value);
                markFieldAsTouched('userEmail');
                if(userEmail.length === 0){
                  markFieldAsUntouched('userEmail');
                }
              }}
              style={
                !isValidEmail && userEmail.length>0
                  ? {
                      backgroundColor: 'rgb(253, 193, 193)',
                      borderRadius: '5px',
                      padding: '10px',
                    }
                  : { borderRadius: '5px', padding: '10px' }
              }
            />
            {((!isValidEmail && userEmail.length>0)) && (
              <div>
                <p className='form-error-message'>*Invalid email format</p>
              </div>
            )}
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='password'>Password</label>
            <div className='input-group'>
              <input
                type={passOneVisible ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='Enter password...'
                className={`form-input ${
                  !(
                    touchedFields.password &&
                    (password.length < 8 || password.length > 64)
                  )
                    ? 'password-input'
                    : 'password-input-error'
                }`}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  markFieldAsTouched('password');
                }}
                style={{
                  borderRadius: '5px 0px 0px 5px',
                  borderRight: 'none',
                  padding: '10px',
                }}
              />
              <button
                type='button'
                className='refresh-button'
                style={{
                  width: '38px',
                  height: '45px',
                  borderRadius: '0px 5px 5px 0px',
                }}
                onClick={e => toggleVisiblePass(1)}
              >
                {passOneVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
              {touchedFields.password &&
              (password.length < 8 || password.length > 64) ? (
                <div>
                  <p className='form-error-message'>
                    {' '}
                    *Passwords must be 8-64 characters in length!
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='password-verify'>Verify Password</label>
            <div className='input-group'>
              <input
                type={passTwoVisible ? 'text' : 'password'}
                id='password-verify'
                name='password-verify'
                placeholder='Verify password...'
                className={`form-input ${
                  !touchedFields.password_verify || password === passwordVerify
                    ? 'password-input'
                    : 'password-input-error'
                }`}
                value={passwordVerify}
                onChange={e => {
                  setPasswordVerify(e.target.value);
                  markFieldAsTouched('password_verify');
                }}
              />
              <button
                type='button'
                className='refresh-button'
                style={{
                  width: '38px',
                  height: '45px',
                  borderRadius: '0px 5px 5px 0px',
                }}
                onClick={e => toggleVisiblePass(2)}
              >
                {passTwoVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
              {touchedFields.password_verify && password !== passwordVerify && (
                <div>
                  <p className='form-error-message'>*Passwords do not match</p>
                </div>
              )}
            </div>
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='role'>Role</label>
            <div className='input-group'>
              <input
                type='text'
                id='role'
                name='role'
                placeholder='Enter Character Role...'
                className='form-input'
                value={role}
                style={
                  touchedFields.role && (role.length < 1 || role.length > 1000)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setRole(e.target.value);
                  markFieldAsTouched('role');
                }}
              />
              <button
                type='button'
                className='refresh-button'
                style={{
                  width: '38px',
                }}
                onClick={setRandomRole}
              >
                <FiRefreshCw />
              </button>
              {touchedFields.role && (role.length < 1 || role.length > 1000) ? (
                <div>
                  <p className='form-error-message'>
                    {' '}
                    *Role details must be included and be less than 256
                    characters in length!
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='relationship'>Relationship</label>
            <div className='input-group'>
              <textarea
                id='relationship'
                name='relationship'
                placeholder='Enter Character Relationship...'
                className='form-textarea my-custom-scroll-skinny'
                value={relationship}
                style={
                  touchedFields.relationship &&
                  (relationship.length < 1 || relationship.length > 1000)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setRelationship(e.target.value);
                  markFieldAsTouched('relationship');
                  adjustTextAreaRows();
                }}
              />
              <button
                type='button'
                className='refresh-button'
                style={{
                  width: '38px',
                }}
                onClick={setRandomRelationship}
              >
                <FiRefreshCw />
              </button>
              {touchedFields.relationship &&
              (relationship.length < 1 || relationship.length > 1000) ? (
                <div>
                  <p className='form-error-message'>
                    {' '}
                    *Relationship details must be included and be less than 1000
                    characters in length!
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='motive'>Motive</label>
            <div className='input-group'>
              <textarea
                id='motive'
                name='motive'
                placeholder='Enter potential Motive...'
                className='form-textarea my-custom-scroll-skinny'
                value={motive}
                style={
                  touchedFields.motive &&
                  (motive.length < 1 || motive.length > 1000)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setMotive(e.target.value);
                  markFieldAsTouched('motive');
                  adjustTextAreaRows2();
                }}
              />
              <button
                type='button'
                className='refresh-button'
                style={{
                  width: '38px',
                }}
                onClick={setRandomMotive}
              >
                <FiRefreshCw />
              </button>
              {touchedFields.motive &&
              (motive.length < 1 || motive.length > 1000) ? (
                <div>
                  <p className='form-error-message'>
                    {' '}
                    *Potential Motive details must be included and be less than
                    1000 characters in length!
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='backstory'>Backstory</label>
            <div className='input-group'>
              <textarea
                id='backstory'
                name='backstory'
                placeholder='Story to be shared...'
                className='form-control custom-textarea custInput my-custom-scroll-skinny'
                value={backstory}
                style={
                  touchedFields.backstory &&
                  (backstory.length < 8 || backstory.length > 2000)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setBackstory(e.target.value);
                  markFieldAsTouched('backstory');
                  adjustTextAreaRows3();
                }}
              />
              {touchedFields.backstory &&
              (backstory.length < 8 || backstory.length > 2000) ? (
                <div>
                  <p className='form-error-message'>
                    {' '}
                    *Backstory details must be 8-2000 characters in length!
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='priv'>Privilege Level:</label>
            <div className='input-group'>
              <select
                id='priv'
                name='priv'
                placeholder='Select Privilege Level...'
                className={`form-input-password ${
                  isInit ? 'fst-italic' : null
                }`}
                value={priv}
                style={{
                  backgroundColor: 'white',
                  color: `${isInit ? 'gray' : 'black'}`,
                }}
                onClick={() => (!clicked ? setClicked(true) : null)}
                onChange={e => setPriv(e.target.value)}
              >
                <option disabled>-- Select Privilege Level --</option>
                <option>Standard</option>
                <option>Authorized</option>
                <option>Admin</option>
              </select>
            </div>
            {(priv === '-- Select Privilege Level --' ||
              priv === '' ||
              priv === null ||
              priv === undefined) &&
            !isInit ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *You must Select this users Privilege Level!
                </p>
              </div>
            ) : null}
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='method1'>Murder Method 1</label>
            <div className='input-group'>
              <input
                type='text'
                id='method1'
                name='method1'
                placeholder='Enter Method 1 here...'
                className='form-input-password'
                value={method1}
                style={
                  touchedFields.method1 &&
                  (method1.length < 1 || method1.length > 256)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setMethod1(e.target.value);
                  markFieldAsTouched('method1');
                }}
              />
            </div>
            {touchedFields.method1 &&
            (method1.length < 1 || method1.length > 256) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Must include 1 potential murder method with less 256
                  characters!
                </p>
              </div>
            ) : null}
          </div>

          <div className='form-group'>
            <label className='create-edit-label' htmlFor='linkedItem1'>Method 1 Item</label>
            <div className='input-group'>
              <input
                type='text'
                id='linkedItem1'
                name='linkedItem1'
                placeholder='Enter item 1 here...'
                className='form-input-password'
                value={linkedItem1}
                style={
                  touchedFields.linkedItem1 &&
                  (linkedItem1.length < 2 || linkedItem1.length > 32)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setLinkedItem1(e.target.value);
                  markFieldAsTouched('linkedItem1');
                }}
              />
            </div>
            {touchedFields.linkedItem1 &&
            (linkedItem1.length < 2 || linkedItem1.length > 32) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Must include the linked item to the 1st murder method. It must contain 2-32
                  characters!
                </p>
              </div>
            ) : null}
          </div>

          <div className='form-group'>
            <label htmlFor='method2'>
              <span className='text-secondary'>
                {' '}
                Murder Method 2 (optional){' '}
              </span>
            </label>
            <div className='input-group'>
              <input
                type='text'
                id='method2'
                name='method2'
                placeholder='Enter Method 2 here...'
                className='form-input-password'
                value={method2}
                style={
                  touchedFields.method2 &&
                  (method2.length > 256)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setMethod2(e.target.value);
                  markFieldAsTouched('method2');
                }}
              />
            </div>
            {touchedFields.method2 && method2.length > 256 ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Optional methods must have less 256 characters!
                </p>
              </div>
            ) : null}
          </div>

          {method2.length > 0 ? (
            <div className='form-group'>
            <label className='text-secondary' htmlFor='linkedItem2'>Method 2 Item</label>
            <div className='input-group'>
              <input
                type='text'
                id='linkedItem2'
                name='linkedItem2'
                placeholder='Enter item 2 here...'
                className='form-input-password'
                value={linkedItem2}
                style={
                  touchedFields.linkedItem2 &&
                  (linkedItem2.length < 2 || linkedItem2.length > 32)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setLinkedItem2(e.target.value);
                  markFieldAsTouched('linkedItem2');
                }}
              />
            </div>
            {touchedFields.linkedItem2 &&
            (linkedItem2.length < 2 || linkedItem2.length > 32) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Must include the linked item if there's a 2nd murder method! It must contain 2-32
                  characters!
                </p>
              </div>
            ) : null}
          </div>
          ): null }

          <div className='form-group'>
            <label htmlFor='method3'>
              <span className='text-secondary'>
                {' '}
                Murder Method 3 (optional){' '}
              </span>
            </label>
            <div className='input-group'>
              <input
                type='text'
                id='method3'
                name='method3'
                placeholder='Enter Method 3 here...'
                className='form-input-password'
                value={method3}
                style={
                  touchedFields.method3 &&
                  (method3.length > 256)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setMethod3(e.target.value);
                  markFieldAsTouched('method3');
                }}
              />
            </div>
            {touchedFields.method3 && method3.length > 256 ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Optional methods must have less 256 characters!
                </p>
              </div>
            ) : null}
          </div>

          {method3.length > 0 ? (
            <div className='form-group'>
            <label className='text-secondary' htmlFor='linkedItem3'>Method 3 Item</label>
            <div className='input-group'>
              <input
                type='text'
                id='linkedItem3'
                name='linkedItem3'
                placeholder='Enter item 3 here...'
                className='form-input-password'
                value={linkedItem3}
                style={
                  touchedFields.linkedItem3 &&
                  (linkedItem3.length < 2 || linkedItem3.length > 32)
                    ? { backgroundColor: 'rgb(253, 193, 193)' }
                    : null
                }
                onChange={e => {
                  setLinkedItem3(e.target.value);
                  markFieldAsTouched('linkedItem3');
                }}
              />
            </div>
            {touchedFields.linkedItem3 &&
            (linkedItem3.length < 2 || linkedItem3.length > 32) ? (
              <div>
                <p className='form-error-message'>
                  {' '}
                  *Must include the linked item if there's a 3rd murder method! It must contain 2-32
                  characters!
                </p>
              </div>
            ) : null}
          </div>
          ): null }

        </form>
      </div>
      <div className='d-flex justify-content-around mt-2'>
        <Link to={''}>
          <button
            disabled={!isValidToSubmit}
            type='submit'
            id='create-submit'
            className='btn'
            style={{
              textDecoration: 'none',
              width: '30vw',
              maxWidth: '120px',
            }}
          >
            Submit
          </button>
        </Link>
        <Link to='/character-portal'>
          <button
            className='btn'
            id='create-cancel'
            style={{
              textDecoration: 'none',
              width: '30vw',
              maxWidth: '120px',
            }}
          >
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateCharacter;
