import React from 'react';
import './GivingBack.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

const GivingBack = () => {
  return (
    <div>
      <div className='Giving-back-heading'>
        <h1> <FontAwesomeIcon icon={faHandHoldingUsd } /> Give Back In Kind</h1>
      </div>
      <div className='main-cont-1'>
        <div className='G_container-1'>
          <img src="/images/giveback.png" alt="Giving Back" />
          <div className='Text_box'>
            <h1>Give Back In Kind - Volunteering Form</h1>
            <p> Dear IIT Ropar Alumnus,
                <br/>Alumni have always been the intrinsic strength at IIT Ropar and a have played an active role in driving a number of high impact initiatives for the Institute. The institute recognizes and immensely values your passion and commitment towards the betterment of the Institute & Students.
                <br/>As a proud alumni, you can also make an immense contribution towards the future & vision of your alma mater by your Volunteering Efforts where you can support by means of your time, expertise, passion, valuable experience & by other means which are non-monetary.
                <br/>This form is designed to collect your interest to Volunteer for Give Back in Kind to IIT Ropar. Our team will share your interest and match it with the right opportunity for you to make an impact through your contributions, as they transpire.
            </p>
          </div>
        </div>
      </div>
      <div className='outer_form' >
        <div className='details_form'>
      <form>
              <label>
                Full Name:
                <br/>
                <input type="text" name="fullName" className='text_input'/>
              </label>
              <br />
              <label>
                Email ID:
                <br/>
                <input type="email" name="email" className='text_input' />
              </label>
              <br />
              <label>
                Entry Number :
                <br/>
                <input type="text" name="Entry_no" className='text_input'/>
              </label>
              <br />
              <label>
                Year of Passing:
                <br/>
                <input type="text" name="Year_of_passing" className='text_input'/>
              </label>
              <br />
              <label>
                Your Phone/WhatsApp Numbers:
                <br/>
                <input type="tel" name="phone" className='text_input'/>
              </label>
              <br />
              <label>
                Your Department at IIT Ropar:
                <br/>
                <select name="department" className='text_input'>
                <option value="">Choose</option>
                <option value="CSE">Computer Science</option>
                <option value="EE">Electrical</option>
                <option value="ME">Mechanical</option>
                <option value="MnC">Mathematics and Computing</option>
                <option value="CH">Chemical</option>
                <option value="Civil">Civil</option>
                <option value="EP">Engineering Physics</option>
                <option value="Ai">Artifical Intelligence</option>
                <option value="ME">Metalurgy Engineering</option>
                <option value="DS">Data Science</option>
                <option value="bio">Biomedical</option>
                <option value="Maths">Maths</option>
                <option value="Phy">Physics</option>
                <option value="chem">Chemistry</option>
                <option value="Humanities">Humanities</option>
              </select>
              </label>
              <br />
              <label>
                Your Hostel:
                <br/>
                <select name="hostel" className='text_input'>
                  <option value="">Choose</option>
                  <option value="chenab">Chenab</option>
                  <option value="ravi">Ravi</option>
                  <option value="satluj">Satluj</option>
                  <option value="bhramputra">Bhramputra</option>
                  <option value="beas">Beas</option>
                  {/* Add more options as needed */}
                </select>
              </label>
              <br />
              <label>
              Degree or Type of Program(s) Enrolled in at IIT Ropar:
              <br />
              <input type="checkbox" name="degree" value="undergraduate"/> Undergraduate (B.Tech/ B.E./B.Sc.)
              <br />
              <input type="checkbox" name="degree" value="masters" /> Masters (M.Tech/M.Sc.)
              <br />
              <input type="checkbox" name="degree" value="phd" /> Ph.D
              <br />
              <input type="checkbox" name="degree" value="dualDegree" /> Dual Degree (Integrated Program - Undergraduate + Masters)
              <br />
              <input type="text" name="others_degree" className='text_input' placeholder='Others' />
            </label>
              <br />
              <label>
                Current Country of Residence:
                <br/>
                <input type="text" name="country" className='text_input' />
              </label>
              <br />
              <label>
                Your Linkedin Profile URL:
                <br/>
                <input type="text" name="linkedin" className='text_input' />
              </label>
              <br />
              <label>
                Giving back to the Institute/ Staff Or Faculty in 'Kind' with Gifts & Grants:
                <br />
                <input type="text" name="Kind" className='text_input' />
              </label>
              <br />
              <label>
              If a suitable 'Giving Back in Kind' opportunity comes up, how much time would you need to donate?
              <br />
              <input type="checkbox" name="time" value="30-60 Days" /> 30-60 Days
              <br />
              <input type="checkbox" name="time" value="15-30 Days" /> 15-30 Days
              <br />
              <input type="checkbox" name="time" value="7-15 Days" /> 7-15 Days
              <br />
              <input type="checkbox" name="time" value="Within a Week" /> Within a Week
            </label>
              <br />
              {/* Add Captcha here */}
              <button type="submit" className='submit'>Submit</button>
            </form>
      </div>
      </div>
    </div>
  );
};

export default GivingBack;
