import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import { TiEdit } from "react-icons/ti";
import { AiOutlineDeleteColumn } from "react-icons/ai";
import SideBar from "./Sidebar";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../Redux/action/user";

const AllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, error, users } = useSelector(
    (state) => state.adminUserAction
  );

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      navigate("/admin/users");
      dispatch({ type: "clearMessage" });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 270,
      flex: 0.3,
      cellClassName: (params) => {
        const userRole = params.row.role;
        return userRole === "admin" ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const nameValue = params.row.id;
        return (
          <>
            <Link to={`/admin/user/${nameValue}`}>
              <TiEdit />
            </Link>
            <Button onClick={() => deleteUserHandler(nameValue)}>
              <AiOutlineDeleteColumn />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default AllUsers;
