import styles from './default-todo-realisation.module.css';

export const DefaultTaskRealisation = ({
	goBackPage,
	currentToDoValue,
	setIsToDoInChangingProcess,
	toDoId,
	tasksForDefault,
	setTasksForDefault,
}) => {
	const onRequestDeleteToDo = () => {
		fetch(`http://localhost:3004/todos/${toDoId}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача удалена ', response);

				const copyTasks = [...tasksForDefault];
				const updatedTasks = copyTasks.filter(
					(copyTask) => copyTask.id !== toDoId,
				);
				setTasksForDefault(updatedTasks);
			});
	};

	return (
		<div className={styles.taskManager}>
			<button
				name="goBackButton"
				type="button"
				className={styles.goBackButton}
				onClick={() => goBackPage(-1)}
			>
				←
			</button>
			<div className={styles.taskPlot}>{currentToDoValue}</div>
			<div className={styles.buttonsBlock}>
				<button
					className={styles.todoText}
					type="button"
					onClick={() => setIsToDoInChangingProcess(true)}
				>
					Изменить
				</button>
				<button
					type="button"
					onClick={() => {
						onRequestDeleteToDo();
						goBackPage(-1);
					}}
				>
					Удалить
				</button>
			</div>
		</div>
	);
};
