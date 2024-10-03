import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-ip-info-geolocation.png';
import './header.css';

function Header() {
  return (
    <header>
      <Link to={"/"} className="logo-container-link">
        <img src={logo} width="80" alt="logo" />
        <div className="logo-text">
          <h2>IP Info</h2>
          <p>Geolocation</p>
        </div>
      </Link>
      <p className="description">
        Discover location data of IP address geolocation.
      </p>
    </header>
  )
}

export default Header