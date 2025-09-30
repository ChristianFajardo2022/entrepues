// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./assets/components/Home";
import Carta from "./assets/components/Carta";
import { useState, useEffect } from "react";
import Video360 from "./Video360";
import Ubicacion from "./assets/components/Ubicacion";
import CartaMobile from "./assets/components/CartaMobile";
import { HomeTwo } from "./assets/components/HomeTwo";
import { Menu } from "./assets/components/Menu/menu";
import MenuMobile from "./assets/components/Menu/MenuMobile";

function App() {
  const [count, setCount] = useState(6);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeTwo />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/carta"
          element={isMobile ? <MenuMobile /> : <Menu />}
        />
        <Route path="/cartam" element={<CartaMobile />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route
          path="/descubrenos"
          element={
            <div
              style={{ position: "relative", width: "100vw", height: "100vh" }}
            >
              <Video360 visibleIndex={count} setVisibleIndex={setCount} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
