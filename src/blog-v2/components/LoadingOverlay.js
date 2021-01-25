import React, { Component } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

class LoadingOverlay extends Component {
  render() {
    return (
      <Dimmer active={this.props.active} inerted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }
}
export default LoadingOverlay;
