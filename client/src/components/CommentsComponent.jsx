import {useEffect, useState} from 'react'
import {Card} from 'semantic-ui-react'
import axios from 'axios'
import io from 'socket.io-client'

let socket

export const CommentsComponent = () => {
	const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT

	const [comments, setComments] = useState([])

	useEffect(() => {
		const loadComments = async () => {
			try {
				const {data} = await axios.get(`${ENDPOINT}/comments?filter=approved`)

				setComments(data.comments)
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

		socket.on('approveComment', comment => setComments(prev => [...prev, comment]))

		return () => {
			socket.off()
		}
	}, [ENDPOINT])

	return (
		<div style={{margin: '2rem'}}>
			<h2>Comments</h2>
			{comments &&
				comments.map(comment => (
					<Card fluid key={comment._id}>
						<Card.Content>
							<Card.Header>{comment.username}</Card.Header>
							<Card.Meta>{comment.status}</Card.Meta>
							<Card.Description>{comment.text}</Card.Description>
						</Card.Content>
					</Card>
				))}
		</div>
	)
}
