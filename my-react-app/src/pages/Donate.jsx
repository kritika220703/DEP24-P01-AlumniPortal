import React from 'react';
import './DonationPage.css'; // Import the CSS file

const Donate = () => {
  return (
    <div className="donate-container">
      <div className="donate-content">
        <img src="/donate_img.jpg" alt="Donate Image" />
      </div>
      <div className='text-on-image'>
        <h3>GIVING BACK</h3>
        <p> "Giving back to continue to grow together and raise the tradition of excellence."</p>
        <button className='donate-button'>Donate</button>
      </div>
      <div className='container1'>
        <img src="/light.png" alt="Donate Image" /> 
        <div className='container2'>
          <div className='box'>
            <h4>WHY GIVE BACK ?</h4>
            <p>Your invaluable monetary support shall help IITR to build new infrastructure and undertake further developmental activities. It is of critical significance in helping IITR climb up the ladder of global excellence.
              The received funds shall be useful in various domains and will directly benefit and/or create opportunities for programmes like:
              Running scholarships and awards for needy and deserving students as well as award recognition for notable alumni to promote the culture of learning and excellence.
              To further strengthen world class research facilities and create an ideal environment for scientific innovation.
              To bridge the student - faculty ratio to facilitate interactive world-class learning.</p>
            </div>
      </div>
      </div>
      <div className='container3'>
        <div className='box'>
          <h3>BENEFITS</h3>
          <p>"All the donations made to IIT Roorkee are 100% deductible from total taxable income u/s 80G of the Income Tax Act 1961 and may be used to support a wide variety of schemes. The options to choose from include providing financial aid to needy students, encouraging academic and all-round excellence through various scholarships as well as funding technical team projects on campus and travel support. Other schemes include sponsoring fellowship to recognise research and outstanding contribution of faculty members. IITR also offers naming opportunities on making infrastructural donation. Moreover, the donation doesn't necessarily have to be as per one of the schemes, any small, general purpose donations are acceptable."</p>
          </div>
          <img src="/benifit.png" alt="Donate Image" />
      </div>
      <div className='container4'>
        <div className='box'>
          <p>Convenience of the donors is taken care of at each step, with multiple payment options including provision for online donations,demand drafts and feature of installments for donations above INR 10 Lacs. Status of the donation is informed to them regularly through a financial statement mailed each year with the details of opening amount, interest earned, expenditure, and balance amount of their donation. Institute also conveys the information of the list of beneficiaries through email to keep the donors updated.</p>
          <h4>To donate please visit <a href='#'>here</a></h4>
          </div>
      </div>
      <div className='query'>
        <h2>HAVE ANY QUERIES</h2>
        <p> <b>Please write to: </b> Prof. R.D. Garg, Dean of Resources & Alumni Affairs</p>
        <p>(Email: dora@iitr.ac.in, dora.office@iitr.ac.in)</p>
      </div>
    </div>
  );
}

export default Donate;
