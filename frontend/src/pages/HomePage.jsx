import React from "react";
import Hero from "../components/home/Hero";
import Footer from "../components/common/App/Footer";



function HomePage() {
  return (
    <div>
      {/* Navbar is included in Hero */}
      <Hero />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
