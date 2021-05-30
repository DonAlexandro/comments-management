import {Grid} from 'semantic-ui-react'
import {ArticleComponent} from '../components/ArticleComponent'
import {CommentFormComponent} from '../components/CommentFormComponent'
import {CommentsComponent} from '../components/CommentsComponent'

export const Article = () => {
	return (
		<Grid>
			<Grid.Row columns={2}>
				<Grid.Column>
					<ArticleComponent />
					<CommentFormComponent />
					<CommentsComponent />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}
