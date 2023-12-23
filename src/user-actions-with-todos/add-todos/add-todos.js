import styles from './add-todos.module.css';
import { useState } from 'react';

export const AddToDos = ({ tasks, setTasks }) => {
	const [fieldValue, setFieldValue] = useState('');

	const onRequestAddToDos = (event, value) => {
		if (value) {
			event.preventDefault();
			fetch('http://localhost:3004/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					value,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((response) => {
					console.log('Сообщение добавлено: ', response);
					setTasks([...tasks, response]);
					setFieldValue('');
				});
		} else {
			alert('Введите задачу');
			setFieldValue('');
			event.preventDefault();
		}
	};

	return (
		<div>
			<form
				className={styles.form}
				onSubmit={(event) => onRequestAddToDos(event, fieldValue)}
			>
				<input
					name="toDosField"
					placeholder="Введите задачу..."
					type="text"
					value={fieldValue}
					onChange={({ target }) => setFieldValue(target.value)}
				></input>
				<button type="submit">Создать новую задачу</button>
			</form>
		</div>
	);
};
