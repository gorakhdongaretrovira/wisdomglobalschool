import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Academics from "./pages/Academics";
import Branches from "./pages/Branches.jsx";
import Facilities from "./pages/Facilities.jsx";
import Contact from "./pages/Contact.jsx";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Loader from "./components/Loader";

// ✅ ScrollToTop component (same file madhe add kelela)
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return (
    <BrowserRouter>

     
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
      <WhatsAppButton />

    </BrowserRouter>
  );
}

export default App;