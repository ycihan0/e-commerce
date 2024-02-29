import { Fragment, useState } from "react";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import ProductList from "../components/ProductList/ProductList";

const ShopPage = () => {
  const [categoryId, setCategoryId]=useState("");
  
  return (
    <Fragment>
      <Categories setCategoryId={setCategoryId}/>
      <ProductList categoryId={categoryId}/>
      <CampaignSingle />
      <Products />
    </Fragment>
  );
};

export default ShopPage;
