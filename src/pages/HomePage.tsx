import { Analytics } from "@vercel/analytics/react";

import Divider from "../components/Divider/Divider";
import About from "../components/About/About";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import Portfolio from "../components/Portfolio/Portfolio";
import Skills from "../components/Skills/Skills";
import LineNumbers from "../components/LineNumbers/LineNumbers";
import Footer from "../components/Footer/Footer";
import "../index.css";

export default function HomePage() {
  return (
    <div className="App">
      <Header />

      <LineNumbers />

      <Navigation />

      <About />

      <Divider />

      <Skills />

      <Divider />

      <Portfolio />

      <Analytics />

      <Footer />
    </div>
  );
}
