import React, { useEffect, useState } from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import App from './App';

function Platform (props) {
      if (!props.platforms) {
            return (
                  <div>
                        data not ava
                  </div>
      )}
      const platformInfo = props.platforms.map((p) => 
      <div className="py-3">
            <div className="px-2 py-2 border border-white">
                  <div className="py-1 text-white">Platform: {p.platform_id}</div>
                  <div className="px-2 row">
                              <span className="col-3 text-white">Route </span>
                              <span className="col-3 text-white">Time </span>
                              <span className="col-6 text-white">Destination </span>
                  </div>
                  {(p.end_service_status === 1) &&(
                        <div className="px-2 row">
                              <span className="col-3 text-warning"> --- </span>
                              <span className="col-3 text-warning"> --- </span>
                              <span className="col-6 text-warning"> --- </span>
                        </div>
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

      const handleChange = selectedOption => {
            setSelectedOption(selectedOption);
            setStationId(selectedOption.value);
            console.log(selectedOption.value);
            console.log(stationId);
      }

      const options = [
            { value: '1', label: 'Tuen Mun Ferry Pier'},
            { value: '295', label: 'Tuen Mun' },
            { value: '600', label: 'Yuen Long' },
            { value: '100', label: 'Siu Hong'},
            { value: '280', label: 'Town Center'},
      ];

useEffect(() => {
            // console.log(33, selectedOption.value)
            let iid = window.setInterval(() => {
                  fetch("https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule?station_id="+selectedOption.value)
                        .then(res => res.json())
                        .then((result) => {
                                    setIsLoaded(true);
                                    setItems(result);  
                              });
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
                              <div className="pt-4 text-white pb-2">Refreshed at: {items.system_time}</div>
                              <div className="row">  
                                    <div className="text-white col-12 pb-2">Station: {selectedOption ? selectedOption.label : "---"}</div>
                              </div>
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
                              
                              {(!!items.platform_list) ? <Platform platforms={items.platform_list}/> : "Train Service Not Avaliable" }  
                              
                              <div className="text-white pb-4"><FontAwesomeIcon icon={faCopyright} /> 2021 Wright Chin All Rights Reserved</div>
                        </div>
                  </div>
            </React.Fragment>
            )
      }
}

export default ETA;
