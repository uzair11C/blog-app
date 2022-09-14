import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserContext } from './contexts/currentUserContext'
import { AllUsersContext } from './contexts/allUsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AllUsersContext>
        <CurrentUserContext>
          <App />
        </CurrentUserContext>
      </AllUsersContext>
    </Router>
  </React.StrictMode>
)
