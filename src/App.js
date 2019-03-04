import React from 'react';
import { mainStyle } from './styles/AppStyle';
import Filter from './Filter';


class App extends React.Component {
	render() {
		return (
			<div style={mainStyle}>
				<Filter/>
			</div>
		);
	}
}

export default App;