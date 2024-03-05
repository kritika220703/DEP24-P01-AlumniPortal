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
  const [editedUser, setEditedUser] = useState({
      name: '',
      role: '',
      phone: '',
      contrycode: '',
      entryNo: '',
      country: '',
      hostel: '',
      degree: '',
      department: '',
      passingYear: '',
      joiningYear: '',
      work_exp: [{}], // Store work experience as an array
      higherEducation: [{}] // Store work experience as an array
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(1);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    setIsFormSubmitted(2);
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


  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedUser({
          ...editedUser,
          [name]: value,
      });
      console.log(editedUser)
  };

  const handleInputChangeWorkExp = (e, index) => {
      const { name, value } = e.target;
      const updatedWorkExp = [...editedUser.work_exp];
      updatedWorkExp[index] = { ...updatedWorkExp[index], [name]: value };
      setEditedUser({ ...editedUser, work_exp: updatedWorkExp });
  };

  const handleInputChangeHigherEdu = (e, index) => {
      const { name, value } = e.target;
      const updatedHigherEdu = [...editedUser.higherEducation];
      updatedHigherEdu[index] = { ...updatedHigherEdu[index], [name]: value };
      setEditedUser({ 
          ...editedUser, 
          higherEducation: updatedHigherEdu 
      });
      console.log(editedUser);
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
                {educationDetails.map((highEdu, index) => (
                  <div key={index} className='working-details-inside'>
                    <label>
                      Name Of Institute:
                      <br />
                      <input
                        type="text"
                        name="institute"
                        placeholder='Ex. IIM Ahemdabad'
                        value={highEdu.institute || ''}
                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
                      />
                    </label>
                    <br />
                    <label>
                     Degree:
                      <br />
                      <input
                        type="text"
                        name="degree"
                        placeholder='MBA'
                        value={highEdu.degree || ''}
                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
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
                        value={highEdu.department || ''}
                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
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
                        value={highEdu.startYear || ''}
                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
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
                        value={highEdu.endYear || ''}
                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
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
                    <input 
                      type="text" 
                      name="name" 
                      className='text_input-member' 
                      placeholder='Your Name'
                      value={editedUser.name}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Entry Number :
                    <br/>
                    <input 
                    type="text" 
                    className='text_input-member' 
                    name="entryNo"
                    placeholder="Entry Number"
                    value={editedUser.entryNo}
                    onChange={handleInputChange}
                    
                  />
                  </label>
                  <label>
                  Year of Joining:
                  <br/>
                  <input 
                    className='text_input-member'
                    type="year"
                    name="joiningYear"
                    value={editedUser.joiningYear}
                    onChange={handleInputChange}
                  />
                  </label>

                  <label>
                    Degree :
                    <br />
                    <select id='course-degree' 
                      name="degree"
                      value={editedUser.degree}
                      onChange={handleInputChange}
                      className='text_input-member'
                    >
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
                    <select name="hostel" className='text_input-member' value ={editedUser.hostel} onChange = {handleInputChange} >
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
                    <select name="role" 
                      className='text_input-member'
                      value ={editedUser.role} 
                      onChange = {handleInputChange}
                      >
                    <option value="">Choose</option>
                    <option value='alumni'>Alumni</option>
                    <option value='student'>Student</option>
                    <option value='staff'>Staff</option>
                    </select>
                  </label>
                
                  <label>
                    Your Phone/WhatsApp Numbers:
                    <br/>
                    <select id='country-code' name='countrycode' value={editedUser.contrycode} onChange={handleInputChange}>
                    <option value='+91'>+91</option>
                    <option value='+1'>+1</option>
                    </select>
                    <input type="tel" 
                    name="phone" 
                    className='text_input-member' 
                    placeholder='Phone Number'
                    value = {editedUser.contrycode}
                    onChange={handleInputChange}
                    />
                  </label>
                  
                  <label>
                    Year of Passing:
                    <br/>
                    <input type="text"
                    className='text_input-member' 
                    name="passingYear"
                    value={editedUser.passingYear}
                    onChange={handleInputChange}
                    />
                  </label>
                  
                  <label>
                    Your Department at IIT Ropar:
                    <br/>
                    <select name="department"
                    className='text_input-member'
                    value = {editedUser.department}
                    onChange={handleInputChange}
                    >
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
                    <input type="text" 
                    name="country" 
                    className='text_input-member' 
                    placeholder='Country' 
                    value={editedUser.country}
                    onChange={handleInputChange}
                    />
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
