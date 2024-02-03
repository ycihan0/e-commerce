import { Fragment } from "react"
import Footer from "../components/Layout/Footer/Footer"
import Header from "../components/Layout/Header/Header"
import Proptypes from "prop-types"

const MainLayout = ({children}) => {
  return (
    <Fragment>
      <Header/>
      {children}
      <Footer/>
    </Fragment>
  )
}

export default MainLayout

MainLayout.propTypes={
    children: Proptypes.node,
}
