import React from "react";
import Contact from "../components/Contact/Contact";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";

const ContactPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Contact/>
      <Footer />
    </React.Fragment>
  );
};

export default ContactPage;