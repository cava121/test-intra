import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Input } from 'antd';
import '../styles/header.css';

const Header = (props) => {
  return (
    <header>
      <div className="header">
        <div className="header__blocks">
          <div className="header__search">
            <Input
              className="header__search_input"
              prefix={<SearchOutlined className="header__search_icon" />}
              placeholder="Введите Фамилию, Статус Приоритет, Тег и т д чтобы найти заявки"
              type="text"
            />
          </div>
          <div className="header__user">
            <span>Менеджер Сергей</span>
            <Avatar icon={<UserOutlined />} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
