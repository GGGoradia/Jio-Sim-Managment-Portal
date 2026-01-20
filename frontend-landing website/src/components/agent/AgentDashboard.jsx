import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AddInventoryModal from "./AddInventoryModal";
import EditInventory from "./EditInventory";
import "@/css/AgentDashboard.css";
import { useSelector } from "react-redux";
import { logOut } from "../features/auth/authSlice";
import { Link } from 'react-router-dom';

const AgentDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);

  const agentId = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/inventory/all");
      setInventory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const baseInventory = useMemo(() => {
    return editMode
      ? inventory.filter((i) => i.agent === agentId)
      : inventory;
  }, [inventory, editMode, agentId]);

  useEffect(() => {
    let data = [...baseInventory];

    if (activeFilter !== "ALL") {
      data = data.filter((i) => i.status === activeFilter);
    }

    if (search.trim()) {
      data = data.filter((i) =>
        String(i.iccid).toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredInventory(data);
  }, [search, activeFilter, baseInventory]);

  const stats = useMemo(() => {
    return {
      total: baseInventory.length,
      activated: baseInventory.filter((i) => i.status === "ACTIVATED").length,
      ready: baseInventory.filter((i) => i.status === "READY_TO_DISPATCH").length,
      deactivated: baseInventory.filter((i) => i.status === "DEACTIVATED").length,
    };
  }, [baseInventory]);

  if (loading) return <h3>Loading inventory...</h3>;

  return (
    <>
      <div className="top-header">
        <h2>Welcome Agent</h2>
        <div>
          <button class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill me-3" viewBox="0 0 16 16" >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
          </button>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item logout" to="/bussiness/login" onClick={() => { dispatch(logOut()) }}>Logout</Link></li>
          </ul>
        </div>
      </div>

      <div className="inventory-dashboard">

        {/* KPI CARDS */}
        <div className="stats-container">
          <div className="stat-card" onClick={() => setActiveFilter("ALL")}>
            <h3>Total SIMs</h3>
            <p>{stats.total}</p>
          </div>
          <div className="stat-card" onClick={() => setActiveFilter("ACTIVATED")}>
            <h3>Activated</h3>
            <p>{stats.activated}</p>
          </div>
          <div className="stat-card" onClick={() => setActiveFilter("READY_TO_DISPATCH")}>
            <h3>Ready to Dispatch</h3>
            <p>{stats.ready}</p>
          </div>
          <div className="stat-card" onClick={() => setActiveFilter("DEACTIVATED")}>
            <h3>Deactivated</h3>
            <p>{stats.deactivated}</p>
          </div>
        </div>

        {/* SEARCH + ACTIONS */}
        <div className="inventory-actions">
          <input
            type="text"
            placeholder="Search by ICCID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="action-buttons">
            <button onClick={() => setEditMode(!editMode)}>
              {editMode ? "Back" : "Edit Your Entries"}
            </button>

            <button onClick={() => setShowModal(true)}>+ Add Inventory</button>
          </div>
        </div>

        {/* TABLE */}
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ICCID</th>
              <th>Agent</th>
              <th>Status</th>
              <th>Make / Model</th>
              <th>Date</th>
              {editMode && <th>Edit</th>}
            </tr>
          </thead>

          <tbody>
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan={editMode ? 6 : 5}>No records found</td>
              </tr>
            ) : (
              filteredInventory.map((item) => (
                <tr key={item.iccid}>
                  <td>{item.iccid}</td>
                  <td>{item.agent}</td>
                  <td>{item.status}</td>
                  <td>{item.makeModel}</td>
                  <td>{item.dateOfEntry}</td>
                  {editMode && (
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => setSelectedItem(item)}
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* MODALS */}
        {showModal && (
          <AddInventoryModal close={() => setShowModal(false)} refresh={fetchInventory} />
        )}

        {selectedItem && (
          <EditInventory
            item={selectedItem}
            close={() => setSelectedItem(null)}
            refresh={fetchInventory}
          />
        )}
      </div>
    </>
  );
};

export default AgentDashboard;
