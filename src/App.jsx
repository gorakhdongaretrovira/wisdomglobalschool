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
import PrivacyPolicy from "./pages/PrivacyPolicy";
// import CookieBanner from "./components/CookieBanner";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const computeInitialLoading = () => {
    try {
      // If the window was opened via window.open (has an opener), skip loader
      if (window.opener) return false;

      const ref = document.referrer || "";

      // If there's a referrer and the history length is 1 it's very likely
      // this page was opened in a new tab/window (target="_blank" / window.open())
      // — in that case skip the loader so the new tab doesn't show it.
      if (ref && window.history.length <= 1) return false;

      // Otherwise show the loader (normal first-time navigation or direct visits)
      return true;
    } catch (e) {
      return true;
    }
  };

  const [loading, setLoading] = useState(computeInitialLoading);

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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
      {/* <CookieBanner /> */}

    </BrowserRouter>
  );
}

export default App;