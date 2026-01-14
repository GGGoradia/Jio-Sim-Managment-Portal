import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "@/css/AgentDashboard.css";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ViewInventory from "./ViewInventory.jsx"
import AddInventory from "./AddInventory.jsx"

const AgentDashboard = () => {
    const [inventoryCollapse,setInventoryCollapse] = useState(false);
    const [content,setContent] = useState(1);
      return (
        <div className="inventory-dashboard">

        <div className="inventory-nav-bar">
            <h2>Welcome Agent</h2>
        </div>

        <div className="inventory-dashboard-container">

            {/* Sidebar */}
            <div className="side-nav-panel">
            <ul className="side-nav-content">

                <li className={`${inventoryCollapse ? "" : "backgd-color"}`}>
                <span onClick={() => setInventoryCollapse(!inventoryCollapse)}>
                    <FaAngleDown className={inventoryCollapse ? "arrow-rotate" : "noarrow-rotate"} />
                    Inventory
                </span>

                <ul className={`side-nav-content-details ${inventoryCollapse ? "collappse" : ""}`}>
                    <li
                    className={content === 1 ? "content-selected" : ""}
                    onClick={() => setContent(1)}
                    >
                    View Records
                    </li>

                    <li
                    className={content === 2 ? "content-selected" : ""}
                    onClick={() => setContent(2)}
                    >
                    Add Inventory
                    </li>
                </ul>
                </li>

            </ul>
            </div>

            {/* Content */}
            <div className="inventory-content">
            {content === 1 && <ViewInventory />}
            {content === 2 && <AddInventory />}
            </div>

        </div>
        </div>
    );
};

export default AgentDashboard;
