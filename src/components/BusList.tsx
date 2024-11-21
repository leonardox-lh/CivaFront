import React, { useState, useEffect } from 'react';
import { type BusesList } from '../models/Bus';
import { BusService } from '../services/BusService';
import "../assets/styles/BusListStyles.css";



export const BusList: React.FC = () => {

  const [buss, setData] = useState<BusesList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const busesPerPage = 5;

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.log("No hay token disponible");
      return;
    }
    
    const fetchBuses = async () => {
      setLoading(true);
      try {
        const data = await BusService({ pageParam: busesPerPage, page:page-1, token:token }); 
        console.log("Datos recibidos:", data);
        setData(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();

  }, [page, token]);


  const Logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const BusClick = (id: number) => {
    const bus = buss.find((bus) => bus.busId === id);
    if (bus) {
      alert(`Bus Details:\n
        Name: ${bus.name}\n
        Plate: ${bus.plate}\n
        Model: ${bus.brand}\n
        Available: ${bus.available ? "Yes" : "No"}`);
    }
  };

  if (loading) return <p>Loading buses...</p>;

  return (
    <div className="cont">
      <div className="header">
        <h1>Bus List</h1>
        <button className="button" onClick={Logout}>
          Logout
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Plate</th>
            <th>Date</th>
            <th>Model</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buss.map((bus) => (
            <tr key={bus.busId}>
              <td>{bus.busId}</td>
              <td>{bus.name}</td>
              <td>{bus.plate}</td>
              <td>{bus.dateTime}</td>
              <td>{bus.brand}</td>
              <td>{bus.available ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => BusClick(bus.busId)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))} 
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
