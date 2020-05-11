import React, { useEffect } from "react"
import PropTypes from "prop-types"

import Header from "../Header"
import { useStaticQuery, graphql } from "gatsby"
import "reset-css"
import "./Layout.scss"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
