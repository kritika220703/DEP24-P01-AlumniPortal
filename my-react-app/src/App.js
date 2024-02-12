// import logo from './logo.svg';
// import './App.css';
import react from 'react'
import { BrowserRouter , Routes } from 'react-router-dom';
import  Nav  from "./components/Nav";
import  Footer  from './components/Footer';
import Gallery from './components/Gallery';
function App() {
  // <NavbarComponent/>
  return (
    <BrowserRouter>
    
    <Nav/>
    <Gallery/>
    <div className="bg-[#1e2ad71e] w-full h-scree" >
      
    </div>
   <Footer/>
    </BrowserRouter>
  );
}

export default App;
