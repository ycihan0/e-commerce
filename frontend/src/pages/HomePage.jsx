import React from "react";
import Header from "../components/Layout/Header/Header";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import Campaigns from "../components/Campaigns/Campaigns";
import Blogs from "../components/Blogs/Blogs";
import Brands from "../components/Brands/Brands";
import Policy from "../components/Layout/Policy/Policy";
import Footer from "../components/Layout/Footer/Footer";
import CampaignSingle from '../components/CampaignSingle/CampaignSingle';
import Sliders from '../components/Slider/Sliders';

const HomePage = () => {
  return (
    <React.Fragment>
      <Header />
      <Sliders />
      <Categories />
      <Products />
      <Campaigns />
      <Products />
      <Blogs />
      <Brands />
      <CampaignSingle />
      <Policy />
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
