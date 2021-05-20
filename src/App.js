import './App.css';
import Content from './components/Content';
import Header from './components/Header';
import Menu from './components/Menu';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app__wrapper">
        <Menu />
        <div>
          <Header />
          <Content />
        </div>
      </div>
    </Router>
  );
}

export default App;
