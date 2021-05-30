import {Table, Label, Button, Icon} from 'semantic-ui-react'

export const AdminPanel = () => {
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
				<Table.Row>
					<Table.Cell>Text 1</Table.Cell>
					<Table.Cell>Name 1</Table.Cell>
					<Table.Cell>
						<Label color="green">Approved</Label>
					</Table.Cell>
					<Table.Cell>
						<Button icon color="green">
							<Icon name="check" />
							Approve
						</Button>
						<Button icon color="red">
							<Icon name="trash alternate" />
							Delete
						</Button>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	)
}
