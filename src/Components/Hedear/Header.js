import React from "react";
import Logo from "../../imgs/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Header.css";
import { ContextConsumer } from "../../ContextApi/GlobalContext";
import { totalQuantity } from "../../ContextApi/AppReducer";
function Header() {
  const { user, basket } = ContextConsumer();
  const navigate = useNavigate();
  const handelsignout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <NavLink to="/">
            <img src={Logo} alt="header logo" />
          </NavLink>
        </div>

        <div className="header-desc">
          <div className="input-section">
            <input type="text" />
            <div>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
        <div className="links-section">
          <div className="header-links" onClick={handelsignout}>
            <NavLink to={!user && "/login"}>
              <p> Hello {user ? `${user.email}` : "Geust"}</p>
              <p> {user ? "Sign Out" : "Sign In"}</p>
            </NavLink>
          </div>
          <div className="header-links">
            <NavLink to="/orders">
              <p>Returns</p>
              <p>
                <span>&</span> Orders
              </p>
            </NavLink>
          </div>
          <div className="header-links">
            <p> Your</p>
            <p>Prime</p>
          </div>

          <div className="header-basket">
            <NavLink to="/cart">
              <i className="fa-solid fa-basket-shopping"></i>
              <span>{totalQuantity(basket)}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
