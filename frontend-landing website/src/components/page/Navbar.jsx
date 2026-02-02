import "@/css/Navbar.css";
import React, { useState } from "react";
import { FaSearch, FaMicrophone, FaHeart, FaUserCircle } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";

const Navbartop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [userOpen, setUserOpen] = useState(false);
  const toggleUser = () => setUserOpen(!userOpen);

  const navigate = useNavigate();

  return (
    <div>
      <Navbar dark expand="md" className="nav-bar">
        <NavbarBrand href="/">
          <img id="nav-icon" src="/Images/Nabvar/jio-icon.png" />
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink to="/" className="nav-items active">
                Home
              </NavLink>
            </NavItem>
          </Nav>

          <Navbar className="nav-bar-left">
            <div className="searchbar">
              <FaSearch id="search-icon" />
              <input type="text" placeholder="Search" />
              <FaMicrophone />
            </div>

            <FaHeart className="outer-search-icon" />
            <MdShowChart className="outer-search-icon" />

            <Dropdown isOpen={userOpen} toggle={toggleUser}>
              <DropdownToggle tag="span" className="outer-search-icon">
                <FaUserCircle id="user-img" />
              </DropdownToggle>

              <DropdownMenu end>
                <DropdownItem
                  onClick={() => {
                    setUserOpen(false);
                    navigate("/bussiness/login/admin");
                  }}
                >
                  Admin Login
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    setUserOpen(false);
                    navigate("/bussiness/login");
                  }}
                >
                  User Login
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Navbar>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navbartop;
