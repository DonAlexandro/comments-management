import {Button, Card, Form} from 'semantic-ui-react'

export const CommentFormComponent = () => {
	return (
		<Card fluid style={{margin: '2rem'}}>
			<Card.Content>
				<h3>Write a Comment</h3>
				<Form>
					<Form.Field>
						<input type="text" placeholder="Your name" />
					</Form.Field>
					<Form.Field>
						<textarea placeholder="Your comment" />
					</Form.Field>
					<Button color="blue">Submit</Button>
				</Form>
			</Card.Content>
		</Card>
	)
}
