import { Fragment } from "react";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import ProductList from "../components/ProductList/ProductList";

const ShopPage = () => {
  
  return (
    <Fragment>
      <Categories />
      <Products />
      <ProductList/>
      <CampaignSingle />
      <Products />
    </Fragment>
  );
};

export default ShopPage;
