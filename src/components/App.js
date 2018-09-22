/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";

import AboutPage from "./AboutPage";
import FuelSavingsPage from "./containers/FuelSavingsPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import MenuBar from './NavBar.js'
import PropTypes from "prop-types";
import React from "react";
import styled from 'styled-components'
import { hot } from "react-hot-loader";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const Container = styled.div`
display: flex;
`
const Nav = styled.div`
flex: 1 1 auto;
`

const Main = styled.div`
flex: 1 1 auto;
`


class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <Container>

        <Nav><MenuBar></MenuBar></Nav>

      <Main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/fuel-savings" component={FuelSavingsPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Main>
      </Container>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
