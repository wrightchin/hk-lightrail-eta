import React, { useEffect, useState } from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import App from './App';

function DestList (props) {
      switch (props.dest) {
            case 'HUH': 
                  return ('Hung Hom')
            case 'TUM':
                  return ("Tuen Mun") 
            case 'HOK':
                  return ('Hong Kong')
            case 'TSY':
                  return ('Tsing Yi')
            case 'TUC':
                  return ('Tung Chung')
            case 'AWE':
                  return ('Asia World Expo')
            case 'NOP':
                  return ('North Point')
            case 'TIK':
                  return ('Tiu Keng Leng')
            case 'LHP':
                  return ('LOHAS Park')
            case 'POA':
                  return ('Po Lam')
            case 'MEF':
                  return ('Mei Foo')
            case 'WKS':
                  return ('Wu Kai Sha')
            case 'ADM':
                  return ('Admiralty')
            case 'MKK':
                  return ('Mong Kok East')
            case 'SHT':
                  return ('Sha Tin')
            case 'TAP':
                  return ('Tai Po Market')
            case 'SHS':
                  return ('Shung Shui')
            case 'LOW':
                  return ('Lo Wu')
            case 'LMC':
                  return ('Lok Ma Chau')
            default:
                  return (props.dest)
      }
}

function TrainArr (props) {
      return (
            <div className="py-3">
                  <div className="px-2 py-2 border border-white">
                        <div className="py-1 text-white"></div>
                        <div className="px-2 row">
                                    <span className="col-5 text-white">Destination </span>
                                    <span className="col-3 text-white">Platform </span>
                                    <span className="col-4 text-white">Time </span>
                        </div>
                        {(props.data.map((r) => 
                              <div className="px-2 row">
                                    <span className="col-5 text-success"><DestList dest={r.dest}/></span>
                                    <span className="col-3 text-warning">{r.plat} </span>
                                    <span className="col-4 text-success">{r.ttnt} mins </span>
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
      const [line, setLine] = useState({value: "TML", label: "Tuen Ma Line"});
      let [options, setOptions] = useState([
            {value: "WKS", label: "Wu Kai Sha"},
            {value: "MOS", label: "Ma On Shan"},
            {value: "HEO", label: "Heng On"},
            {value: "TSH", label: "Tai Shui Hang"},
            {value: "SHM", label: "Shek Mun"},
            {value: "CIO", label: "City One"},
            {value: "STW", label: "Sha Tin Wai"},
            {value: "CKT", label: "Che Kung Temple"},
            {value: "TAW", label: "Tai Wai"},
            {value: "HIK", label: "Hin Keng"},
            {value: "DIH", label: "Diamond Hill"},
            {value: "KAT", label: "Kai Tak"},
            {value: "SUW", label: "Sung Wong Toi"},
            {value: "TKW", label: "To Kwa Wan"},
            {value: "HOM", label: "Ho Man Tin"},
            {value: "HUH", label: "Hung Hom"},
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
      ]);

      const TML = [
            {value: "WKS", label: "Wu Kai Sha"},
            {value: "MOS", label: "Ma On Shan"},
            {value: "HEO", label: "Heng On"},
            {value: "TSH", label: "Tai Shui Hang"},
            {value: "SHM", label: "Shek Mun"},
            {value: "CIO", label: "City One"},
            {value: "STW", label: "Sha Tin Wai"},
            {value: "CKT", label: "Che Kung Temple"},
            {value: "TAW", label: "Tai Wai"},
            {value: "HIK", label: "Hin Keng"},
            {value: "DIH", label: "Diamond Hill"},
            {value: "KAT", label: "Kai Tak"},
            {value: "SUW", label: "Sung Wong Toi"},
            {value: "TKW", label: "To Kwa Wan"},
            {value: "HOM", label: "Ho Man Tin"},
            {value: "HUH", label: "Hung Hom"},
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

      const EAL = [
            {value: "ADM", label: "Admiralty"},
            {value: "EXC", label: "Exhibition Centre"},
            {value: "HUH", label: "Hung Hom"},
            {value: "MKK", label: "Mong Kok East"},
            {value: "KOT", label: "Kowloon Tong"},
            {value: "TAW", label: "Tai Wai"},
            {value: "SHT", label: "Sha Tin"},
            {value: "FOT", label: "Fo Tan"},
            {value: "RAC", label: "Racecourse"},
            {value: "UNI", label: "University"},
            {value: "TAP", label: "Tai Po Market"},
            {value: "TWO", label: "Tai Wo"},
            {value: "FAN", label: "Fanling"},
            {value: "SHS", label: "Sheung Shui"},
            {value: "LOW", label: "Lo Wu"},
            {value: "LMC", label: "Lok Ma Chau"},
      ];

      const lines = [
            {value: "TML", label: "Tuen Ma Line"},
            {value: "AEL", label: "Airport Express"},
            {value: "TCL", label: "Tung Chung Line"},
            {value: "TKL", label: "Tseung Kwan O Line"},
            {value: "EAL", label: "East Rail Line"},


      ]

      const handleChange = selectedOption => {
            setLoading(true);
            setSelectedOption(selectedOption);
      }

      const handleChangeLine = line => {
            setLoading(true);
            setLine(line);
            
            switch (line.value) {
                  case 'EAL':
                        setOptions(EAL)
                        setSelectedOption({value: "HUH", label: "Hung Hom"})
                  case 'TML':
                        setOptions(TML)
                        setSelectedOption({value: "HUH", label: "Hung Hom"})
                        break
                  case 'TCL':
                        setOptions(TCL)
                        setSelectedOption({value: "TUC", label: "Tung Chung"})
                        break
                  case 'AEL':
                        setOptions(AEL)
                        setSelectedOption({value: "HOK", label: "Hong Kong"})
                        break
                  case 'TKL':
                        setOptions(TKL)
                        setSelectedOption({value: "NOP", label: "North Point"})
                        break
                  default:
                        setOptions(EAL)
                        setSelectedOption({value: "HUH", label: "Hung Hom"})
                        break
            }
      }

      function fetchData() {
            fetch("https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line="+line.value+"&sta="+selectedOption.value)
                        .then(res => res.json())
                        .then((result) => {
                                    setIsLoaded(true);
                                    setItems(result.data[(line.value +'-'+selectedOption.value)]); 
                                    setLoading(false);
                                    // console.log(111, result)
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
                                                <ul className="navbar-nav">
                                                      <li className="nav-item active">
                                                            <a className="nav-link" href="https://eztranx.com/lrt">Light Rail</a>
                                                      </li>
                                                </ul>
                                          </nav>
                                          <hr className="bg-white mt-0"/>
                                    </div>
                                    <h5 className="text-white pb-2 d-inline">{line.label} ETA </h5>
                                    {/* <span className="text-white pb-2 d-inline"> by ezTranx </span> */}
                              </div>
                              <div className="pt-2 text-white pb-2">Refreshed at: {items.sys_time}</div>
                              
                              <div className="row">  
                                    <div className="col-6">
                                          <Select
                                                value={line}
                                                onChange={handleChangeLine}
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
                              

                              <div className="text-white pb-4 pt-2"><FontAwesomeIcon icon={faCopyright} /> 2022 ezTranx All Rights Reserved</div>
                        </div>
                  </div>
            </React.Fragment>
            )
      }
}

export default ETA;
