import {useEffect, useState} from 'react'
import {Table, Label, Button, Icon} from 'semantic-ui-react'
import io from 'socket.io-client'
import axios from 'axios'

let socket

export const AdminPanel = () => {
	const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT

	const [comments, setComments] = useState([])

	useEffect(() => {
		const loadComments = async () => {
			const {data} = await axios.get(`${ENDPOINT}/comments`)

			setComments(data.comments)
		}

		loadComments()
	}, [ENDPOINT])

	useEffect(() => {
		socket = io(ENDPOINT, {
			transports: ['websocket'],
		})

		socket.on('newComment', comment => {
			setComments(prev => [...prev, comment])
		})

		socket.on('approveComment', comment => {
			setComments(prev =>
				prev.map(c => {
					if (c._id === comment._id) {
						return comment
					}

					return c
				})
			)
		})

		return () => {
			socket.off()
		}
	}, [ENDPOINT])

	const deleteComment = id => {
		socket.emit('deleteComment', id)
		setComments(prev => prev.filter(comment => comment._id !== id))
	}

	const approveComment = id => {
		socket.emit('approveComment', id)
	}

	const colors = {
		approved: 'green',
		'pending for review': 'grey',
	}

	return (
		<Table celled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Coment Text</Table.HeaderCell>
					<Table.HeaderCell>User name</Table.HeaderCell>
					<Table.HeaderCell>Status</Table.HeaderCell>
					<Table.HeaderCell>Actions</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{comments.map(comment => (
					<Table.Row key={comment._id}>
						<Table.Cell>{comment.text}</Table.Cell>
						<Table.Cell>{comment.username}</Table.Cell>
						<Table.Cell>
							<Label color={colors[comment.status]}>{comment.status}</Label>
						</Table.Cell>
						<Table.Cell>
							{comment.status !== 'approved' && (
								<Button icon color="green" onClick={() => approveComment(comment._id)}>
									<Icon name="check" />
									Approve
								</Button>
							)}
							<Button icon color="red" onClick={() => deleteComment(comment._id)}>
								<Icon name="trash alternate" />
								Delete
							</Button>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	)
}
