import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'; // Import useState hook if not already imported
import Home from './pages/Home';
import Donate from './pages/Donate';
import Accordion from './pages/Accordion';
// import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Contact from './pages/Contact';
import CommunityEvents from './pages/CommunityEvents'
import { AuthProvider } from './utilities/AuthContext';
import GivingBack from './pages/GivingBack';
import NewAndUpdates from './pages/NewAndUpdates';
import GiveToIITRopar from './pages/GiveToIITRopar';
import PrivateRoute from './PrivateRoute';
import BecomeAMember from './pages/BecomeAMember';
import NewsAndUpdatesAdmin from './pages/NewsAndUpdatesAdmin';
import ProfMessageAdmin from './pages/ProfMessageAdmin';
import CommunityEventsAdmin from './pages/CommunityEventsAdmin';
import SmartID from './pages/SmartID';
import AlumniCard from './pages/AlumniCard';
import Events from './pages/Events';
import Fund from './pages/Fund';
import Jobs from './pages/Jobs';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/profile' element={<PrivateRoute/>}>
            <Route exact path='/profile' element={<Profile/>}/>
          </Route>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/fund" element={<Fund />} />
          <Route exact path="/GivingBack" element={<GivingBack />} />
          <Route exact path="/Donate" element={<Donate />} />
          <Route exact path="/ContactUs" element={<Contact />} />
          <Route exact path="/CommunityEvents" element={<CommunityEvents />} />
          <Route exact path="/givingBack" element={<GivingBack />} />
          <Route exact path="/News" element={<NewAndUpdates />} />
          <Route exact path="/givetoiitropar" element={<GiveToIITRopar />} />
          <Route exact path="/BecomeAMember" element={<BecomeAMember />} />
          <Route exact path="/newsadmin" element={<NewsAndUpdatesAdmin />} />
          <Route exact path="/ProfMessageAdmin" element={<ProfMessageAdmin />} />
          <Route exact path="/CommunityEventsAdmin" element={<CommunityEventsAdmin/>} />
          <Route exact path="/SmartID" element={<SmartID/>} />
          <Route exact path="/AlumniCard" element={<AlumniCard/>} />
          <Route exact path="/events" element={<Events/>} />
          <Route exact path="/Jobs" element={<Jobs/>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
