import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import appRouter from './services/routes';
import { Provider } from 'react-redux';
import {persistor, store} from './utils/store';
import { PersistGate } from 'redux-persist/integration/react';
import { userAuthenticator } from './utils/reducers/userReducer';
import { adminAuthenticator } from './utils/reducers/adminReducer';
import { addNewReduxNotification } from './utils/reducers/notificationReducer';


const root = ReactDOM.createRoot(document.getElementById('root'));

// Listen for messages from the service worker
navigator?.serviceWorker?.addEventListener('message', (event) => {
  const { messageType } = event.data;
  const { newData } = event.data.data;

  const newNotify = JSON.parse(newData);

  console.log(messageType);

  if (messageType === "push-received") {
    store.dispatch(addNewReduxNotification({ notification: newNotify }));
  }
});


Promise.all([persistor.persist(),userAuthenticator(),adminAuthenticator()]).then(()=> {
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter}>
          <App />
        </RouterProvider>
      </PersistGate>
    </Provider>
  );
})



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
