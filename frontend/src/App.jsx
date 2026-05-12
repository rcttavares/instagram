import { HashRouter } from 'react-router-dom';

import Header from './components/Header';
import Routes from './routes';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes />
    </HashRouter>
  );
}

export default App;
