
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'; 
import { AuthContext } from '../../../AuthContext';
import { NavLink } from 'react-router-dom';

const MyHouses = () => {

  const [houseInfo, sethouseInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext);


useEffect(() => {
  if (user && user.email) {
    axios.get(`http://localhost:11569/api/Hus/HentMine/${user.email}`)
.then((husResponse) => {
  console.log('API Response:', husResponse.data); 
  sethouseInfo(husResponse.data);
  setLoading(false);
})
.catch((error) => {
  console.error('Error fetching order information:', error);
  setLoading(false);
});
  }
}, [user, user?.email]);

return (
  <div className="container">
      <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">My Houses</h1>
      <section>
        
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
{loading ? (
<p>Loading...</p>
) : houseInfo && houseInfo.length > 0 ? (
<Table striped hover variant="dark">
  <thead>
    <tr>
      <th>House Id</th>
      <th>Description</th>
      <th>Address</th>
      <th>Price</th>
      <th>Room Count</th>
     
    </tr>
  </thead>
  <tbody>
    {houseInfo.map((house, index) => (
      <tr key={index}>
        <td>{house.husId}</td>
        <td>{house.beskrivelse}</td>
        <td>{house.addresse}</td>
        <td>{house.pris}</td>
        <td>{house.romAntall}</td>
        <td>
        {house.bildeListe && house.bildeListe.length > 0 && (
          <img
                                                        src={`http://localhost:11569${house.bildeListe[0].bilderUrl}`}
                                                        alt="House"
                                                        style={{ maxWidth: '80px', maxHeight: '80px' }}
                                                    />
                                                )}
                                                </td>
       
      </tr>
    ))}
  </tbody>
</Table>
) : (
<p>No Houses found.</p>
)}
</section>
</div>
);
};
export default MyHouses;