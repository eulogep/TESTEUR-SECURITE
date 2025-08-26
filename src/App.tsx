/* Application réalisée par MABIALA EULOGE JUNIOR */
import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/NotFound";
import { Toaster } from "@/components/ui/toaster";
const TempoRoutes = import.meta.env.VITE_TEMPO === "true"
  ? lazy(async () => {
      const mod = await import("tempo-routes");
      const routes = mod.default;
      return { default: () => useRoutes(routes) };
    })
  : null;

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {TempoRoutes && <TempoRoutes />}
        <Toaster />
      </>
    </Suspense>
  );
}

export default App;