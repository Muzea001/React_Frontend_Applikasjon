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
    <div className="container">
  <div className="row">
    <div className="col-md-4">
      {/* Sidebar with links */}
      <ul className="list-group">
        <li className="list-group-item">
          <NavLink to="/Innlogging/MyProfile">Personalia</NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/Innlogging/myOrders">My Orders</NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/Innlogging/myHouses">My Houses</NavLink>
        </li>
      </ul>
    </div>
    <div className="col-md-8"></div>
    <div className="container">
      <section>
        <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Personalia</h1>
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
      </section>
    </div>
    </div>
    </div>
  );

        }
export default MyProfile;
