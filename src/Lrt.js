import React, { useEffect, useState } from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import App from './App';
import Navbar from './components/Navbar.js';

function RouteDetails (props) {
      return (
            <div>
                  {props.routes.map((r) => 
                        <div className="px-2 row">
                              <span className="col-2 text-success">{r.route_no} </span>
                              <span className="col-3 text-warning">{r.time_en} </span>
                              <span className="col-7 text-success">{r.dest_en} </span>
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

function Platform (props) {
      if (!props.platforms) {
            return (
                  <div className="text-danger pt-2 pb-3">
                       Train Service Not Avaliable
                  </div>
      )}
      const platformInfo = props.platforms.map((p) => 
      <div className="py-3">
            <div className="px-2 py-2 border border-white">
                  <div className="py-1 text-white">Platform: {p.platform_id}</div>
                  <div className="px-2 row">
                              <span className="col-2 text-white">Route </span>
                              <span className="col-3 text-white">Time </span>
                              <span className="col-7 text-white">Destination </span>
                  </div>

                  {(p.end_service_status === 1) &&(
                        <div className="px-2 row">
                              <span className="col-2 text-warning"> --- </span>
                              <span className="col-3 text-warning"> --- </span>
                              <span className="col-7 text-warning"> --- </span>
                        </div>
                  )}
                  
                  {(!p.end_service_status) &&(
                        <RouteDetails routes={p.route_list}/>
                  )}

            </div>
      </div>
      );
      
      return(
            <div>
                  {platformInfo}
            </div>
      )
}

function ETA() {
      const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
      const [items, setItems] = useState([]);
      const [selectedOption, setSelectedOption] = useState({ value: '295', label: 'Tuen Mun'});
      const [stationId, setStationId] = useState('295');
      const [loading, setLoading] = useState(false);

      const handleChange = selectedOption => {
            setLoading(true);
            setSelectedOption(selectedOption);
            setStationId(selectedOption.value);
      }

      const options = [
            { value: '80', label: 'Affluence'},
            { value: '15', label: 'Butterfly'},
            { value: '490', label: 'Chestwood'},
            { value: '120', label: 'Ching Chung'},
            { value: '468', label: 'Chung Fu'},
            { value: '370', label: 'Chung Uk Tsue'},
            { value: '570', label: 'Fung Nin Road'},
            { value: '340', label: 'Fung Tei'},
            { value: '455', label: 'Ginza'},
            { value: '260', label: 'Goodview Garden'},
            { value: '425', label: 'Hang Mei Tsuen'},
            { value: '70', label: 'Ho Tin'},
            { value: '310', label: 'Hoh Fuk Tong'},
            { value: '580', label: 'Hong Lok Road'},
            { value: '380', label: 'Hung Shui Kiu'},
            { value: '110', label: 'Kei Lun'},
            { value: '60', label: 'Kin On'},
            { value: '130', label: 'Kin Sang'},
            { value: '350', label: 'Lam Tei'},
            { value: '150', label: 'Leung King'},
            { value: '20', label: 'Light Rail Depot'},
            { value: '448', label: 'Locwood'},
            { value: '30', label: 'Lung Mun'},
            { value: '10', label: 'Melody Garden'},
            { value: '200', label: 'Ming Kum'},
            { value: '360', label: 'Nam Wai'},
            { value: '230', label: 'Ngan Wai'},
            { value: '270', label: 'On Ting'},
            { value: '400', label: 'Ping Shan'},
            { value: '330', label: 'Prime View'},
            { value: '300', label: 'Pui To'},
            { value: '920', label: 'Sam Shing'},
            { value: '320', label: 'San Hui'},
            { value: '160', label: 'San Wai'},
            { value: '180', label: 'Shan King (North)'},
            { value: '190', label: 'Shan King (South)'},
            { value: '170', label: 'Shek Pai'},
            { value: '560', label: 'Shui Pin Wai'},
            { value: '240', label: 'Siu Hei'},
            { value: '100', label: 'Siu Hong'},
            { value: '265', label: 'Siu Lun'},
            { value: '540', label: 'Tin Heng'},
            { value: '212', label: 'Tai Hing (North)'},
            { value: '220', label: 'Tai Hing (South)'},
            { value: '590', label: 'Tai Tong Road'},
            { value: '480', label: 'Tin Fu'},
            { value: '140', label: 'Tin King'},
            { value: '460', label: 'Tin Shui'},
            { value: '435', label: 'Tin Tsz'},
            { value: '450', label: 'Tin Wu'},
            { value: '550', label: 'Tin Yat'},
            { value: '445', label: 'Tin Yiu'},
            { value: '430', label: 'Tin Shui Wai'},
            { value: '520', label: 'Ting Sau'},
            { value: '500', label: 'Ting Wing'},
            { value: '510', label: 'Ting Yuet'},
            { value: '390', label: 'Tong Fong Tsuen'},
            { value: '280', label: 'Town Center'},
            { value: '295', label: 'Tuen Mun' },
            { value: '1', label: 'Tuen Mun Ferry Pier'},
            { value: '90', label: 'Tuen Mun Hospital'},
            { value: '250', label: 'Tuen Mun Swimming Pool'},
            { value: '40', label: 'Tsing Shan Tsuen'},
            { value: '50', label: 'Tsing Wun'},
            { value: '530', label: 'Wetland Park'},
            { value: '275', label: 'Yau Oi'},
            { value: '600', label: 'Yuen Long'},
      ];

      function fetchData() {
            fetch("https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule?station_id="+selectedOption.value)
                        .then(res => res.json())
                        .then((result) => {
                                    setIsLoaded(true);
                                    setItems(result); 
                                    setLoading(false);
                                    // console.log(result)
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
      }, [selectedOption.value]);
      
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
                                                <div >
                                                      
                                                      <ul className="navbar-nav">
                                                            <li className="nav-item active">
                                                                  <a className="nav-link" href="https://eztranx.com/mtr">MTR <span className="sr-only">(current)</span></a>
                                                            </li>
                                                      </ul>
                                                </div>
                                          </nav>
                                          <hr className="bg-white mt-0"/>
                                    </div>
                                    <h5 className="text-white pb-2 d-inline">Light Rail ETA </h5>
                                    {/* <span className="text-white pb-2 d-inline"> by ezTranx </span> */}
                              </div>
                              <div className="pt-2 text-white pb-2">Refreshed at: {items.system_time}</div>
                              {/* <div className="row">  
                                    <div className="text-white col-12 pb-2">Station: {selectedOption ? selectedOption.label : "---"}</div>
                              </div> */}
                              <div className="row">  
                                    <div className="col-sm-6">
                                          <Select
                                                value={selectedOption}
                                                onChange={handleChange}
                                                options={options}
                                          />
                                    </div>
                              </div>
                              <hr className="bg-white"/>

                              {loading ? <LoadingSpinner/> : ""}
                              {(!!loading) ? "" : <Platform platforms={items.platform_list}/> }  
                              
                              {/* <FullScreen/> */}

                              <div className="text-white pb-4 pt-2"><FontAwesomeIcon icon={faCopyright} /> 2021 ezTranx All Rights Reserved</div>
                        </div>
                  </div>
            </React.Fragment>
            )
      }
}

export default ETA;
