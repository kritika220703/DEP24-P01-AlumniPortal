import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Donate from './pages/Donate';

function App() {
  // <NavbarComponent/>
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Donate" element={<Donate />} />
      </Routes>
    </div>
  );
}

export default App;
