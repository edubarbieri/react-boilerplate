import React, { Component } from 'react';

import { hot } from 'react-hot-loader';

class App extends React.Component {
	render() {
		return (
			<div>
				<p>It's work!</p>
			</div>
		);
	}
}
const dev = process.env.NODE_ENV !== 'production';
export default dev ? hot(module)(App) : App;

