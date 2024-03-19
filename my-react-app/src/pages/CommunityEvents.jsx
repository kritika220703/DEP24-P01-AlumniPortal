import React, {useContext, useState, useEffect, useRef}  from 'react'
import Gallery from '../components/Gallery'
import './CommunityEvents.css' // Assuming you have a CSS file for this component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import {db} from "../firebase.js";
import { addDoc, collection, query, where, getDocs , getDoc, doc, updateDoc} from "firebase/firestore";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/mdc-light-deeppurple/theme.css';

const CommunityEvents = () => {
  const [plannedReunions, setPlannedReunions] = useState([]);
  const [pastReunions, setPastReunions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("userId") !== null;
  });
  const [title, settitle] = useState('');
  const toast = useRef(null);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchPlannedReunions = async () => {
      try {
        const plannedReunionData = [];
        const snapshot = await getDocs(collection(db, 'plannedReunions'));

        snapshot.forEach(doc => {
          const reunion = doc.data();
          plannedReunionData.push(reunion);
        });

        setPlannedReunions(plannedReunionData);
      } catch (error) {
        console.error('Error fetching planned reunion data: ', error);
      }
    };

    const fetchPastReunions = async () => {
      try {
        const pastReunionData = [];
        const snapshot = await getDocs(collection(db, 'pastReunions'));

        snapshot.forEach(doc => {
          const reunion = doc.data();
          pastReunionData.push(reunion);
        });

        setPastReunions(pastReunionData);
      } catch (error) {
        console.error('Error fetching past reunion data: ', error);
      }
    };

    fetchPlannedReunions();
    fetchPastReunions();
  }, []);

  const accept = async () => {
    try {
        // Get the userId from localStorage
        const userId = localStorage.getItem("userId");

        const colRef = collection(db, 'Users');
        const q = query(colRef, where('uid', '==', userId));
        const snapshot = await getDocs(q);

        if (snapshot.size > 0) {
            const { name, email, entryNo } = snapshot.docs[0].data();
            console.log(name, email, entryNo);

            const plannedReunionRef = collection(db, 'plannedReunions');
            const reunionQuery = query(plannedReunionRef, where('title', '==', 'Alumni Reunion 2026'));
            const reunionSnapshot = await getDocs(reunionQuery);

            if (reunionSnapshot.size > 0) {
                reunionSnapshot.forEach((reunionDoc) => {
                  const data = reunionDoc.data();
                    const isAlreadyRegistered = data.registeredCandidates?.some(candidate => candidate.email === email);

                    if (!isAlreadyRegistered) {
                        const updatedCandidates = [...(data.registeredCandidates || []), { name, email, entryNo }];
                        updateDoc(doc(db, 'plannedReunions', reunionDoc.id), { registeredCandidates: updatedCandidates }, { merge: true });
                        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: `You are Successfully Registered `, life: 3000 });
                    } else {
                        console.log('Already registered');
                        toast.current.show({ severity: 'error', summary: 'Error', detail: 'User Already Registered', life: 3000 });
                    }
                });
            } else {
                console.error('Planned reunion document not found');
            }

        } else {
            console.error('User document not found');
        }
    } catch (error) {
        console.error('Error fetching user data: ', error);
        // Show toast with error message
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch user data', life: 3000 });
    }
}



  const reject = () => {
      // toast.current.show({ severity: 'warn', summary: 'Rejected', life: 3000 });
  }

  const confirm1 = () => {
      console.log("clicked");
      confirmDialog({
          message: 'Are you sure you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept,
          reject
      });
  };

  const renderPlannedReunionRow = (batch, year, date, title) => (
    
    <tr key={batch}>
      <td>{batch}</td>
      <td>{date}</td>
      <td>{title}</td>
      <td>{isLoggedIn ? <Button className='reunion-button' onClick={confirm1} icon="pi pi-check" label="Register"></Button> : <span className='reunion-span'> Register</span>}</td>
    </tr>
  );

  const renderPastReunionCard = (image, title, date, description) => (
    <div className='card' key={title}>
      <img src={image} alt={title} />
      <div className='card-info'>
        <h2>{title}</h2>
        <p>{date}</p>
        <p>{description}</p>
      </div>
    </div>
  );

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className='community-events-heading'>
        <h1>  <FontAwesomeIcon icon={faHandshake } />  Community Events</h1>
      </div>
      <Gallery/>

      <div className='main-container'>
        <div className='container-1'>
          <img src="/images/car1.jpg" alt="Donate Image" />
          <div className='note'>
            <h1>CLASS REUNIONS 2023-24</h1>
            <p> The Office of Alumni Relations and Alumni Association at IIT Ropar have been organizing reunions for different batches over the years. The institute feels immense pride in welcoming back and hosting alumni again on the campus. Reunions for various batches have been planned in the year 2023-24 at IIT Ropar. We encourage alumni to attend these events and meet fellow batchmates.
                <br/>The Reunions are typically held in Ropar with an Institute Day at the IIT Ropar Campus. Batches plan the events over a 2-3 day period with fun engagement activities at Campus or Off-Site, plans are customized by each batch as per their preferences.
                <br/>Some batches who could not celebrate their designated reunions during Covid impacted year(s) are also planning to organize their reunions this year.
                <br/>Office Of Alumni Association, IIT Ropar
                <br/>Email : alumni@iitrpr.ac.in
            </p>
          </div>
        </div>
      </div>
      <div className='container-3'><h1>LIST OF REUNIONS PLANNED FOR FY 2024</h1></div>
      <div className='container-2'>
        <table>
          <thead>
            <tr>
              <th>Batch</th>
              <th>Date</th>
              <th>Title</th>
              <th>Register </th>
            </tr>
          </thead>
          <tbody>
            {plannedReunions.map(reunion => (
              renderPlannedReunionRow(reunion.batch, reunion.year, reunion.date, reunion.title)
            ))}
          </tbody>
        </table>
         </div>
      <div className='past-reunion-heading'> <h1 >Past Reunions</h1> </div>
      <div className='past-reunions'>
        {pastReunions.map(reunion => (
          renderPastReunionCard(reunion.imageUrl, reunion.title, reunion.date, reunion.description)
        ))}
        {/* {renderPastReunionCard("/reunion_images/image1.png", "Alumni Reunion 2023", "Date: 03/04/2023", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/reunion_images/image2.png", "Alumni Reunion 2024", "Date: 19/01/2024", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/reunion_images/image3.png", "Alumni Reunion 2016", "Date: 07/09/2016", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/reunion_images/image4.png", "Alumni Reunion 2023", "Date: 03/04/2023", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/images/iit_ropar_front.jpg", "Past Reunion 5", "Date", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/reunion_images/image5.png", "Past Reunion 6", "Date", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")} */}
      </div>
    </div>
  )
}

export default CommunityEvents