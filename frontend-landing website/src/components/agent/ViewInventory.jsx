import { useEffect, useState } from "react";
import axios from "axios";

const ViewInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/inventory/all")
      .then((res) => {
        setInventory(res.data);
      })
      .catch((err) => {
        console.error("Error fetching inventory", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return (
    <>
      <h1>Inventory Records</h1>

      <table>
        <thead>
          <tr>
            <th>ICCID</th>
            <th>Agent</th>
            <th>Status</th>
            <th>Make / Model</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td colSpan="5">No inventory found</td>
            </tr>
          ) : (
            inventory.map((item) => (
              <tr key={item.iccid}>
                <td>{item.iccid}</td>
                <td>{item.agent}</td>
                <td>{item.status}</td>
                <td>{item.makeModel}</td>
                <td>{item.dateOfEntry}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default ViewInventory;
