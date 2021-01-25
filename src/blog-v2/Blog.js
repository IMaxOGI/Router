import React from "react";
import "./styles/blog-v2.css";
import { Container, Header, Menu } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./containers/Home";
import Users from "./containers/Users";
import About from "./containers/About";
import UserDetails from "./containers/UserDetails";
import Posts from "./containers/Posts";
import PostDetails from "./containers/PostDetails";
import NotFound from "./containers/NotFound";

export default function Blog() {
  return (
    <Container>
      <Router>
        <Header>
          <NavLink to="/"> Blog-v2</NavLink>
        </Header>
        <Menu>
          <NavLink to="/users" className="item">
            Users
          </NavLink>
          <NavLink to="/about" className="item">
            About
          </NavLink>
          <NavLink to="/posts" className="item">
            Posts
          </NavLink>
        </Menu>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/users/:userId">
            <UserDetails />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/posts" exact>
            <Posts />
          </Route>
          <Route path="/posts/:postId">
            <PostDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}
