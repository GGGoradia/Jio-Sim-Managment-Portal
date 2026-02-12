import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "@/css/AdminDashboard.css";
import { FaAngleDown } from "react-icons/fa6";
import { json, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserList from './UserList';
import SimList from './SimList';
import OrderList from './OrderList';
import ProfileList from './ProfileList';
import AdminUserRegistration from './AdminUserRegistration';

const AdminDashboard = () => {

  const [activeMenu, setActiveMenu] = useState("ADD_USER");
  const [content, setContent] = useState(8);
  const [user, setUser] = useState({});

  const adminId = useSelector((state) => state.auth.user.username);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(adminId));
  }, [adminId]);

  return (
    <div className='admin-dashboard'>
      <div className="admin-nav-bar">
        <h2>Welcome {adminId}</h2>
        <div className="nav-item dropdown logdedin">
          <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill me-3" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            {user.fullName}
          </button>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/user/profile-info">My Profile</Link></li>
            <li><hr className="dropdown-divider m-0" /></li>
            <li><Link className="dropdown-item logout" to="/bussiness/login">Logout</Link></li>
          </ul>
        </div>
      </div>

      <div className="admin-dashboard-container">
        <div className="side-nav-panel">
          <ul className='side-nav-content'>

            <li className={`${activeMenu === "ADD_USER" ? 'backgd-color' : ''}`}>
              <span onClick={() => setActiveMenu(activeMenu === "ADD_USER" ? null : "ADD_USER")}>
                <FaAngleDown className={`${activeMenu === "ADD_USER" ? 'arrow-rotate' : 'noarrow-rotate'}`} /> Add User
              </span>

              <ul className={`side-nav-content-details ${activeMenu === "ADD_USER" ? '' : 'collappse'}`}>
                <li
                  className={`${content === 20 ? 'content-selected' : ''}`}
                  onClick={() => { setContent(20) }}
                >
                  User Registration
                </li>
              </ul>
            </li>

            <li className={`${activeMenu === "USERS" ? 'backgd-color' : ''}`}>
              <span onClick={() => setActiveMenu(activeMenu === "USERS" ? null : "USERS")}>
                <FaAngleDown className={`${activeMenu === "USERS" ? 'arrow-rotate' : 'noarrow-rotate'}`} /> Users
              </span>

              <ul className={`side-nav-content-details ${activeMenu === "USERS" ? '' : 'collappse'}`}>
                <li
                  className={`${content === 1 ? 'content-selected' : ''}`}
                  onClick={() => { setContent(1) }}
                >
                  Show All Users
                </li>
              </ul>
            </li>

            <li className={`${activeMenu === "SIMS" ? 'backgd-color' : ''}`} >
              <span onClick={() => setActiveMenu(activeMenu === "SIMS" ? null : "SIMS")}>
                <FaAngleDown className={`${activeMenu === "SIMS" ? 'arrow-rotate' : 'noarrow-rotate'}`} /> SIM's
              </span>
              <ul className={`side-nav-content-details ${activeMenu === "SIMS" ? '' : 'collappse'}`}>
                <li className={`${content === 2 ? 'content-selected' : ''}`} onClick={() => { setContent(2) }}>Avaliable SIM,s</li>
                <li className={`${content === 3 ? 'content-selected' : ''}`} onClick={() => { setContent(3) }}>Active SIM,s</li>
                <li className={`${content === 4 ? 'content-selected' : ''}`} onClick={() => { setContent(4) }}>Inactive SIM,s</li>
                <li className={`${content === 5 ? 'content-selected' : ''}`} onClick={() => { setContent(5) }}>All SIM,s</li>
              </ul>
            </li>

            <li className={`${activeMenu === "ORDERS" ? 'backgd-color' : ''}`} >
              <span onClick={() => setActiveMenu(activeMenu === "ORDERS" ? null : "ORDERS")}>
                <FaAngleDown className={`${activeMenu === "ORDERS" ? 'arrow-rotate' : 'noarrow-rotate'}`} /> Orders's
              </span>
              <ul className={`side-nav-content-details ${activeMenu === "ORDERS" ? '' : 'collappse'}`}>
                <li className={`${content === 6 ? 'content-selected' : ''}`} onClick={() => { setContent(6) }}>Aproval Pending</li>
                <li className={`${content === 7 ? 'content-selected' : ''}`} onClick={() => { setContent(7) }}>eKYC Pending</li>
                <li className={`${content === 8 ? 'content-selected' : ''}`} onClick={() => { setContent(8) }}>All orders</li>
                <li className={`${content === 9 ? 'content-selected' : ''}`} onClick={() => { setContent(9) }}>Delivered orders</li>
              </ul>
            </li>

            <li className={`${activeMenu === "PROFILES" ? 'backgd-color' : ''}`} >
              <span onClick={() => setActiveMenu(activeMenu === "PROFILES" ? null : "PROFILES")}>
                <FaAngleDown className={`${activeMenu === "PROFILES" ? 'arrow-rotate' : 'noarrow-rotate'}`} /> Profile's
                <ul className={`side-nav-content-details ${activeMenu === "PROFILES" ? '' : 'collappse'}`}>
                  <li className={`${content === 10 ? 'content-selected' : ''}`} onClick={() => { setContent(10) }}>All Profiles</li>
                </ul>
              </span>
            </li>

          </ul>
        </div>

        <div className='admin-content'>
          {content === 1 && <UserList />}
          {[2, 3, 4, 5].includes(content) && <SimList contentType={content} />}
          {[6, 7, 8, 9].includes(content) && <OrderList contentType={content} />}
          {content === 10 && <ProfileList contentType={content} />}
          {content === 20 && <AdminUserRegistration contentType={content} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
