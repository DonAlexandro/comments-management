import {Card} from 'semantic-ui-react'
import TimeAgo from 'react-timeago'

export const CommentsComponent = () => {
	return (
		<div style={{margin: '2rem'}}>
			<h2>Comments</h2>
			<Card fluid>
				<Card.Content>
					<Card.Header>Username</Card.Header>
					<Card.Meta>
						<TimeAgo date={new Date('01-01-2020')}></TimeAgo>
					</Card.Meta>
					<Card.Description>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium quasi esse aut facere
						incidunt dicta doloribus voluptates assumenda! Voluptatem blanditiis praesentium commodi quam
						velit ullam iusto provident suscipit fugit ut?
					</Card.Description>
				</Card.Content>
			</Card>
		</div>
	)
}
