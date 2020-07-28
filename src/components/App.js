import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Albums from './Albums';
import Photos from './Photos';

class App extends React.Component {
	render() {
		return (
			<HashRouter>
				<Switch>
					<Route path='/' exact component={Albums} />
					<Route path='/photos/:id' exact component={Photos} />
				</Switch>
			</HashRouter>
		);
	}
}

export default App;
