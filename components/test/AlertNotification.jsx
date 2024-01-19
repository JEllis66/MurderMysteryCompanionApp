import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useAlert } from '../AlertContext.js';
import '../CSS/Confirmation.css';

const AlertNotification = ({ toggleNotification }) => {
  const { alertVisible, alertMessage, hideAlert, command } =
    useAlert();

  navigate = useNavigate();

  const handleConfirm = () => {
    const delStr = command.substring(0,7);
    const delID = command.substring(7,command.length);

    console.log("Last Index Value: ",(command.length-1));
    console.log("delStr: ",delStr);
    console.log("delID: ",delID);

    if (command === 'clearNews') {
      console.log("Clearing News Table");
    } else if (delStr === 'delNews') {
      console.log("Deleting News Article ID: ",delID)
    } else if (delStr === 'trigNew'){
      toggleNotification();
      console.log(`News article ID  #${delID} is now actively listed!`)
    } else if (command === 'clearItems'){
      console.log("Clearing Item Table");
    } else if (delStr === 'delItem'){
      console.log("Deleting Item ID: ",delID);
    } else if (command === 'clearCharacters'){
      console.log("Clearing Character Table");
    } else if (delStr === 'delChar'){
      console.log("Deleting Character ID: ",delID);
    } else if (command === 'clearRequests'){
      console.log("Clearing Request Table");
    } else if (delStr === 'delRequ'){
      console.log("Deleting Request ID: ",delID);
    } else if (command === 'clearSecret'){
      console.log("Clearing Secret Table");
    } else if (delStr === 'delSecr'){
      console.log("Deleting Secret ID: ",delID);
    } else if (delStr === 'secDeac'){
      console.log("Deactivating Secret ID: ",delID);
    } else if (delStr === 'secActi'){
      console.log("Activating Secret ID: ",delID);
    } else if (delStr === 'delMyIt'){
      console.log("Deleting My Item ID: ",delID);
      navigate('/my-items')
    } else if (delStr === 'delNote'){
      console.log("Deleting Journal Entry ID: ",delID);
    } else if (delStr === 'delFAQs'){
      console.log("Deleting FAQ ID: ",delID);
    } else if (command === 'clearFAQ'){
      console.log("Clearing FAQ Data Table");
    } else if (command === 'clearJournalNotes'){
      console.log("Clearing Journal Notes Data Table");
    } else if (delStr === 'resRequ'){
      console.log(` Request ID: ${delID} is now resolved!`);
    }
      
    hideAlert(); // Close the confirmation dialog
  };

  return alertVisible ?
     (
      <div className='confirmation-overlay'>
        <div className='confirmation-box'>
          <div className='confirmation-message text-danger'>
            {alertMessage}
          </div>
          <div className='confirmation-buttons d-flex justify-content-around'>
            <div></div>
            <button
              id='create-cancel'
              className='btn px-3'
              onClick={hideAlert}
            >
              Close
            </button>
            <div></div>
          </div>
        </div>
      </div>
    ) : null;
};

export default AlertNotification;
