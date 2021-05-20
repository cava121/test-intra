import { CloseOutlined } from '@ant-design/icons';
import ChangeRequest from './ChangeRequest';
import axios from 'axios';
import { useRef } from 'react';
import '../styles/request.css';
import { fetchRequests } from '../store/reducers/requestReducer';

const NewRequest = ({ guid, showRequest, setShowRequest }) => {
  const newNameRequest = useRef('');
  const newDescriptionReques = useRef('');

  const createRequest = async () => {
    const response = await axios.post(
      `http://intravision-task.test01.intravision.ru/api/${guid}/Tasks`,
      {
        name: newNameRequest.current.value,
        description: newDescriptionReques.current.value,
      }
    );
    newNameRequest.current.value = '';
    newDescriptionReques.current.value = '';
    const idNewRequest = response.data;
    const newRequest = await axios.get(
      `http://intravision-task.test01.intravision.ru/api/${guid}/Tasks/${idNewRequest}`
    );
    setShowRequest(newRequest.data);
  };
  return (
    <div
      className={showRequest ? 'modal active' : 'active'}
      onClick={() => setShowRequest(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={showRequest ? 'modal__content active' : 'modal__content'}
      >
        {showRequest === 'new' ? (
          <>
            <div className="modal__header">
              <p>Новая заявка</p>
              <CloseOutlined
                style={{ fontSize: '20px' }}
                onClick={() => setShowRequest(false)}
              />
            </div>
            <div className="modal__form form">
              <div>
                <label htmlFor="name">Название</label>
                <textarea
                  ref={newNameRequest}
                  id="name"
                  cols="60"
                  rows="5"
                ></textarea>
              </div>
              <div>
                <label htmlFor="description">Описание</label>
                <textarea
                  ref={newDescriptionReques}
                  id="description"
                  cols="60"
                  rows="8"
                ></textarea>
              </div>
              <div className="form__button">
                <button onClick={createRequest}>Сохранить</button>
              </div>
            </div>
          </>
        ) : (
          <ChangeRequest
            guid={guid}
            showRequest={showRequest}
            setShowRequest={setShowRequest}
          />
        )}
      </div>
    </div>
  );
};

export default NewRequest;
