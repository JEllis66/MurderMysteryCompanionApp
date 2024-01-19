import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfirmation } from '../ConfirmationContext.js';
import '../CSS/Confirmation.css';

const ConfirmationNotification = ({ toggleNotification }) => {
  const [isValidResolution, setIsValidResolution] = useState(false);
  const [resolution, setResolution] = useState('');

  const {
    confirmationVisible,
    confirmationMessage,
    hideConfirmation,
    command,
  } = useConfirmation();

  navigate = useNavigate();

  const adjustTextAreaRows = () => {
    const textarea = document.getElementById('resolution');
    textarea.style.height = 'auto';
    textarea.style.height = `${(textarea.scrollHeight)+5}px`;
  };

  const handleConfirm = () => {
    const delStr = command.substring(0, 7);
    const delID = command.substring(7, command.length);

    console.log('Last Index Value: ', command.length - 1);
    console.log('delStr: ', delStr);
    console.log('delID: ', delID);

    if (command === 'clearNews') {
      console.log('Clearing News Table');
    } else if (delStr === 'delNews') {
      console.log('Deleting News Article ID: ', delID);
    } else if (delStr === 'offNews') {
      console.log('Hiding News Article ID: ', delID);
    } else if (delStr === 'trigNew') {
      toggleNotification('New Message!', 'all');
      console.log(`News article ID  #${delID} is now actively listed!`);
    } else if (command === 'clearItems') {
      console.log('Clearing Item Table');
    } else if (delStr === 'delItem') {
      console.log('Deleting Item ID: ', delID);
    } else if (command === 'clearCharacters') {
      console.log('Clearing Character Table');
    } else if (delStr === 'delChar') {
      console.log('Deleting Character ID: ', delID);
    } else if (delStr === 'charAct') {
      console.log('Character ID: ', delID, ' is now Active!');
    } else if (delStr === 'charDea') {
      console.log('Character ID: ', delID, ' is now Inactive!');
    } else if (command === 'clearRequests') {
      console.log('Clearing Request Table');
    } else if (delStr === 'delRequ') {
      console.log('Deleting Request ID: ', delID);
    } else if (command === 'clearSecret') {
      console.log('Clearing Secret Table');
    } else if (delStr === 'delSecr') {
      console.log('Deleting Secret ID: ', delID);
    } else if (delStr === 'secDeac') {
      console.log('Deactivating Secret ID: ', delID);
    } else if (delStr === 'secActi') {
      console.log('Activating Secret ID: ', delID);
    } else if (delStr === 'delMyIt') {
      console.log('Deleting My Item ID: ', delID);
      navigate('/my-items');
    } else if (delStr === 'delNote') {
      console.log('Deleting Journal Entry ID: ', delID);
    } else if (delStr === 'delFAQs') {
      console.log('Deleting FAQ ID: ', delID);
    } else if (command === 'clearFAQ') {
      console.log('Clearing FAQ Data Table');
    } else if (command === 'clearJournalNotes') {
      console.log('Clearing Journal Notes Data Table');
    } else if (delStr === 'resRequ') {
      console.log(` Request ID: ${delID} is now resolved!`);
      console.log('Solution: ',resolution); //POST resolution
      setResolution('')
    }

    hideConfirmation(); // Close the confirmation dialog
  };

  useEffect(() => {
    if (resolution.length >= 8) {
      setIsValidResolution(true);
    } else {
      setIsValidResolution(false);
    }
  }, [resolution]);

  return confirmationVisible ? (
    <div className='confirmation-overlay'>
      <div className='confirmation-box'>
        <div className='confirmation-message text-danger'>
          {confirmationMessage}
        </div>
        {confirmationMessage.substring(0, 12) === 'Mark Request' ? (
          <div className='d-flex-column text-center'>
            <form>
              <div className='form-group'>
                <label className='create-edit-label' htmlFor='resolution'>
                  Resolution
                </label>
                <div className='input-group'>
                  <textarea
                    id='resolution'
                    name='resolution'
                    placeholder='Enter resolution...'
                    className={`form-control custom-textarea custInput my-custom-scroll-skinny ${
                      (resolution.length < 8 && resolution.length > 0)
                        ? 'input-error'
                        : ''
                    }`}
                    value={resolution}
                    onChange={e => {
                      setResolution(e.target.value);
                      adjustTextAreaRows();
                    }}
                    style={{ maxHeight: '200px' }}
                  />
                </div>
                {(resolution.length < 8 && resolution.length > 0) && (
                    <div>
                      <p className='form-error-message'>
                        *Resolution must be 8-512 characters in length!
                      </p>
                    </div>
                  )}
              </div>
            </form>

            <div className='confirmation-buttons d-flex justify-content-around'>
              <div></div>
              <button
                disabled={!isValidResolution}
                id='create-submit'
                className='btn my-app-button px-3'
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                id='create-cancel'
                className='btn px-3'
                onClick={hideConfirmation}
              >
                Cancel
              </button>
              <div></div>
            </div>
          </div>
        ) : (
          <div className='confirmation-buttons d-flex justify-content-around'>
            <div></div>
            <button
              id='create-submit'
              className='btn my-app-button px-3'
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              id='create-cancel'
              className='btn px-3'
              onClick={hideConfirmation}
            >
              Cancel
            </button>
            <div></div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default ConfirmationNotification;
