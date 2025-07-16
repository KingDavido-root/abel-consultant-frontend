import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { measurePerformance } from './utils/performanceMonitoring';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

// Performance monitoring
reportWebVitals(metrics => {
  // You can send these metrics to your analytics service
  console.log(metrics);
});

// Monitor page load performance
window.addEventListener('load', () => {
  const performanceMetrics = measurePerformance.pageLoad();
  console.log('Page Load Metrics:', performanceMetrics);
});

// Track resource timing
window.addEventListener('load', () => {
  const resourceTimings = measurePerformance.resourceTiming();
  console.log('Resource Timings:', resourceTimings);
});
