import ReactDOM from 'react-dom/client';
import './index.css';
// import 'animate.css';
import './theme.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import { AuthProvider } from './components/UserAuth';
import { MessageProvider } from './components/Message';

// import WOW from 'wow.js';
// new WOW().init();//WOW要大写

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);

root.render(<HashRouter>
  <MessageProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </MessageProvider>
</HashRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
