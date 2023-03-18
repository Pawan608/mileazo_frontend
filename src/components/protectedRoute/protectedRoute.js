import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const [cookies] = useCookies("user");
  const navigate = useNavigate();
  // console.log(cookies.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    if (cookies?.user?.copouncode == undefined) {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
