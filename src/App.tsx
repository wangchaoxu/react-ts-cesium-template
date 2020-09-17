import React from 'react';
import './App.css';
import 'cesium/Widgets/widgets.css';
import { Viewer } from 'cesium';
class Test extends React.Component {
	constructor(props: Readonly<{}>) {
		super(props);
		this.state = { date: new Date() };
	}
	componentDidMount() {
		console.log('执行一');
		new Viewer('cesiumContainer');
	}

	componentWillUnmount() {
		console.log('执行二');
	}
	render() {
		return <div id="cesiumContainer"></div>;
	}
}

export default Test;
