import no_image from '../../../../assets/images/no-image.jpg';
import './data.css';
import Weather from './weather/Weather';
import DateTime from './timezone/DateTime';

export default function Data({ data, isLoading }) {

    return (
        <>
            {(isLoading || !data.ip) ? <></>
                :
                <ul className="data">
                    <li>ip:<span>{data.ip}</span></li>
                    {data.hostname &&
                        <li>hostname:<span>{data.hostname}</span></li>
                    }
                    <li><img src={data.countryFlag ? data.countryFlag : no_image} width={40} alt="country-flag" /></li>
                    <br />
                    <li>city:<span>{data.city}</span></li>
                    <li>region:<span>{data.region}</span></li>
                    <li>country:<span>{data.country}</span></li>
                    <li>country_full_name:<span>{data.countryFullName}</span></li>
                    {data.postal &&
                        <li>postal_code:<span>{data.postal}</span></li>
                    }
                    <li>timezone:<span>{data.timezone}</span></li>
                    {data.org &&
                        <li>org:<span>{data.org}</span></li>
                    }
                    <br />
                    <li>lat:<span>{data.lat}</span></li>
                    <li>long:<span>{data.lng}</span></li>
                    <br />
                    <li>anycast:<span>{data.anycast ? "true" : "false"}</span> | bogon:<span>{data.bogon ? "true" : "false"}</span></li>
                    <br />
                    <li><i className="bi bi-currency-exchange" /><span>{data.countryCurrencyCode}</span> | <i className="bi bi-telephone-fill" /><span>{data.countryPhoneCode}</span></li>
                    <br />
                    <DateTime timezone={data.timezone} />
                    <br />
                    <Weather lat={data.lat} lon={data.lng} />
                </ul>
            }
        </>
    )
}
