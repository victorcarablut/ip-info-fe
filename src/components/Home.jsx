import React, { useEffect, useState } from 'react';

// Axios (API)
import axios from "axios";

// config file (URL)
import { url } from "../config";

function Home() {

  const [ip, setIp] = useState(null);

  const ipInfo = {
    ip: null,
    city: null,
    region: null,
    country: null,
    countryFullName: null,
    loc: null,
    org: null,
    postal: null,
    timezone: null,
  }


  // http response status
  const [responseStatusGetAllCountries, setResponseStatusGetAllCountries] = useState("");

  const handleInputIp = (e) => {
    setIp(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const getIpInfo = async () => {

    //setEmailNewCodeStatus("loading")
    //const toastNotify = toast.loading("Send Email Code");

    const data = {
      ip: ip
    }

    await axios.post(`${url}/ip/info`, data).then((res) => {

      if (res.status === 200) {

       console.log(res.data);
        
      }

    }).catch(err => {
      //toast.dismiss(toastNotify);
      //toast.error("Error Send Email");
      //setEmailNewCodeStatus("error");
      return;
    })
  }

  return (
    <div className="container px-4">

      <div className="row" style={{ marginTop: 100 }}>
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card custom-card-dark-transparent" style={{ maxWidth: 500 }}>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="input-group input-group-sm mb-3">
                  <span className="input-group-text custom-span-dark" id="inputGroup-sizing-sm">IP</span>
                  <input type="text" className="form-control search-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" maxLength={100} onChange={(e) => handleInputIp(e)} autoComplete="off" required />
                  <button className="btn btn-outline-secondary tooltip-dark" type="button" id="button-addon2" aria-label="Search" data-balloon-pos="right" onClick={getIpInfo} disabled={!ip}><i className="bi bi-search"></i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home