import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/ContactUs" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;
