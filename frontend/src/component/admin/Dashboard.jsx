import React,{ useEffect } from 'react'
import Sidebar from "./Sidebar"
import "./Dashboard.css"
// import { Link } from "react-router-dom";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
// import Loader from "../layout/Loader/Loader";
// import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <Sidebar/>
        <div className='dashboardContainer'>

        </div>
    </div>
  )
}

export default Dashboard