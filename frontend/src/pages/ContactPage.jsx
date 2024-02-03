import React from "react";
import Contact from "../components/Contact/Contact";
import Header from "../components/Layout/Header/Header";
import Policy from "../components/Layout/Policy/Policy";
import Footer from "../components/Layout/Footer/Footer";

const ContactPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Contact/>
      <Policy />
      <Footer />
    </React.Fragment>
  );
};

export default ContactPage;
