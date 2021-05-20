import { Route, Switch } from 'react-router';
import Requests from './Requests';

const Content = (props) => {
  return (
    <Switch>
      <Route exact path="/base_knowledge">
        <h1>База знаний</h1>
      </Route>
      <Route exact path="/request">
        <Requests />
      </Route>
      <Route exact path="/staff">
        <h1>Сотрудники</h1>
      </Route>
      <Route exact path="/clients">
        <h1>Клиенты</h1>
      </Route>
      <Route exact path="/actives">
        <h1>Активы</h1>
      </Route>
      <Route exact path="/settings">
        <h1>Настройки</h1>
      </Route>
    </Switch>
  );
};

export default Content;
