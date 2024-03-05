import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Donate from './pages/Donate';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Contact from './pages/Contact';
import CommunityEvents from './pages/CommunityEvents'
import { AuthProvider } from './utilities/AuthContext';
import GivingBack from './pages/GivingBack';
import NewAndUpdates from './pages/NewAndUpdates';
import BecomeAMember from './pages/BecomeAMember';

function App() {
  
  // Assuming this function checks if the user is logged in
  const isUserLoggedIn = () => {
    return localStorage.getItem("userId") !== null;
  };

  const ProtectedRoute = (props) => {
    return isUserLoggedIn() ? (
      <Route {...props} />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <ProtectedRoute exact path="/profile" element={<Profile />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/GivingBack" element={<GivingBack />} />
          <Route exact path="/Donate" element={<Donate />} />
          <Route exact path="/ContactUs" element={<Contact />} />
          <Route exact path="/CommunityEvents" element={<CommunityEvents />} />
          <Route exact path="/givingBack" element={<GivingBack />} />
          <Route exact path="/News" element={<NewAndUpdates />} />
          <Route exact path="/BecomeAMember" element={<BecomeAMember />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
