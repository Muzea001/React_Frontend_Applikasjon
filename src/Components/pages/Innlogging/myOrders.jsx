
  import React, { useState, useEffect, useContext } from 'react';
  import axios from 'axios';
  import Table from 'react-bootstrap/Table'; 
  import { AuthContext } from '../../../AuthContext';
  import { NavLink } from 'react-router-dom';
  
  const MyOrders = () => {
    const [orderInfo, setOrderInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [melding, setMelding]= useState("");
    const {user} = useContext(AuthContext);
  
  
  useEffect(() => {
    if (user && user.email) {
      axios.get(`http://localhost:11569/api/Ordre/HentMine/${user.email}`)
  .then((ordreResponse) => {
    console.log('API Response:', ordreResponse.data); 
    setOrderInfo(ordreResponse.data);
    setLoading(false);
  })
  .catch((error) => {
    console.error('Error fetching order information:', error);
    setMelding("You have no orders yet !")
    setLoading(false);
  });
    }
  }, [user, user?.email]);

  return (


    
    <div className="full-height-container bg-dark">
      <h1 className="text-center display-4 py-2 mb-4 bg-dark text-white">Mine Ordre</h1>
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
) : orderInfo && orderInfo.length > 0 ? (
  <Table striped hover variant="dark">
    <thead>
      <tr>
        <th>Order Id</th>
        <th>House Id</th>
        <th>Paid Through</th>
        <th>Start Date</th>
        <th>Full Price</th>
        <th>End Date</th>
        
      </tr>
    </thead>
    <tbody>
      {orderInfo.map((order, index) => (
        <tr key={index}>
          <td>{order.ordreId}</td>
          <td>{order.hus.husId}</td>
          <td>{order.betaltGjennom}</td>
          <td>{new Date(order.startDato).toLocaleDateString()}</td>
          <td>{new Date(order.sluttDato).toLocaleDateString()}</td>
          <td>{order.fullPris}</td>
          <td>{melding}</td>
          
        </tr>
      ))}
    </tbody>
  </Table>
) : (
  <p>No orders found.</p>
)}
</section>
</div>




  );
}



export default MyOrders;