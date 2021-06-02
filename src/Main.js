import React, { useEffect, useState } from "react";

function Platform (props) {
      // console.log(props.platforms)

      // let platformId = props.platforms[0].platform_id
      // console.log(platformId)
      if (!props.platforms) {
            return (
                  <div>
                        data not ava
                  </div>
            )
      }
      
      const platformInfo = props.platforms.map((p) => 
            
      <div className="py-2">
            <div>Platform: {p.platform_id}</div>
            {p.route_list.map((r) => 
                  <div className="px-2 row">
                        <span className="col-3">{r.route_no} </span>
                        <span className="col-6">{r.dest_en} </span>
                        <span className="col-3">{r.time_en} </span>
                  </div>
            )}
      </div>
      );
      
      return(
            <div>{platformInfo}</div>
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
                                    // console.log(result)
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
                  <div className="container">
                        <div className="pt-4">Refreshed at: {items.system_time}</div>
                        <div>Station: Tuen Mun</div>
                        <hr/>
                        <Platform platforms={items.platform_list}/>
                  </div>
            </React.Fragment>
            )
      }
}

export default ETA;
