import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {Article} from './pages/Article'
import {AdminPanel} from './pages/AdminPanel'
import {SidebarComponent} from './components/SidebarComponent'
import {Sidebar} from 'semantic-ui-react'

function App() {
	return (
		<Router>
			<SidebarComponent />
			<Sidebar.Pusher>
				<Switch>
					<Route path="/" component={Article} exact />
					<Route path="/admin" component={AdminPanel} exact />
				</Switch>
			</Sidebar.Pusher>
		</Router>
	)
}

export default App
