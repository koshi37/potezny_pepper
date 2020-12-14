import logo from './logo.svg';

import './App.css';
import { BrowserRouter} from 'react-router-dom'

import MainPage from './MainPage';

function App() {
  
  return (
    <BrowserRouter>
      <MainPage/>
    </BrowserRouter>
  );
}

export default App;
