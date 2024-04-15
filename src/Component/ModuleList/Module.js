import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Navbar from "../Nabar/Navbar";
import { Link, useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";

const Module = () => {
  const [moduleList, setModueleList] = useState([""]);
  const [spinner, setSpinner] = useState(false);

  // fetch sub module list
  const ModuleList = async () => {
    setSpinner(true);
    try {
      const response = await axios.get("http://localhost:5000/api/all-modules");
      setModueleList(response.data?.module_list);
      setSpinner(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call sub module list
  useEffect(() => {
    ModuleList();
  }, []);
  // fetch sub module list

  return (
    <div>
      <Navbar />
      <div className="p-2 lg:p-5 lg:px-48">
        <h1 className="shadow w-60 mx-auto p-3 font-bold rounded text-center">
          ALL MODULE LIST
        </h1>
        <div className="flex justify-center mb-2 ">
          <ThreeCircles
            height="60"
            width="60"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={spinner}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
        <div class="grid grid-cols-2 mt-5 lg:grid-cols-6 gap-2">
          {moduleList.map((mName, i) => (
            <Link
              key={i}
              to={`/permission=${mName?.module_id}=${mName?.module_name}`}
            >
              <div class=" shadow-md bordered text-white p-2 lg:p-4 rounded bordered  bg-[#0E9F6E] max-w-sm">
                <h5 className="font-normal mt-1">{mName?.module_name}</h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module;
