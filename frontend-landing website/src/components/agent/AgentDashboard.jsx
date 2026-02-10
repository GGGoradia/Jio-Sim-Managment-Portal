import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AddInventoryModal from "./AddInventoryModal";
import EditInventory from "./EditInventory";
import "@/css/AgentDashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const AgentDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);

  const username = useSelector((state) => state.auth.user.username);
  const dispatch = useDispatch();

  // ================== FETCH ==================
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.post(
        "http://10.145.52.5:5003/api/pkisim2.1/delivery/get", // this is not working due to unmatched backend response
        { 
          "username" : null//for now to show the page
        },
        {
          headers:{
            "Content-Type":"application/json"
          }
        }
      );
      setInventory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    // console.log("agentid:",username);
  };
  const baseInventory = useMemo(() => {
    return editMode
      ? inventory.filter((i) => i.agent === username)
      : inventory;
  }, [inventory, editMode, username]);

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

  // ================== KPI STATS (FIXED) ==================
  const stats = useMemo(() => {
    return {
      total: baseInventory.length,
      simordered: baseInventory.filter(
        (i) => i.status === "SIM_ORDERED"
      ).length,
      simreceived: baseInventory.filter(
        (i) => i.status === "SIM_RECEIVED"
      ).length,
      simverified: baseInventory.filter(
        (i) => i.status === "SIM_VERIFIED"
      ).length,
      ready: baseInventory.filter(
        (i) => i.status === "READY_TO_DISPATCH"
      ).length,
      simdelivered: baseInventory.filter(
        (i) => i.status === "DELIVERED"
      ).length,
      intransit: baseInventory.filter((i)=> i.status==="IN_TRANSIT").length,
      deactivated: baseInventory.filter(
        (i) => i.status === "DEACTIVATED"
      ).length,
    };
  }, [baseInventory]);

  if (loading) return <h3>Loading inventory...</h3>;

  return (
    <>
      {/* ================== HEADER ================== */}
      <div className="top-header">
        <h2>Welcome {username}</h2>
        <div>
          <button
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-person-fill me-3"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link
                className="dropdown-item logout"
                to="/bussiness/login"
                onClick={() => dispatch(logOut())}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ================== DASHBOARD ================== */}
      <div className="inventory-dashboard">

        {/* KPI CARDS */}
        <div className="stats-container">
          <div className="stat-card" onClick={() => setActiveFilter("ALL")}>
            <h3>Total SIMs</h3>
            <p>{stats.total}</p>
          </div>

          <div className="stat-card" onClick={() => setActiveFilter("SIM_ORDERED")}>
            <h3>Sims Ordered</h3>
            <p>{stats.simordered}</p>
          </div>

          <div className="stat-card" onClick={() => setActiveFilter("SIM_RECEIVED")}>
            <h3>Sims Received</h3>
            <p>{stats.simreceived}</p>
          </div>

          <div className="stat-card" onClick={() => setActiveFilter("SIM_VERIFIED")}>
            <h3>Sims Verified</h3>
            <p>{stats.simverified}</p>
          </div>

          <div className="stat-card" onClick={() => setActiveFilter("READY_TO_DISPATCH")}>
            <h3>Ready to Dispatch</h3>
            <p>{stats.ready}</p>
          </div>

          <div className="stat-card" onClick={() => setActiveFilter("IN_TRANSIT")}>
            <h3>Sims In Transit</h3>
            <p>{stats.intransit}</p>
          </div>

          <div className="stat-card" onClick={() => setActiveFilter("DELIVERED")}>
            <h3>Sims Delivered</h3>
            <p>{stats.simdelivered}</p>
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
              <th>Comments</th>
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
                  <td>{item.status.replaceAll("_", " ")}</td>
                  <td>{item.makeModel}</td>
                  <td>{item.dateOfEntry}</td>
                  <td>{item.comments}</td>
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
          <AddInventoryModal
            close={() => setShowModal(false)}
            refresh={fetchInventory}
          />
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
