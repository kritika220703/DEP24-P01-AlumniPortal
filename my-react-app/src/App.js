import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Donate from './pages/Donate';
// import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Contact from './pages/Contact';
import CommunityEvents from './pages/CommunityEvents'
import SignUpPage from './pages/SignUpPage';

import { AuthProvider } from './utilities/AuthContext';
import GivingBack from './pages/GivingBack';

function App() {
  // <NavbarComponent/>
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<SignUpPage />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/GivingBack" element={<GivingBack />} />
          <Route exact path="/Donate" element={<Donate />} />
          <Route exact path="/ContactUs" element={<Contact />} />
          <Route exact path="/CommunityEvents" element={<CommunityEvents />} />
          <Route exact path="/givingBack" element={<GivingBack />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
