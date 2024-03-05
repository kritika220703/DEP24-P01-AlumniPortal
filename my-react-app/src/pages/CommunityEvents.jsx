import React from 'react'
import Gallery from '../components/Gallery'
import './CommunityEvents.css' // Assuming you have a CSS file for this component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

const CommunityEvents = () => {
  const renderReunionRow = (batch, year, date, title) => (
    <tr key={batch}>
      <td>{batch}</td>
      <td>{year}</td>
      <td>{date}</td>
      <td>{title}</td>
      <td><button className='reunion-button'>Register</button></td>
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
              <th>Year</th>
              <th>Tentative Date & Period</th>
              <th>Title</th>
              <th>Register </th>
            </tr>
          </thead>
          <tbody>
            {renderReunionRow("Batch 1", "2024", "Tentative Date", "Title 1")}
            {renderReunionRow("Batch 2", "2024", "Tentative Date", "Title 2")}
            {renderReunionRow("Batch 3", "2024", "Tentative Date", "Title 3")}
            {/* Add more rows as needed */}
          </tbody>
        </table>
         </div>
      <div className='past-reunion-heading'> <h1 >Past Reunions</h1> </div>
      <div className='past-reunions'>
        {renderPastReunionCard("/reunion_images/image1.png", "Alumni Reunion 2023", "Date: 03/04/2023", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/reunion_images/image2.png", "Alumni Reunion 2024", "Date: 19/01/2024", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/reunion_images/image3.png", "Alumni Reunion 2016", "Date: 07/09/2016", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/reunion_images/image4.png", "Alumni Reunion 2023", "Date: 03/04/2023", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/images/iit_ropar_front.jpg", "Past Reunion 5", "Date", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/reunion_images/image5.png", "Past Reunion 6", "Date", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
      </div>
    </div>
  )
}

export default CommunityEvents