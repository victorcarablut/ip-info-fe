import React, { useEffect, useState } from 'react';

// Axios (API)
import axios from "axios";

// config file (URL)
import { url } from "../config";

function Home() {

  const [ip, setIp] = useState(null);

  const [ipInfo, setIpInfo] = useState({
    ip: null,
    city: null,
    region: null,
    country: null,
    countryFullName: null,
    loc: null,
    org: null,
    postal: null,
    timezone: null,
  });




  // http response status
  const [responseStatusGetIpInfo, setResponseStatusGetIpInfo] = useState("");

  const handleInputIp = (e) => {
    setIp(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const getIpInfo = async () => {

    setResponseStatusGetIpInfo("loading");

    const data = {
      ip: ip
    }

    await axios.post(`${url}/ip/info`, data).then((res) => {

      if (res.status === 200) {
        setResponseStatusGetIpInfo("success");

        setIpInfo({
          ip: res.data.ip,
          city: res.data.city,
          region: res.data.region,
          country: res.data.country,
          countryFullName: res.data.countryFullName,
          loc: res.data.loc,
          org: res.data.org,
          postal: res.data.postal,
          timezone: res.data.timezone,
        })

      }

    }).catch(err => {
      setResponseStatusGetIpInfo("error");
      return;
    })
  }

  return (
    <div className="container px-4">

      <div className="row" style={{ marginTop: 100 }}>
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card bg-transparent border border-0 text-secondary">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
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
              {responseStatusGetIpInfo === "loading" &&
                <small className="animate__animated animate__fadeIn animate__infinite">Loading...</small>
              }
              {responseStatusGetIpInfo === "error" &&
                <small className="text-danger animate__animated animate__fadeIn">Error</small>
              }
              {responseStatusGetIpInfo === "success" &&
                <ul className="list-group list-group-flush animate__animated animate__fadeIn">
                  <li className="list-group-item bg-transparent font-monospace"><small className="text-light me-md-2">ip</small><small className="text-warning">{ipInfo.ip}</small></li>
                  <li className="list-group-item bg-transparent font-monospace"><small className="text-light me-md-2">city</small><small className="text-warning">{ipInfo.city}</small></li>
                  <li className="list-group-item bg-transparent font-monospace"><small className="text-light me-md-2">region</small><small className="text-warning">{ipInfo.region}</small></li>
                  <li className="list-group-item bg-transparent font-monospace"><small className="text-light me-md-2">country</small><small className="text-warning">{ipInfo.countryFullName} - {ipInfo.country} - {ipInfo.timezone}</small></li>
                  <li className="list-group-item bg-transparent font-monospace"><small className="text-light me-md-2">postal</small><small className="text-warning">{ipInfo.postal}</small></li>
                  <li className="list-group-item bg-transparent font-monospace"><small className="text-light me-md-2">org</small><small className="text-warning">{ipInfo.org}</small></li>
                  <li className="list-group-item bg-transparent font-monospace"><small className="text-light me-md-2">loc</small><small className="text-warning">{ipInfo.loc}</small></li>
                </ul>
              }
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home