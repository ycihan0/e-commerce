import {Fragment} from "react"
import Header from "../components/Layout/Header/Header";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import Footer from "../components/Layout/Footer/Footer";
import CampaignSingle from '../components/CampaignSingle/CampaignSingle';

const ShopPage = () => {
  return (
    <Fragment>
     <Header />
      <Categories />
      <Products />
      <CampaignSingle />
      <Products/>
      <Footer />
    </Fragment>
  )
}

export default ShopPage
