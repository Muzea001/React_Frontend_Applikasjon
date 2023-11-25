
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'; // Make sure to import Table from react-bootstrap
import { AuthContext } from '../AuthContext';

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
  <section>
<h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">My Houses</h1>
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
);
};
export default MyHouses;