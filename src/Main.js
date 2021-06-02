import React, { useEffect, useState } from "react";
import './App.css';

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
                  {/* <hr className="bg-white"/> */}
                  {p.route_list.map((r) => 
                        <div className="px-2 row">
                              <span className="col-3 text-success">{r.route_no} </span>
                              <span className="col-3 text-warning">{r.time_en} </span>
                              <span className="col-6 text-success">{r.dest_en} </span>
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

useEffect(() => {
            setInterval(() => {
                  fetch("https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule?station_id=295")
                        .then(res => res.json())
                        .then((result) => {
                                    setIsLoaded(true);
                                    setItems(result);
                              });
            }, 10000);
      }, []);
      
if (error) {
      return <div>Error: {error.message}</div>;
} else if (!isLoaded) {
      return <div>Loading...</div>;
} else {
      return (
            <React.Fragment>
                  <div className="bg-black">
                        <div className="container">
                              <div className="pt-4 text-white">Refreshed at: {items.system_time}</div>
                              <div className="text-white">Station: Tuen Mun</div>
                              {/* <hr className="bg-white"/> */}
                              <Platform platforms={items.platform_list}/>
                        </div>
                  </div>
            </React.Fragment>
            )
      }
}

export default ETA;
