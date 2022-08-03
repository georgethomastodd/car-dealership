import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadData() {
  const response1 = await fetch('http://localhost:8100/api/manufacturers/');
  const response2 = await fetch('http://localhost:8100/api/models/');
  const response3 = await fetch('http://localhost:8100/api/automobiles/');
  if (response1.ok && response2.ok && response3.ok) {
    const data1 = await response1.json();
    const data2 = await response2.json();
    const data3 = await response3.json();

    root.render(
      <React.StrictMode>
        <App manufacturers={data1.manufacturers} models={data2.models} autos={data3.autos}/>
      </React.StrictMode>
    );
  } else {
    console.error(response1);
  }
}
loadData();

