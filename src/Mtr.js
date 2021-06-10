import React, { useEffect, useState } from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import App from './App';
import Navbar from './components/Navbar.js';

function TrainArr (props) {
      return (
            <div className="py-3">
                  <div className="px-2 py-2 border border-white">
                        <div className="py-1 text-white"></div>
                        <div className="px-2 row">
                                    <span className="col-3 text-white">Destination </span>
                                    <span className="col-3 text-white">Platform </span>
                                    <span className="col-6 text-white">Time </span>
                        </div>
                        {(props.data.map((r) => 
                              <div className="px-2 row">
                                    <span className="col-3 text-success">{r.dest}</span>
                                    <span className="col-3 text-warning">{r.plat} </span>
                                    <span className="col-6 text-success">{r.ttnt} mins </span>
                              </div>
                        ))}
                  </div>
            </div>
      )
}

function Platform(props) {
      return (
            <div>
                  {(!!props.data.UP && props.data.UP.length) ? (
                        <TrainArr data={props.data.UP}/>
                  ) : (
                        <div className="text-danger pt-2 pb-3">
                              Train Service Not Avaliable (UP)
                        </div>
                  )}
                  {(!!props.data.DOWN && props.data.DOWN.length) ? (
                        <TrainArr data={props.data.DOWN}/>
                  ) : (
                        <div className="text-danger pt-2 pb-3">
                              Train Service Not Avaliable (DOWN)
                        </div>
                  )}
                  
            </div>
      )
}

function LoadingSpinner () {
      return (
            <div className="text-primary pt-2 pb-3">Loading ...</div>
      )
}

function ETA() {
      const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
      const [items, setItems] = useState([]);
      const [loading, setLoading] = useState(false);
      const [selectedOption, setSelectedOption] = useState({value: "HUH", label: "HUNG HOM"});
      const [line, setLine] = useState({line: "WRL", label: "West Rail Line"});
      const [type, setType] = useState('WRL');

      const options = [
            {value: "HUH", label: "HUNG HOM"},
            {value: "ETS", label: "East Tsim Sha Tsui"},
            {value: "AUS", label: "Austin"},
            {value: "NAC", label: "Nam Cheong"},
            {value: "MEF", label: "Mei Foo"},
            {value: "TWW", label: "Tsuen Wan West"},
            {value: "KSR", label: "Kam Sheung Road"},
            {value: "YUL", label: "Yuen Long"},
            {value: "LOP", label: "Long Ping"},
            {value: "TIS", label: "Tin Shui Wai"},
            {value: "SIH", label: "Siu Hong"},
            {value: "TUM", label: "Tuen Mun"}
      ];

      const TCL = [
            {value: "HOK", label: "Hong Kong"},
            {value: "KOW", label: "Kowloon"},
            {value: "OLY", label: "Olympic"},
            {value: "NAC", label: "Nam Cheong"},
            {value: "LAK", label: "Lai King"},
            {value: "TSY", label: "Tsing Yi"},
            {value: "SUN", label: "Sunny Bay"},
            {value: "TUC", label: "Tung Chung"}
      ];

      const AEL = [
            {value: "HOK", label: "Hong Kong"},
            {value: "KOW", label: "Kowloon"},
            {value: "TSY", label: "Tsing Yi"},
            {value: "AIR", label: "Airport"},
            {value: "AWE", label: "AsiaWorld Expo"},
      ];

      const TKL = [
            {value: "NOP", label: "North Point"},
            {value: "QUB", label: "Quarry Bay"},
            {value: "YAT", label: "Yau Tong"},
            {value: "TIK", label: "Tiu Keng Leng"},
            {value: "TKO", label: "Tseung Kwan O"},
            {value: "LHP", label: "LOHAS Park"},
            {value: "HAH", label: "Hang Hau"},
            {value: "POA", label: "Po Lam"}
      ];

      const lines = [
            {value: "WRL", label: "West Rail Line"},
      ]

      // {value: "AEL", label: "Airport Express"},
      // {value: "TCL", label: "Tung Chung Line"},
      // {value: "TKL", label: "Tseung Kwan O Line"}

      const handleChange = selectedOption => {
            setLoading(true);
            setSelectedOption(selectedOption);
            console.log(selectedOption.value)
      }

      const handleChange0 = line => {
            setLoading(true);
            setLine(line);
            console.log(line.value)
      }

      function fetchData() {
            fetch("https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=WRL&sta="+selectedOption.value)
                        .then(res => res.json())
                        .then((result) => {
                                    setIsLoaded(true);
                                    setItems(result.data[('WRL-'+selectedOption.value)]); 
                                    setLoading(false);
                                    console.log(111, result)
            })
      };

useEffect(() => {
            fetchData();
            let iid = window.setInterval(() => {
                  fetchData();
                  }, 10000);
            return () => {
                  window.clearInterval(iid);
            }
      }, [selectedOption.value, line.value]);
      
if (error) {
      return <div>Error: {error.message}</div>;
} else if (!isLoaded) {
      return <App/>;
} else {
      return (
            <React.Fragment>
                  <div className="bg-black">
                        <div className="container">
                              <div className="pt-4">
                                    <div>
                                          <nav className="px-0 navbar navbar-expand-lg navbar-dark">
                                                <a className="navbar-brand" href="https://eztranx.com/">
                                                      <h2>ezTranx</h2>
                                                </a>
                                                <ul className="navbar-nav">
                                                      <li className="nav-item active">
                                                            <a className="nav-link" href="https://eztranx.com/">Light Rail</a>
                                                      </li>
                                                </ul>
                                          </nav>
                                    </div>
                                    <h5 className="text-white pb-2 d-inline">West Rail Line ETA </h5>
                                    {/* <span className="text-white pb-2 d-inline"> by ezTranx </span> */}
                              </div>
                              <div className="pt-4 text-white pb-2">Refreshed at: {items.sys_time}</div>
                              
                              <div className="row">  
                                    <div className="col-6">
                                          <Select
                                                value={line}
                                                onChange={handleChange0}
                                                options={lines}
                                          />
                                    </div>
                                    <div className="col-6">
                                          <Select
                                                value={selectedOption}
                                                onChange={handleChange}
                                                options={options}
                                          />
                                    </div>
                              </div>
                              <hr className="bg-white"/>

                              {loading ? <LoadingSpinner/> : ""}
                              {(!!loading) ? "" : <Platform data={items}/> }  
                              

                              <div className="text-white pb-4 pt-2"><FontAwesomeIcon icon={faCopyright} /> 2021 Wright Chin All Rights Reserved</div>
                        </div>
                  </div>
            </React.Fragment>
            )
      }
}

export default ETA;
