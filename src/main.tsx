import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './components/App/App';
import './index.css';
import Modal from 'react-modal'; 

Modal.setAppElement('#root');

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);