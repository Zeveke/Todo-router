import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DefaultTaskRealisation } from './types-of-task-realisation/default-todo-realisation/default-todo-realisation';
import { UpdatingProcessTaskRealisation } from './types-of-task-realisation/updating-process-task-realisation/updating-process-task-realisation';

export const AllAboutTask = ({ tasks, setTasks }) => {
	const params = useParams();
	const navigate = useNavigate();

	const [actualToDoValue, setActualToDoValue] = useState(null);
	const [IsToDoInModificationProcess, setIsToDoInModificationProcess] = useState(false);

	useEffect(() => {
		fetch(`http://localhost:3004/todos/${params.id}`)
			.then((loadedData) => loadedData.json())
			.then((loadedToDo) => {
				console.log('loadedToDo', loadedToDo);
				setActualToDoValue(loadedToDo.value);
			});
	}, [params.id]);

	return !IsToDoInModificationProcess ? (
		<DefaultTaskRealisation
			goBackPage={navigate}
			currentToDoValue={actualToDoValue}
			setIsToDoInChangingProcess={setIsToDoInModificationProcess}
			toDoId={params.id}
			tasksForDefault={tasks}
			setTasksForDefault={setTasks}
		/>
	) : (
		<UpdatingProcessTaskRealisation
			goBackPage={navigate}
			currentToDoValue={actualToDoValue}
			setCurrentToDoValue={setActualToDoValue}
			toDoId={params.id}
			setIsToDoInChangingProcess={setIsToDoInModificationProcess}
			tasksForUpdate={tasks}
			setTasksForUpdate={setTasks}
		/>
	);
};
