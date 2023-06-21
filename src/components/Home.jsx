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
  const [responseStatusGetCurrentClientIpInfo, setResponseStatusGetCurrentClientIpInfo] = useState("");

  useEffect(() => {

    getCurrentClientIpInfo();

  }, [])


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

  const getCurrentClientIpInfo = async() => {

    await axios.get(`https://api.db-ip.com/v2/free/self`).then((res) => {

      if (res.status === 200) {
        setResponseStatusGetCurrentClientIpInfo("success");

        setIpInfo({
          ip: res.data.ipAddress,
          city: res.data.city,
          region: res.data.stateProv,
          country: res.data.countryCode,
          countryFullName: res.data.countryName,
          loc: "---",
          org: "---",
          postal: "---",
          timezone: res.data.continentName,
        })

      }

    }).catch(err => {
      return;
    })

  }

  return (
    <div className="container px-4">

      <div className="row" style={{ marginTop: 100 }}>
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card bg-transparent border border-0 text-secondary animate__animated animate__fadeIn">
            <div className="card-body">
              <h5 className="card-title">Check information about any IP address</h5>
              <p className="card-text"><i className="bi bi-info-circle me-md-2"></i>We'll not keep track or save your search.</p>
              <p className="card-text"><small>- Using external API from: <a className="footer-url" href="https://ipinfo.io" target="_blank" rel="noreferrer">ipinfo.io</a> and <a className="footer-url" href="https://db-ip.com" target="_blank" rel="noreferrer">db-ip.com</a></small></p>
              <p className="card-text"><small>- Developed for demonstration purposes only</small></p>
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
              
              {(responseStatusGetIpInfo === "success" || responseStatusGetCurrentClientIpInfo === "success") &&
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