import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Light from 'components/headers/light';
import axios from 'axios';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  });

  const [formData, setFormData] = useState(userInfo);
  const [successMessage, setSuccessMessage] = useState(''); // State to store success message

  useEffect(() => {
    fetchAllUserInfo();
  }, []);

  useEffect(() => {
    setFormData(userInfo);  // Update formData when userInfo changes
  }, [userInfo]);

  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchAllUserInfo = async () => {
    try {
      const userId = user?.id;
      console.log("userId", userId);
      console.log("token", token);

      if (!token) {
        console.error('JWT token not found in local storage');
        return;
      }

      if (!userId) {
        console.error('User ID not found');
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/api/suppliers/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setUserInfo(data); // Update userInfo with the fetched data
        console.log(data);
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Get the token from localStorage
      if (!token) {
        console.error('JWT token not found in local storage');
        return;
      }
  
      // Send a PUT request to update user info
      const response = await axios.put(
        'http://127.0.0.1:8000/api/user/update', // Correct URL
        formData, // Pass the updated user info (name, email, phone, address, etc.) in the request body
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );
  
      if (response.status === 200) {
        console.log('User info updated successfully:', response.data);
        setSuccessMessage('User information updated successfully!'); // Set success message on success
      } else {
        console.error('Failed to update user info:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <>
      <Light />

      <div className="container-xl px-4 mt-4">
        <hr className="mt-0 mb-4" />

        <div className="row">
          <div className="col-xl-4">
            {/* Profile picture card */}
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Photo de profil</div>
              <div className="card-body text-center">
                <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="Profile" />
                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                <button className="btn btn-primary" type="button">
                  Télécharger une nouvelle image
                </button>
              </div>
            </div>
          </div>

          <div className="col-xl-8">
            {/* Account details card */}
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                {/* Success message */}
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
                <form>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="name">Nom Complete</label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Entrer votre Nom Complete"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="email">Adresse email</label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="Entere votre adresse email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="phone">Numéro de téléphone</label>
                      <input
                        className="form-control"
                        id="phone"
                        type="tel"
                        placeholder="Entere votre numéro de téléphone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="address">Adresse</label>
                      <input
                        className="form-control"
                        id="address"
                        type="text"
                        placeholder="Entere votre adresse"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <button className="btn btn-primary" type="button" onClick={handleSaveChanges}>
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
