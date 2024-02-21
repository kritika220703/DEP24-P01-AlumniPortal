import React from 'react'
import Gallery from '../components/Gallery'
import './CommunityEvents.css' // Assuming you have a CSS file for this component

const CommunityEvents = () => {
  const renderReunionRow = (batch, year, date, title) => (
    <tr key={batch}>
      <td>{batch}</td>
      <td>{year}</td>
      <td>{date}</td>
      <td>{title}</td>
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
        <h1>Community Events</h1>
      </div>
      <Gallery/>

      <div className='main-container'>
        <div className='container-1'>
          <img src="/images/car1.jpg" alt="Donate Image" />
          <div className='note'>
            <h1>CLASS REUNIONS 2023-24</h1>
            <p> The Office of Alumni Relations, Alumni Association and the Endowment Office at IIT Delhi have been organizing reunions for different batches over the years. The institute feels immense pride in welcoming back and hosting alumni again on the campus. Reunions for various batches have been planned in the year 2023-24 at IIT Delhi. We encourage alumni to attend these events and meet fellow batchmates.
                <br/>The Reunions are typically held at New Delhi with an Institute Day at the IIT Delhi Campus. Batches plan the events over a 2-3 day period with fun engagement activities at Campus or Off-Site, plans are customized by each batch as per their preferences.
                <br/>Some batches who could not celebrate their designated reunions during Covid impacted year(s) are also planning to organize their reunions this year. The batches are working on the programs and agenda and have also started taking registrations for attendees. We encourage Alumni from these batches, to contact their respective Point-of-Contacts (in case not already done) to attend and support these reunions.
                <br/>Office Of Alumni Relations, IIT Delhi
                <br/>Email : alumniaffairs@admin.iitd.ac.in
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
        {renderPastReunionCard("/images/download.jpg", "Past Reunion 1", "Date", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/images/download.jpg", "Past Reunion 2", "Date", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/images/download.jpg", "Past Reunion 3", "Date", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/images/download.jpg", "Past Reunion 4", "Date", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/images/download.jpg", "Past Reunion 5", "Date", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
        {renderPastReunionCard("/images/download.jpg", "Past Reunion 6", "Date", "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, perspiciatis perferendis quod rerum voluptatum officia, quos expedita in, inventore omnis veritatis hic? Necessitatibus harum quas eius esse, minus rerum aperiam laudantium repudiandae consectetur .")}
      </div>
    </div>
  )
}

export default CommunityEvents