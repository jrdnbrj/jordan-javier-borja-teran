import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/global.css';
import Alert from './components/Alert';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Alert />
        <App />
    </Provider>
);
