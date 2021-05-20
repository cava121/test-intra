import {
  BookOutlined,
  CheckOutlined,
  SettingOutlined,
  TabletOutlined,
  TeamOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../styles/menu.css';

const Menu = (props) => {
  return (
    <div className="menu ">
      <div className="menu__logo">
        <CheckOutlined />
      </div>
      <div className="menu__items">
        <div className="menu__item">
          <Link to="/base_knowledge">
            <BookOutlined />
            <p>База знаний</p>
          </Link>
        </div>
        <div className="menu__item">
          <Link to="/request">
            <TabletOutlined />
            <p>Заявки</p>
          </Link>
        </div>
        <div className="menu__item">
          <Link to="/staff">
            <TeamOutlined />
            <p>Сотрудники</p>
          </Link>
        </div>
        <div className="menu__item">
          <Link to="/clients">
            <BookOutlined />
            <p>Клиенты</p>
          </Link>
        </div>
        <div className="menu__item">
          <Link to="/actives">
            <TransactionOutlined />
            <p>Активы</p>
          </Link>
        </div>
        <div className="menu__item">
          <Link to="/settings">
            <SettingOutlined />
            <p>Настройки</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
