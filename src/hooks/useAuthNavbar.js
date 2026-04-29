import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import { setUserInfo, logout } from "../features/auth/authSlice";
import { useUserDetailsQuery } from "../features/auth/authService";
import { useNotifier } from "./useNotifier";
import {
  selectIsAuthenticatedUser,
  selectIsUser,
  selectIsVendor,
  selectUser,
} from "../features/auth/authSelectors";
import { getToken } from "../utils/tokenStorage";

export const useAuthNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notificationMsg } = useNotifier();
  const token = getToken();
  const { data: userData } = useUserDetailsQuery(token ? token : skipToken);

  const userInfo = useSelector(selectUser);
  const isVendor = useSelector(selectIsVendor);
  const isUser = useSelector(selectIsUser);
  const isAuthenticated = useSelector(selectIsAuthenticatedUser);

  useEffect(() => {
    if (token) {
      dispatch(setUserInfo({ token, user: userData?.user }));
    }
  }, [userData]);

  const onLogoutClick = () => {
    dispatch(logout());
    notificationMsg("default", `${userInfo.username} Logged Out.`);
    navigate("/");
  };

  return { userInfo, isVendor, isUser, isAuthenticated, onLogoutClick };
};
