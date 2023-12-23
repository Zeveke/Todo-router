import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DefaultTaskRealisation } from './types-of-task-realisation/default-todo-realisation/default-todo-realisation';
import { UpdatingProcessTaskRealisation } from './types-of-task-realisation/updating-process-task-realisation/updating-process-task-realisation';

export const AllAboutTask = ({ task, tasks, setTasks }) => {
	const [actualToDoValue, setActualToDoValue] = useState(task.value);
	const [IsToDoInModificationProcess, setIsToDoInModificationProcess] = useState(false);

	const navigate = useNavigate();

	return !IsToDoInModificationProcess ? (
		<DefaultTaskRealisation
			goBackPage={navigate}
			currentToDoValue={actualToDoValue}
			setIsToDoInChangingProcess={setIsToDoInModificationProcess}
			toDoId={task.id}
			tasksForDefault={tasks}
			setTasksForDefault={setTasks}
		/>
	) : (
		<UpdatingProcessTaskRealisation
			goBackPage={navigate}
			currentToDoValue={actualToDoValue}
			setCurrentToDoValue={setActualToDoValue}
			toDoId={task.id}
			setIsToDoInChangingProcess={setIsToDoInModificationProcess}
			tasksForUpdate={tasks}
			setTasksForUpdate={setTasks}
		/>
	);
};

/*

*/
