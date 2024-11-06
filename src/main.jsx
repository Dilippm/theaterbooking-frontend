
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react'; 
import {store,persistor} from './redux/store.jsx';
import { SocketContextProvider } from './context/socketContext.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <SocketContextProvider>
					<App />
				</SocketContextProvider>
    </PersistGate>
  </Provider>
)
