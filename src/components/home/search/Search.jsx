import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Data from './data/Data';
import { url } from '../../../config';
import './search.css';

export default function Search({ handleWorldMapData }) {

    const [ip, setIp] = useState(null);
    const [ipData, setIpData] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isApiLimitReached, setIsApiLimitReached] = useState(false);

    // get client current IP (free public API) 
    const link1 = "https://jsonip.com";
    const link2 = "https://api.ipify.org?format=json";
    const [link, setLink] = useState(link1);

    useEffect(() => {
        getClientIp(link);
    }, [link])

    const getClientIp = async (link) => {
        setIsLoading(true);
        setIsError(false);

        await axios.get(link).then(async (res) => {

            if (res.status === 200) {
                setIp(res.data.ip);
                await getIpData(res.data.ip);
            }
        }).catch(err => {
            setLink(link2) // if link1 error try link2
            setIsLoading(false);
            setIsError(true);
            return;
        })
    }

    // get data from backend
    const getIpData = async (ip) => {

        setIsLoading(true);
        setIsError(false);
        handleWorldMapData({});

        const data = { ip: ip }

        await axios.post(`${url}/ip/info`, data).then((res) => {

            if (res.status === 200) {
                setIsApiLimitReached(false);
                setIp(ip);
                setIpData(res.data)
                setIsLoading(false);
                handleWorldMapData(res.data);
            }

            if (res.status === 429) {
                setIsApiLimitReached(true);
            }

        }).catch(err => {
            handleWorldMapData({});
            setIsLoading(false);
            setIsError(true);
            return;
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div className="search-section">
            <form className="search-form" onSubmit={handleSubmit}>
                <input type="text"
                    id="search-input"
                    placeholder="Search..."
                    className="search-input"
                    value={ip || ""}
                    onChange={(e) => setIp(e.target.value.trim())}
                    onKeyDown={(e) => { if (e.key === 'Enter' && ip) getIpData(ip) }}
                    autoComplete="off"
                    maxLength={50} />
                <label htmlFor="search-input" className="search-label">Search</label>
                <div className="search-button-section">

                    {isLoading ? <div className="search-loading"></div>
                        : ip ?
                            <div className="search-button">
                                <i className="bi bi-search" onClick={() => getIpData(ip)} />
                            </div>
                            : <p><small>IPv4 IPv6</small></p>
                    }
                </div>
            </form>
            <div className="search-options-section">
                <button onClick={() => getClientIp(link)}>Your IP</button>
                <button onClick={() => getIpData("8.8.8.8")}>8.8.8.8</button>
                <button onClick={() => getIpData("2001:4860:4860::8888")}>2001:4860:4860::8888</button>
            </div>
            <div>
                {!isError ? <Data data={ipData} isLoading={isLoading} /> : <p className="error">error: verify input or try later</p>}
                {isApiLimitReached && <p className="warning">API usage limit reached, try later</p>}
            </div>
        </div>
    )
}
