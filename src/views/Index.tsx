import React from "react";
import "cesium/Widgets/widgets.css";
import { initViewer, addLayer, addNav } from "../wcesium/index";
class Test extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    console.log("执行一");
    const viewer = initViewer("cesiumContainer");
    addLayer(viewer);
    addNav(viewer);
  }
  componentWillUnmount() {
    console.log("执行二");
  }
  render() {
    return <div id="cesiumContainer"></div>;
  }
}

export default Test;
