/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from "react-router-dom";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from './Spinner'

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshtoken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const response = await api.post("/api/token/refresh/", {
        refresh: refreshtoken,
      });
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const refreshtoken = localStorage.getItem(REFRESH_TOKEN);
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (!accessToken) {
      setIsAuthorized(false);
      return;
    }

    const now = Date.now() / 1000;
    const decodedRefreshToken = jwtDecode(refreshtoken); //decode the token
    const refreshTokenExpiration = decodedRefreshToken.exp;

    const decodedAccessToken = jwtDecode(accessToken); //decode the token
    const accessTokenExpiration = decodedAccessToken.exp; // get the token expiration

    if (refreshTokenExpiration < now && accessTokenExpiration < 0) {
      setIsAuthorized(false);
      return;
    } else {
      await refreshToken();
      console.log("refresh token");
      setIsAuthorized(true);
      return;
    }
  };

  if (isAuthorized === null) {
    return <div className="spinner-container "><Spinner/></div>;
  }

  return isAuthorized ? children : <Navigate to="/login/" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
