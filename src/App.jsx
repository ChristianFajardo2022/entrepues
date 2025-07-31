// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './assets/components/Home';
import Carta from './assets/components/Carta';
import { useState } from 'react';
import Video360 from './Video360';
import Ubicacion from './assets/components/Ubicacion';
import CartaMobile from './assets/components/CartaMobile';

function App() {
  const [count, setCount] = useState(6);

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/cartam" element={<CartaMobile />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/video" element={
          <div style={{ position: "relative", width: "100vw", height: "100vh"}}>

            <Video360 visibleIndex={count} setVisibleIndex={setCount}  />
          </div>} />

      </Routes>
    </Router>
  );
}

export default App;
