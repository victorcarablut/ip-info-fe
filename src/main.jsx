import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Index Style CSS
import './assets/css/index.css';

// Custom Scrollbar CSS
import './assets/css/scrollbar.css';

// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')).render(<App />)
