import {useEffect, useState} from 'react'
import {Sidebar, Menu, Label} from 'semantic-ui-react'
import {RiArticleLine} from 'react-icons/ri'
import {FaRegComments} from 'react-icons/fa'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'
import useSound from 'use-sound'

import notificationSound from '../assets/sounds/notification.mp3'

let socket

export const SidebarComponent = () => {
	const [commentsCount, setCommentsCount] = useState(0)

	const history = useHistory()
	const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT

	const [play] = useSound(notificationSound, {volume: 1})

	useEffect(() => {
		const loadComments = async () => {
			try {
				const {data} = await axios.get(`${ENDPOINT}/comments`)

				setCommentsCount(data.commentsCount)
			} catch (e) {
				console.error(e)
			}
		}

		loadComments()
	}, [ENDPOINT])

	useEffect(() => {
		socket = io(ENDPOINT, {
			transports: ['websocket'],
		})

		socket.on('newComment', () => {
			setCommentsCount(prev => prev + 1)
		})

		socket.on('approveComment', () => {
			setCommentsCount(prev => prev - 1)
		})

		socket.on('deleteComment', () => {
			setCommentsCount(prev => prev - 1)
		})
	}, [ENDPOINT])

	useEffect(() => {
		socket.on('newComment', () => {
			play()
		})
	}, [play])

	return (
		<Sidebar as={Menu} animation="push" icon="labeled" inverted vertical visible width="thin">
			<Menu.Item onClick={() => history.push('/')}>
				<RiArticleLine className="icon" />
				Article
			</Menu.Item>
			<Menu.Item onClick={() => history.push('/admin')}>
				<FaRegComments className="icon" />
				Comments
				{commentsCount > 0 ? (
					<Label color="red" circular size="mini" style={{marginLeft: 0}}>
						{commentsCount}
					</Label>
				) : (
					<></>
				)}
			</Menu.Item>
		</Sidebar>
	)
}
