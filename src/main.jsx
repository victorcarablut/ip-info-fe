import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Global Index Style CSS
import './assets/css/index.css';
import './assets/css/root.css';

// Custom Scrollbar CSS
import './assets/css/scrollbar.css';

// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')).render(<App />)
