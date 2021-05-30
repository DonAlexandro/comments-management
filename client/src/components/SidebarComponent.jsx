import {Sidebar, Menu, Label} from 'semantic-ui-react'
import {RiArticleLine} from 'react-icons/ri'
import {FaRegComments} from 'react-icons/fa'
import {useHistory} from 'react-router-dom'

export const SidebarComponent = () => {
	const history = useHistory()

	return (
		<Sidebar as={Menu} animation="push" icon="labeled" inverted vertical visible width="thin">
			<Menu.Item onClick={() => history.push('/')}>
				<RiArticleLine className="icon" />
				Article
			</Menu.Item>
			<Menu.Item onClick={() => history.push('/admin')}>
				<FaRegComments className="icon" />
				Comments{' '}
				<Label color="red" circular size="mini" style={{marginLeft: 0}}>
					0
				</Label>
			</Menu.Item>
		</Sidebar>
	)
}
