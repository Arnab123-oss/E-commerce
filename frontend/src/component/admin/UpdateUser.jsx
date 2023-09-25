import React, { useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import { CiMail } from "react-icons/ci";
import { MdFace } from "react-icons/md";
import { MdOutlineVerifiedUser } from "react-icons/md";
import SideBar from "./Sidebar";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../../Redux/action/user";
import Loader from "../layout/Loader/Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { loading, message, error, user } = useSelector(
    (state) => state.adminUserAction
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user._id !== params.id) {
      dispatch(getUserDetails(params.id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      navigate("/admin/users");
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, navigate, params.id, user]);

  const updateUserHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(params.id, myForm));
  };

  return (
    <>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateUserHandler}
            >
              <h1>Update User</h1>

              <div>
                <MdFace />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <CiMail />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <MdOutlineVerifiedUser />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false || role === "" ? true : false}
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
