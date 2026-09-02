import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import Home from "@/pages/Home";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}
