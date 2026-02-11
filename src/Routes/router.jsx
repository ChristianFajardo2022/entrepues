import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import { BREAKPOINTS } from "../constants/routes";

// Layout
import MainLayout from "../components/layout/MainLayout";

// Pages
import Video360Page from "../pages/Video360Page";
import NotFoundPage from "../pages/NotFoundPage";

// Components
import { Home } from "../components/home/Home";
/**
 * Configuración centralizada de rutas de la aplicación
 * Define todas las rutas, sus componentes y lógica de renderizado
 */
function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Layout principal - contiene Header y Modal */}
        <Route element={<MainLayout />}>
          {/* Ruta principal - Home */}
          <Route path="/" element={<Home />} />

          {/* Ruta de descubrenos - Video 360 */}
          <Route path="/descubrenos" element={<Video360Page />} />
        </Route>

        {/* Ruta 404 - Cualquier ruta no encontrada (sin Layout) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
