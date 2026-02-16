// App.tsx

// jQuery
import $ from 'jquery';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// local imports
import { useEffect } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';

import './App.css'
import About from './pages/About'
import Playground from './pages/Playground'
import JupyterLitePlayground from './pages/JupyterLitePlayground'
import WebLLMPlayground from './pages/WebLLM';
import Links from './pages/Links'

// Navigation bar and footer (global)
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import InterestingWorks from './pages/InterestingWorks';

function App() {

  return (
    <HashRouter>      
      <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/playground/jupyterlite" element={<JupyterLitePlayground />} />
          <Route path="/playground/webllm" element={<WebLLMPlayground />} />
          <Route path="/interesting-works" element={<InterestingWorks />} />
          <Route path="/links" element={<Links />} />
        </Routes>
      </div>
      <Footer/>         
      </div>         
    </HashRouter>
  )
}

export default App
