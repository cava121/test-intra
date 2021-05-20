import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import axios from 'axios';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests } from '../store/reducers/requestReducer';

const ChangeRequest = ({ guid, showRequest, setShowRequest }) => {
  const { requests, performers, statuses } = useSelector(
    (state) => state.requestPage
  );

  const dispatch = useDispatch();
  const updateStatus = useRef();
  const updatePerformer = useRef();
  const newComment = useRef();

  const saveDate = async () => {
    const newStatus = statuses.find(
      (status) => status.name === updateStatus.current.value
    );
    const newPerfomer = performers.find(
      (performer) => performer.name === updatePerformer.current.value
    );
    console.log(newComment.current.value);
    await axios.put(
      `http://intravision-task.test01.intravision.ru/api/${guid}/Tasks`,
      {
        ...currentRequest,
        comment: newComment.current.value,
        executorId: newPerfomer.id,
        statusId: newStatus.id,
        tags: [],
      }
    );

    setTimeout(() => {
      setShowRequest(false);
    }, 100);

    const res = await fetchRequests(guid);
    dispatch({ type: 'SET_REQUESTS', payload: res.data.value });
  };

  const currentRequest = Number.isInteger(showRequest)
    ? requests.find((req) => req.id === showRequest)
    : showRequest;

  console.log(currentRequest);

  let term = new Date(currentRequest.resolutionDatePlan)
    .toISOString()
    .slice(0, 10);

  return (
    <div className="modal__change_wrapper">
      <div className="modal__header">
        <div className="modal__header_data">
          <p>№{currentRequest.id.toLocaleString('ru')}</p>
          <p className="modal__header_name">{currentRequest.name}</p>
        </div>
        <CloseOutlined
          style={{ fontSize: '20px' }}
          onClick={() => setShowRequest(false)}
        />
      </div>
      <div className="modal__data">
        <div className="modal__change_form changeForm">
          <p className="changeForm__label">Описание</p>
          <p className="changeForm__description">
            {currentRequest.description}
          </p>
          <textarea
            ref={newComment}
            placeholder="Добавление коментариев"
            cols="70"
            rows="6"
          ></textarea>
          <div className="form__button">
            <button onClick={saveDate}>Сохранить</button>
          </div>
          {currentRequest.lifetimeItems &&
            currentRequest.lifetimeItems.length > 0 && (
              <div className="comments">
                {currentRequest.lifetimeItems.map((comment) => {
                  return (
                    <div className="comment">
                      <Avatar icon={<UserOutlined />} />
                      <div className="comment__data">
                        <div className="comment__user_name">
                          <p>{comment.userName}</p>
                        </div>
                        <div className="comment__data_send">
                          <small>{comment.createdAt}</small>
                          <small> прокомментировал</small>
                        </div>
                        <div className="comment__text">
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>
        <div className="modal__property property">
          <div className="property__status">
            <span style={{ background: currentRequest.statusRgb }}></span>
            <select defaultValue={currentRequest.statusName} ref={updateStatus}>
              {statuses.map((status) => {
                let selected = '';
                if (status.name === currentRequest.statusName) {
                  selected = 'selected';
                }
                return (
                  <option key={status.id} defaultValue={selected}>
                    {status.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="property__name_user">
            <small>Заявитель</small>
            <p>{currentRequest.initiatorName}</p>
          </div>
          <div className="property__create_user">
            <small>Создана</small>
            <p>{currentRequest.executorName}</p>
          </div>
          <div className="property__executor">
            <small>Исполнитель</small>
            <select
              defaultValue={currentRequest.executorName}
              ref={updatePerformer}
            >
              {performers.map((per) => {
                let selected = '';
                if (per.name === currentRequest.executorName) {
                  selected = 'selected';
                }
                return (
                  <option defaultValue={selected} key={per.id}>
                    {per.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="property__priority">
            <small>Приоритет</small>
            <p>{currentRequest.priorityName}</p>
          </div>
          <div className="property__term">
            <small>Срок</small>
            <div>
              <input defaultValue={term} type="date" />
            </div>
          </div>
          <div className="property__tags">
            <small>Теги</small>
            {currentRequest.tags.map((tag) => {
              return <span key={tag.id}>{tag.name}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeRequest;
