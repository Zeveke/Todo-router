import styles from './updating-process-to-do-realisation.module.css';
import { useRef } from 'react';

export const UpdatingProcessTaskRealisation = ({
	goBackPage,
	currentToDoValue,
	setCurrentToDoValue,
	toDoId,
	setIsToDoInChangingProcess,
	tasksForUpdate,
	setTasksForUpdate,
}) => {
	const initialFieldValue = useRef(currentToDoValue);

	const onRequestUpdateToDo = (value) => {
		fetch(`http://localhost:3004/todos/${toDoId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				value,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача изменена ', response);

				const updatedTaskIndex = tasksForUpdate.findIndex(
					(task) => task.id === toDoId,
				);
				const copyTasks = [...tasksForUpdate];
				copyTasks[updatedTaskIndex] = response;
				setTasksForUpdate(copyTasks);
			});
	};

	return (
		<div className={styles.taskContainer}>
			<button
				name="getBackButton"
				type="button"
				className={styles.getBackButton}
				onClick={() => goBackPage(-1)}
			>
				←
			</button>
			<div className={styles.todoItem}>
				<input
					name="changingToDosField"
					type="text"
					value={currentToDoValue}
					onChange={({ target }) => setCurrentToDoValue(target.value)}
				/>
				<div>
					<button
						type="button"
						onClick={() => {
							setCurrentToDoValue(initialFieldValue.current);
							setIsToDoInChangingProcess(false);
						}}
					>
						Отменить
					</button>
					<button
						type="button"
						onClick={() => {
							setIsToDoInChangingProcess(false);
							onRequestUpdateToDo(currentToDoValue);
						}}
					>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	);
};
