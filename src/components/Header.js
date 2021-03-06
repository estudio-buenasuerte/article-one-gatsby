import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { useMediaQuery } from "react-responsive"
import SearchBar from "./SearchBar"
import MobileMenu from "./MobileMenu"
import SearchIcon from "../images/search.svg"
import MobileMenuIcon from "../images/menu.svg"
import CartIcon from "../images/cart.svg"
import ShopContext from "../context/ShopContext"
import { Link } from "gatsby"

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 3;
`

const DesktopHeaderWrapper = styled.nav`
  padding: 12px 25px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid;
  background-color: white;
`

const MobileHeader = styled.nav`
  border-bottom: 1px solid;
  background-color: white;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
`

const Logo = styled.h1`
  margin: 0;
`

const Nav = styled.nav``

const NavLink = styled.a`
  text-transform: uppercase;
  margin-left: 25px;
  cursor: pointer;
  &:first-of-type {
    margin: 0;
  }
  &.mobile-logo {
    position: absolute;
    text-align: center;
    left: 30%;
    right: 30%;
  }
`

const InnerLink = styled(Link)`
  text-transform: uppercase;
  margin-left: 25px;
  cursor: pointer;
  &:first-of-type {
    margin: 0;
  }
  &.mobile-logo {
    position: absolute;
    text-align: center;
    left: 30%;
    right: 30%;
  }
`

const SearchImg = styled.img`
  height: 0.85em;
  width: auto;
  padding-left: 5px;
  vertical-align: baseline;
`

const MenuImg = styled.img`
  height: 13px;
  width: auto;
`
const CartImg = styled.img`
  height: 16px;
  width: auto;
`

const Header = props => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" })

  const context = useContext(ShopContext)

  const home = "https://www.articleoneeyewear.com"
  // const home = "/"

  const links = [
    {
      link: "https://articleoneeyewear.com/collections/sun",
      title: "Sun",
    },
    {
      link: "https://articleoneeyewear.com/collections/optical",
      title: "Optical",
    },
    {
      link: "https://articleoneeyewear.com/collections/ao-active",
      title: "Active",
    },
    {
      link: "/",
      title: "Stories",
    },
    {
      link: "https://articleoneeyewear.com/pages/labor-of-love",
      title: "Factories",
    },
    {
      link: "https://articleoneeyewear.com/pages/find-us",
      title: "Find Us",
    },
  ]

  useEffect(() => {
    const aoCart = localStorage.getItem("aoCart")
  }, [])
  return (
    <>
      <HeaderWrapper className="header">
        {isTabletOrMobile ? (
          <MobileHeader>
            <MenuImg src={MobileMenuIcon} onClick={() => setMenuOpen(true)} />
            <NavLink href={home} className="mobile-logo">
              Article One
            </NavLink>
            <CartImg src={CartIcon} />
          </MobileHeader>
        ) : (
          <DesktopHeaderWrapper>
            <Logo>
              <NavLink href={home}>Article One</NavLink>
            </Logo>
            <Nav>
              {links.map((item, index) => {
                return item.link === "/" ? (
                  <InnerLink to={item.link}>{item.title}</InnerLink>
                ) : (
                  <NavLink href={item.link} key={index}>
                    {item.title}
                  </NavLink>
                )
              })}
              <NavLink onClick={() => setSearchOpen(!searchOpen)}>
                Search <SearchImg src={SearchIcon} />
              </NavLink>
              <NavLink href="https://articleoneeyewear.com/cart">
                Cart ({context.checkout.lineItems.length})
              </NavLink>
            </Nav>
          </DesktopHeaderWrapper>
        )}
        <SearchBar
          size={"desktop"}
          open={searchOpen}
          onClick={() => setSearchOpen(false)}
        />
      </HeaderWrapper>
      <MobileMenu open={menuOpen} onClick={() => setMenuOpen(false)} />
    </>
  )
}

export default Header
