import React,{ useEffect } from 'react'
import  "./Sidebar.css"
import logo from "../../images/logo.png"
import { Link } from "react-router-dom";
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {MdExpandMore} from "react-icons/md";
import {MdPostAdd} from "react-icons/md";
import {BiAddToQueue} from "react-icons/bi";
import {MdImportExport} from "react-icons/md";
import {MdOutlineListAlt} from "react-icons/md";
import {MdOutlineDashboardCustomize} from "react-icons/md";
import {FaPeoplePulling} from "react-icons/fa6";
import {MdOutlineRateReview} from "react-icons/md";

const Sidebar = () => {
    return (
        <div className="sidebar">
          <Link to="/">
            <img src={logo} alt="Ecommerce" />
          </Link>
          <Link to="/admin/dashboard">
            <p>
              <MdOutlineDashboardCustomize /> Dashboard
            </p>
          </Link>
          <Link>
            <TreeView
              defaultCollapseIcon={<MdExpandMore />}
              defaultExpandIcon={<MdImportExport />}
            >
              <TreeItem nodeId="1" label="Products">
                <Link to="/admin/products">
                  <TreeItem nodeId="2" label="All" icon={<MdPostAdd />} />
                </Link>
    
                <Link to="/admin/product/new">
                  <TreeItem nodeId="3" label="Create" icon={<BiAddToQueue />} />
                </Link>
              </TreeItem>
            </TreeView>
          </Link>
          <Link to="/admin/orders">
            <p>
              <MdOutlineListAlt />
              Orders
            </p>
          </Link>
          <Link to="/admin/users">
            <p>
              <FaPeoplePulling /> Users
            </p>
          </Link>
          <Link to="/admin/reviews">
            <p>
              <MdOutlineRateReview />
              Reviews
            </p>
          </Link>
        </div>
      );
}

export default Sidebar