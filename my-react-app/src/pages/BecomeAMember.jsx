import React, { useState } from 'react';
import { Checkmark } from 'react-checkmark'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCheckSquare  } from '@fortawesome/free-solid-svg-icons';
import './BecomeAMember.css'; // Assuming you have a CSS file for this component

const BecomeAMember = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(0);
  const [ischeckbox, setIsWorkingProfessional] = useState(0);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [educationDetails, setEducationDetails] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(1);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    setIsFormSubmitted(2);
  };

  const handleSubmit3 = (e) => {
    e.preventDefault();
    setIsFormSubmitted(3);
  };

  const handleworking = (e) => {
    setIsWorkingProfessional(1);
    if (!e.target.checked) {
      setIsWorkingProfessional(0);
    }
  };

  const handleeducation = (e) => {
    setIsWorkingProfessional(2);
    if (!e.target.checked) {
      setIsWorkingProfessional(0);
    }
  };

  const handleothers = (e) => {
    setIsWorkingProfessional(3);
    if (!e.target.checked) {
      setIsWorkingProfessional(0);
    }
  };

  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, {}]);
  };

  const addEducationDetail = () => {
    setEducationDetails([...educationDetails, {}]);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  return (
    <div>
      <div className='Become-Member-heading'>
        <h1> <FontAwesomeIcon icon={faUsers} /> Become A Member </h1>
      </div>
      <div className='member-info'>
        {isFormSubmitted === 1 ? (
          <div className='member-form-container2'>
            <h1> Let us know a bit more about you </h1>
            <p>Fields marked * are mandatory</p>
            <form>
              <div className='member-form-inside2'>
                <label>
                  What are you doing currently?
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    name="work"
                    value="working"
                    onChange={handleworking}
                  />{' '}
                  Working as a professional
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    name="time"
                    value="Education"
                    onChange={handleeducation}
                  />{' '}
                  Pursuing higher Studies
                  <br />
                  <br />
                  <input
                    type="checkbox"
                    name="time"
                    value="Others"
                    onChange={handleothers}
                  />{' '}
                  Others
                  <br />
                  <br />
                </label>
              </div>
            </form>
            {ischeckbox === 2 ? (
              <div className='working-details'>
                {educationDetails.map((edu, index) => (
                  <div key={index} className='working-details-inside'>
                    <label>
                      Name Of Institute:
                      <br />
                      <input
                        type="text"
                        name="Institute"
                        placeholder='Ex. IIM Ahemdabad'
                      />
                    </label>
                    <br />
                    <label>
                     Degree:
                      <br />
                      <input
                        type="text"
                        name="Degree"
                        placeholder='MBA'
                      />
                    </label>
                    <br />
                    <label>
                      Department
                      <br />
                      <input
                        type="text"
                        name="department"
                        placeholder='Marketing'
                      />
                    </label>
                    <br />
                    <label>
                      Start Year:
                      <br />
                      <input
                        type="text"
                        name="startYear"
                        placeholder='Year'
                      />
                    </label>
                    <br />
                    <label>
                      End Year:
                      <br />
                      <input
                        type="text"
                        name="endYear"
                        placeholder='Year'
                      />
                    </label>
                    <br />
                  </div>
                ))}
                <button onClick={addEducationDetail}  className='add-div-button' > Add Education Details</button>
              </div>
            ) : ischeckbox === 1 ? (
              <div className='working-details'>
                {workExperiences.map((exp, index) => (
                  <div key={index} className='working-details-inside'>
                    <label>
                      Work title:
                      <br />
                      <input
                        type="text"
                        name="workTitle"
                        placeholder='Ex. Software Engineer'
                      />
                    </label>
                    <br />
                    <label>
                      Company Name:
                      <br />
                      <input
                        type="text"
                        name="companyName"
                        placeholder='Ex. Google'
                      />
                    </label>
                    <br />
                    <label>
                      Work Industry:
                      <br />
                      <input
                        type="text"
                        name="workIndustry"
                        placeholder='Ex. E-commerce'
                      />
                    </label>
                    <br />
                    <label>
                      Start Year:
                      <br />
                      <input
                        type="text"
                        name="startYear"
                        placeholder='Year'
                      />
                    </label>
                    <br />
                    <label>
                      End Year:
                      <br />
                      <input
                        type="text"
                        name="endYear"
                        placeholder='Year'
                      />
                    </label>
                    <br />
                  </div>
                ))}
                <button onClick={addWorkExperience} className='add-div-button'> Add work Experience</button>
              </div>
            ) : ischeckbox === 3 ? (
              <div>
                <label>
                  Others
                  <br />
                  <input
                    type="text"
                    name="Others"
                  />
                </label>

              </div>
            ) : (
              <div></div>
            )}
            <br/>
            <br/>

          <form>
              <h2>Upload Profile Photo</h2>
              <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            </form>
            <br/>
            <div className='member-button'>
                <button type="submit" className='submit-member' onClick={handleSubmit2} >Next Step</button>
            </div>
          </div>
        ) : isFormSubmitted === 2 ? (
          <div className='member-form-container2'>
            <Checkmark />
          <div className='member-form-container3' > 
            <h1> Thank You Virat, for joining IIT Ropar Alumni Network </h1>
          </div>
          <div className='member-button'>
                <button type="submit" className='submit-member' >SignUp</button>
          </div>
        </div>
        ) : (
        <div className='member-form-container'>
          <h1> Add your role details in - Indian Institute of Technology Ropar </h1>
          <p>Fields marked * are mandatory</p>
        <form className='form1' onSubmit={handleSubmit}>
            <div className='member-form-inside '>
                <div className='member-column1'> 
                  <label>
                    Full Name:
                    <br/>
                    <input type="text" name="fullName" className='text_input-member' placeholder='Your Name'/>
                  </label>
                  <label>
                    Entry Number :
                    <br/>
                    <input type="text" name="Entry_no" className='text_input-member' placeholder='Entry No.'/>
                  </label>
                  <label>
                  Year of Joining:
                  <br/>
                  <input type="text" name="Year_of_passing" className='text_input-member' placeholder='Enter Year'/>
                  </label>

                  <label>
                    Degree :
                    <br />
                    <select id='course-degree' name='course-degree'>
                      <option value="">Choose</option>
                      <option value='undergraduate'>Undergraduate (B.Tech/B.E./B.Sc.)</option>
                      <option value='masters'>Masters (M.Tech/M.Sc.)</option>
                      <option value='phd'>Ph.D</option>
                      <option value='dual-degree'>Dual Degree</option>
                      <option value='others'>Others</option>
                    </select>
                  </label>
                  <label>
                    Your Hostel:
                    <br/>
                    <select name="hostel" className='text_input-member' >
                      <option value="">Choose</option>
                      <option value="chenab">Chenab</option>
                      <option value="ravi">Ravi</option>
                      <option value="satluj">Satluj</option>
                      <option value="bhramputra">Bhramputra</option>
                      <option value="beas">Beas</option>
                      {/* Add more options as needed */}
                    </select>
                  </label>

                </div>
                <div className='member-column2'>
                  <label>
                    Role:
                    <br/>
                    <select name="Role" className='text_input-member'>
                    <option value="">Choose</option>
                    <option value='alumni'>Alumni</option>
                    <option value='student'>Student</option>
                    <option value='staff'>Staff</option>
                    </select>
                  </label>
                
                  <label>
                    Your Phone/WhatsApp Numbers:
                    <br/>
                    <select id='country-code' name='country-code'>
                    <option value='+91'>+91</option>
                    <option value='+1'>+1</option>
                    </select>
                    <input type="tel" name="phone" className='text_input-member' placeholder='Phone Number'/>
                  </label>
                  
                  <label>
                    Year of Passing:
                    <br/>
                    <input type="text" name="Year_of_passing" className='text_input-member' placeholder='Enter Year'/>
                  </label>
                  
                  <label>
                    Your Department at IIT Ropar:
                    <br/>
                    <select name="department" className='text_input-member'>
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
                  <label>
                    Current Country of Residence:
                    <br/>
                    <input type="text" name="country" className='text_input-member' placeholder='Country'/>
                  </label>
                </div>
              </div>
              <br />
              <div className='member-button'>
                <button type="submit" className='submit-member' >Join The Network</button>
              </div>
            </form>
        </div>
        )}
      </div>
    </div>
  );
};

export default BecomeAMember;
