import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Donate from './pages/Donate';
import ContactUs from './pages/ContactUs';

function App() {
  // <NavbarComponent/>
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Donate" element={<Donate />} />
        <Route exact path="/ContactUs" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;
