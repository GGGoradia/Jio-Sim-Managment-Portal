import { useEffect, useState } from "react";
import axios from "axios";
import AddInventoryModal from "./AddInventoryModal";
import "@/css/AgentDashboard.css";

const AgentDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/inventory/all");
      setInventory(res.data);
      setFilteredInventory(res.data);
    } catch (err) {
      console.error("Error fetching inventory", err);
    } finally {
      setLoading(false);
    }
  };

  const filterByStatus = (status) => {
    setActiveFilter(status);

    if (status === "ALL") {
      setFilteredInventory(inventory);
    } else {
      setFilteredInventory(
        inventory.filter((item) => item.status === status)
      );
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = inventory.filter((item) =>
      item.iccid.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredInventory(filtered);
  };

  const stats = {
    total: inventory.length,
    activated: inventory.filter(i => i.status === "ACTIVATED").length,
    ready: inventory.filter(i => i.status === "READY_TO_DISPATCH").length,
    deactivated: inventory.filter(i => i.status === "DEACTIVATED").length,
  };

  if (loading) {
    return (
      <>
        <div className="top-header">
          <h2>Welcome Agent</h2>
        </div>
        <div className="inventory-dashboard">
          <h3>Loading inventory...</h3>
        </div>
      </>
    );
  }

  return (
    <>
      {/* ================= TOP HEADER ================= */}
      <div className="top-header">
        <h2>Welcome Agent</h2>
      </div>

      {/* ================= MAIN DASHBOARD ================= */}
      <div className="inventory-dashboard">

        {/* KPI CARDS */}
        <div className="stats-container">
          <div className="stat-card" onClick={() => filterByStatus("ALL")}>
            <h3>Total SIMs</h3>
            <p>{stats.total}</p>
          </div>

          <div className="stat-card" onClick={() => filterByStatus("ACTIVATED")}>
            <h3>Activated</h3>
            <p>{stats.activated}</p>
          </div>

          <div
            className="stat-card"
            onClick={() => filterByStatus("READY_TO_DISPATCH")}
          >
            <h3>Ready to Dispatch</h3>
            <p>{stats.ready}</p>
          </div>

          <div
            className="stat-card"
            onClick={() => filterByStatus("DEACTIVATED")}
          >
            <h3>Deactivated</h3>
            <p>{stats.deactivated}</p>
          </div>
        </div>

        {/* SEARCH + ADD */}
        <div className="inventory-actions">
          <input
            type="text"
            placeholder="Search by ICCID..."
            value={search}
            onChange={handleSearch}
          />

          <button onClick={() => setShowModal(true)}>
            + Add Inventory
          </button>
        </div>

        {/* INVENTORY TABLE */}
        <table className="inventory-table">
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
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan="5">No records found</td>
              </tr>
            ) : (
              filteredInventory.map((item) => (
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

        {/* ADD INVENTORY MODAL */}
        {showModal && (
          <AddInventoryModal
            close={() => setShowModal(false)}
            refresh={fetchInventory}
          />
        )}
      </div>
    </>
  );
};

export default AgentDashboard;
