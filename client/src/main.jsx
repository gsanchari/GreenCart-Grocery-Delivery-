import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
)



// import { createRoot } from 'react-dom/client'

// const rootEl = document.getElementById('root');
// console.log("Root element:", rootEl);

// if (rootEl) {
//   createRoot(rootEl).render(<h1 style={{ color: 'red' }}>This is working!</h1>);
// } else {
//   alert("No root element found!");
// }
