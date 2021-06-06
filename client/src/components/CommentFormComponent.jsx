import {useState, useEffect} from 'react'
import {Button, Card, Form, Message} from 'semantic-ui-react'
import io from 'socket.io-client'

let socket

export const CommentFormComponent = () => {
	const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT

	const [value, setValue] = useState({
		name: '',
		text: '',
	})

	const [error, setError] = useState('')

	const handleChange = e =>
		setValue(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}))

	useEffect(() => {
		socket = io(ENDPOINT, {
			transports: ['websocket'],
		})

		return () => {
			socket.off()
		}
	}, [ENDPOINT])

	const submitHandler = () => {
		if (value.text && value.name) {
			socket.emit('createComment', value, ({error}) => {
				if (error) {
					return setError(error)
				}
			})

			setValue({name: '', text: ''})
		}
	}

	return (
		<Card fluid style={{margin: '2rem'}}>
			<Card.Content>
				<h3>Write a Comment</h3>
				{error && <Message color="red" content={error} />}
				<Form onSubmit={submitHandler}>
					<Form.Field required>
						<input
							value={value.name}
							onChange={handleChange}
							name="name"
							type="text"
							placeholder="Your name"
						/>
					</Form.Field>
					<Form.Field required>
						<textarea value={value.text} onChange={handleChange} name="text" placeholder="Your comment" />
					</Form.Field>
					<Button color="blue" disabled={!value.name || !value.text}>
						Submit
					</Button>
				</Form>
			</Card.Content>
		</Card>
	)
}
