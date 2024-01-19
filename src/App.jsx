import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AdminControls from './Views/AdminControlsPage.jsx';
import AdminDashboard from './Views/AdminDashboardPage.jsx';
import AlertNotification from './components/AlertNotification';
import CharacterEdit from './Views/CharacterEditPage.jsx';
import CharacterPortal from './Views/CharacterPortalPage.jsx';
import Classified from './Views/ClassifiedPage.jsx';
import ClassifiedDatabase from './Views/ClassifiedDatabasePage.jsx';
import ClassifiedView from './Views/TopSecretViewPage.jsx';
import CluesNewsPortal from './Views/CluesNewsPortalPage.jsx';
import ConfirmationNotification from './components/ConfirmationNotification';
import CreateApp from './Views/CreateAppPage.jsx';
import CreateCharacter from './Views/CreateCharacterPage.jsx';
import CreateStoryItem from './Views/CreateStoryItemPage.jsx';
import Dashboard from './Views/DashboardPage.jsx';
import Database from './Views/DatabasePage.jsx';
import EventPortal from './Views/EventPortalPage.jsx';
import FAQCreate from './Views/FAQCreatePage.jsx';
import FAQEdit from './Views/FAQEditPage.jsx';
import FAQList from './Views/FAQListPage.jsx';
import Forgot from './Views/ForgotPage.jsx';
import Help from './Views/HelpPage.jsx';
import HelpFAQs from './Views/HelpFAQsPage.jsx';
import HelpMyRequests from './Views/HelpMyRequestsPage.jsx';
import HelpRequest from './Views/HelpRequestPage.jsx';
import Home from './Views/HomePage.jsx';
import JournalLive from './Views/JournalLivePage.jsx';
import Login from './Views/LoginPage.jsx';
import MyItems from './Views/MyItemsPage.jsx';
import News from './Views/NewsPage.jsx';
import NewsCreate from './Views/NewsCreatePage.jsx';
import NewsEdit from './Views/NewsEditPage.jsx';
import NewsList from './Views/NewsListPage.jsx';
import Notification from './components/Notification.jsx';
import QRCodeGenerator from './Views/QRCodeGeneratorPage.jsx';
import QRCodeShare from './Views/QRCodeSharePage.jsx';
import RequestAdminView from './Views/RequestAdminViewPage.jsx';
import RequestEdit from './Views/RequestEditPage.jsx';
import RequestPortal from './Views/RequestPortalPage.jsx';
import SearchDB from './Views/SearchDBPage.jsx';
import Social from './Views/SocialPage.jsx';
import SocialMessages from './Views/SocialMessagesPage.jsx';
import SocialProfile from './Views/SocialProfilePage.jsx';
import StoryItem from './Views/StoryItemPage.jsx';
import StoryItemEdit from './Views/StoryItemEditPage.jsx';
import StoryItemJournalView from './Views/StoryItemJournalViewPage.jsx';
import StoryItemSearchView from './Views/StoryItemSearchViewPage.jsx';
import StoryItemView from './Views/StoryItemViewPage.jsx';
import TopSecretCreate from './Views/TopSecretCreatePage.jsx';
import TopSecretEdit from './Views/TopSecretEditPage.jsx';
import TopSecretList from './Views/TopSecretListPage.jsx';
import UserMessaging from './Views/UserMessagingPage.jsx';
import UserPortal from './Views/UserPortalPage.jsx';
import Vote from './Views/VotePage.jsx';

import { ActiveTabProvider } from './ActiveTabContext';
import { AdminMenuProvider } from './AdminMenuContext.js'; 
import { AlertProvider } from './AlertContext.js';
import { ConfirmationProvider } from './ConfirmationContext.js';
import { SideMenuProvider } from './SideMenuContext.js';
import { useUser } from './UserContext.js';

export function App() {

  const { user } = useUser();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const toggleNotification = (message, idnum) => {

    if (idnum === 'all'){
      setNotificationMessage("Breaking News!");
      setNotificationVisible(true); 
    
      setTimeout(() => {
        setNotificationVisible(false); 
      }, 10000);
    } else if (idnum === user.id) {
      setNotificationMessage(message);
      setNotificationVisible(true); 
    
      setTimeout(() => {
        setNotificationVisible(false); 
      }, 10000);
    }
  };

  return (
    
    <BrowserRouter >
        
        <ActiveTabProvider>
        <SideMenuProvider>
        <ConfirmationProvider>
        <AlertProvider>
        <AdminMenuProvider>
          <div className='App' id='appDiv'>
             {notificationVisible ? <Notification isVisible={notificationVisible} message={notificationMessage} />:null}
            <ConfirmationNotification toggleNotification={toggleNotification}/>
            <AlertNotification toggleNotification={toggleNotification}/>  
            <Routes>
              <Route element={<Home />} path='/' />
                <Route element={<CreateApp />} path='/create-app' />
                <Route element={<Login />} path='/login/:appId' />
                <Route element={<Forgot />} path='/forgot/:code' />
                //User Page Routes//
                  <Route element={<Dashboard />} path='/dashboard' />
                    <Route element={<JournalLive />} path='/journal-live/:linkPosition' />
                    <Route element={<Database />} path='/clues' />
                      <Route element={<SearchDB />} path='/search-clues' />
                      <Route element={<MyItems />} path='/my-clues' />
                        <Route element={<StoryItemView />} path='/story-item-view/:id' />
                        <Route element={<StoryItemJournalView />} path='/story-item-journal-view/:id' />
                        <Route element={<StoryItemSearchView />} path='/story-item-search-view/:id' />
                        <Route element={<QRCodeShare />} path='/story-item/share/:id' />
                      <Route element={<Classified />} path='/classified' />
                        <Route element={<ClassifiedDatabase />} path='/classified-database' />
                          <Route element={<ClassifiedView />} path='/classified-view/:id' />
                      <Route element={<Social />} path='/social' />
                        <Route element={<SocialProfile />} path='/my-profile' />
                        <Route element={<SocialMessages />} path='/my-messages' />
                        <Route element={<News />} path='/news' />
                      <Route element={<Help />} path='/help' />
                        <Route element={<HelpFAQs />} path='/help-faqs' />
                        <Route element={<HelpRequest />} path='/help-request' />
                          <Route element={<RequestEdit />} path='/request-edit/:id' />
                        <Route element={<HelpMyRequests />} path='/help-my-requests' />
                      <Route element={<Vote />} path='/vote' />
                  //Admin Page Routes//
                  <Route element={<AdminDashboard />} path='/admin-dashboard' />
                    <Route element={<UserPortal />} path='/user-help-portal' />
                      <Route element={<RequestPortal />} path='/request-portal' />
                        <Route element={<RequestAdminView />} path='/request-admin-view/:id' />
                      <Route element={<UserMessaging />} path='/user-messaging' />
                      <Route element={<FAQList />} path='/faq-list' />
                        <Route element={<FAQCreate />} path='/faq-create' />
                        <Route element={<FAQEdit />} path='/faq-edit/:id' />
                    <Route element={<EventPortal />} path='/event-portal' />
                      <Route element={<AdminControls />} path='/admin-controls' />
                    <Route element={<CluesNewsPortal />} path='/clues-news' />
                      <Route element={<StoryItem />} path='/story-item' />
                        <Route element={<CreateStoryItem />} path='/create-story-item' />
                        <Route element={<StoryItemEdit />} path='/story-item-edit/:id' />
                        <Route element={<QRCodeGenerator />} path='/story-item/qr/:id' />
                      <Route element={<TopSecretList />} path='/top-secret-list' />
                        <Route element={<TopSecretCreate />} path='/top-secret-create' />
                        <Route element={<TopSecretEdit />} path='/top-secret-edit/:id' />
                      <Route element={<NewsList />} path='/news-list' />
                        <Route element={<NewsCreate />} path='/news-create' />
                        <Route element={<NewsEdit />} path='/news-edit/:id' />
                      <Route element={<CharacterPortal />} path='/character-portal' />
                        <Route element={<CreateCharacter />} path='/create-character' />
                        <Route element={<CharacterEdit />} path='/character-edit/:char_id' />
            </Routes>
          </div>
        </AdminMenuProvider>
        </AlertProvider>
        </ConfirmationProvider>
        </SideMenuProvider>
        </ActiveTabProvider>
    </BrowserRouter>
  );
}