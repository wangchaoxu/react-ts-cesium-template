import React from "react";
import "cesium/Widgets/widgets.css";
import { Viewer } from "cesium";
import { addLayer } from "../wcesium/layer.js";
class Test extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    console.log("执行一");
    const viewer = new Viewer("cesiumContainer");
    addLayer(viewer);
  }
  componentWillUnmount() {
    console.log("执行二");
  }
  render() {
    return <div id="cesiumContainer"></div>;
  }
}

export default Test;
