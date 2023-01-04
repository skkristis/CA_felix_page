import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../Button";

import logo from "../../images/logo.svg";
import "./index.css";

function Header({ updateAuthToken, authToken }) {
  const navigate = useNavigate();

  const onLogout = () => {
    updateAuthToken("");
    navigate("/");
  };

  return (
    <header className="Header">
      <div className="Header__container">
        <Link to="/">
          <img className="Header__logo" src={logo} alt="logo" />
        </Link>
        <Button
          to={authToken ? null : "/login"}
          onClick={authToken ? onLogout : null}
        >
          {authToken ? "Log out" : "Sign in"}
        </Button>
      </div>
    </header>
  );
}

function MapStateToProps(state) {
  return {
    authToken: state.content.authToken,
  };
}

function MapDispatchToProps(dispatch) {
  return {
    updateAuthToken: (token) => {
      dispatch({ type: "UPDATE_AUTHTOKEN", token });
    },
  };
}

export default connect(MapStateToProps, MapDispatchToProps)(Header);
