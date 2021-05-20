import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests } from '../store/reducers/requestReducer';
import '../styles/requests.css';
import Request from './Request';

const Requests = (props) => {
  const { requests, guid } = useSelector((state) => state.requestPage);
  const [showRequest, setShowRequest] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGuid = async () => {
      const result = await fetchRequests(guid);
      dispatch({ type: 'SET_REQUESTS', payload: result.data.value });

      const performers = await axios.get(
        `http://intravision-task.test01.intravision.ru/api/${guid}/Users`
      );
      dispatch({ type: 'SET_PERFORMERS', payload: performers.data });

      const statuses = await axios.get(
        `http://intravision-task.test01.intravision.ru/api/${guid}/Statuses`
      );
      dispatch({ type: 'SET_STATUSES', payload: statuses.data });
    };

    fetchGuid();
  }, []);

  return (
    <div className="request_wrapper">
      {showRequest && (
        <Request
          showRequest={showRequest}
          setShowRequest={setShowRequest}
          guid={guid}
        />
      )}
      <div className="request">
        <div className="request__new_req">
          <button onClick={() => setShowRequest('new')}>Создать заявку</button>
        </div>
        <div>
          <table className="table">
            <thead className="thead">
              <tr>
                <th className="table__req_color"></th>
                <th className="table__req_id">ID</th>
                <th className="table__req_name">Название</th>
                <th className="table__req_status">Статус</th>
                <th>Исполнитель</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => {
                console.log(req);
                return (
                  <tr onClick={() => setShowRequest(req.id)} key={req.id}>
                    <th className="table__req_color">
                      <span style={{ background: req.statusRgb }}></span>
                    </th>
                    <th className="table__req_id">
                      {req.id.toLocaleString('ru')}
                    </th>
                    <th className="table__req_name">
                      <p title={req.name}>{req.name}</p>
                    </th>
                    <th className="table__req_status">
                      <span style={{ background: req.statusRgb }}>
                        {req.statusName}
                      </span>
                    </th>
                    <th>{req.executorName}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Requests;
