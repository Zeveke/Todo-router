import styles from './todo-list-output.module.css';
import { Link } from 'react-router-dom';

export const ToDosListOutput = ({ toDosList }) => {
	return (
		<div>
			{toDosList.map((toDo) => (
				<div key={toDo.id} className={styles.todoItem}>
					<div className={styles.todoText}>
						<Link to={`/task/${toDo.id}`}>{toDo.value}</Link>
					</div>
				</div>
			))}
		</div>
	);
};
