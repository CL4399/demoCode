import React from 'react';
//18
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from './App';
 
//18
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
 
//17
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
 
 