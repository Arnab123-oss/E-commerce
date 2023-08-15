import React from "react";
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Link to="/login" />;
            }

            if (isAuthenticated === true) {
                return <Link to="/account" />;
              }

            if (isAdmin === true && user.role !== "admin") {
              return <Link to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute
