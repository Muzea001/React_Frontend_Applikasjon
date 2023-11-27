import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'; 
import { AuthContext } from '../../../AuthContext';
import MyOrders from './myOrders';
import { NavLink } from 'react-router-dom';

const MyProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    console.log('current user : ',user)
    if (user && user.email) {
      axios.get(`http://localhost:11569/api/Bruker/brukerInfo/${user.email}`)
        .then((response) => {
          setUserInfo(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user information:', error);
          setLoading(false);
        });
    }
  }, [user, user?.email]); 


  

  return (
    <div className="full-height-container bg-dark">
      <section>
        <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Personalia</h1>
        <div className="mb-4 p-3" style={{ backgroundColor: '#343a40', borderRadius: '0.25rem' }}> {/* Add styling to match the table */}
          <div className="d-flex justify-content-center">
            <NavLink to="/Innlogging/MyProfile" className="list-group-item list-group-item-action list-group-item-info">
              Personalia
            </NavLink>
            <NavLink to="/Innlogging/myOrders" className="list-group-item list-group-item-action list-group-item-info -gd 2">
              My Orders
            </NavLink>
            <NavLink to="/Innlogging/myHouses" className="list-group-item list-group-item-action list-group-item-info">
              My Houses
            </NavLink>
          </div>
        </div>
  
        <div className="container">
          {loading ? (
            <p>Loading...</p>
          ) : userInfo ? (
            <Table striped hover variant="dark">
              <tbody>
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>{userInfo.navn}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{userInfo.email}</td>
                </tr>
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>{userInfo.addresse}</td>
                </tr>
                <tr>
                  <td><strong>Phone Number:</strong></td>
                  <td>{userInfo.telefonNummer}</td>
                </tr>
                <tr>
                  <td><strong>Birth Date:</strong></td>
                  <td>{userInfo.fodselsdato}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p>User information not found.</p>
          )}
        </div>
      </section>
    </div>
  );
          }
export default MyProfile;
