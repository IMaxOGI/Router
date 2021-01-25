import React from "react";
import "semantic-ui-css/semantic.min.css";
import Blog from "./blog-v2/Blog";
import "./App.css";

class App extends React.Component {
  render() {
    return <div className="app">{<Blog />}</div>;
  }
}

export default App;
