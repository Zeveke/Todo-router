import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToDosSort } from './user-actions-with-todos/todos-sort/todos-sort';
import { ToDosSearch } from './user-actions-with-todos/todos-search/todos-search';
import { ToDosListOutput } from './todo-list-output/todo-list-output';
import { AddToDos } from './user-actions-with-todos/add-todos/add-todos';
import { AllAboutTask } from './all-about-task/all-about-task';
import { NotFoundPage } from './404page/404page';

export const App = () => {
	const [toDos, setToDos] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [isSortChecked, setIsSortChecked] = useState(false);

	useEffect(() => {
		const acceptCustomQuerySearchAndSort = (searchValue, isSortChecked) => {
			let request = '';

			if (searchValue) {
				request += `?q=${searchValue}`;
			}

			if (isSortChecked && searchValue) {
				request += '&_sort=value';
			} else if (isSortChecked) {
				request += '?_sort=value';
			}

			return request;
		};

		fetch(
			`http://localhost:3004/todos${acceptCustomQuerySearchAndSort(
				searchValue,
				isSortChecked,
			)}`,
		)
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				console.log('loadedToDos', loadedToDos);
				setToDos(loadedToDos);
			});
	}, [searchValue, isSortChecked]);

	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={
						<div className={styles.container}>
							<div className={styles.toDosItemList}>
								<h3 className={styles.header}>Лист задач</h3>
								<div className={styles.settings}>
									<ToDosSort
										checked={isSortChecked}
										setChecked={setIsSortChecked}
									/>
									<ToDosSearch
										setConfirmedSearchValue={setSearchValue}
									/>
								</div>
								<ToDosListOutput toDosList={toDos} />
							</div>
							<AddToDos tasks={toDos} setTasks={setToDos} />
						</div>
					}
				/>
				{toDos.map((toDo) => (
					<Route
						key={toDo.id}
						path={`/task/:id`}
						element={
							<AllAboutTask task={toDo} tasks={toDos} setTasks={setToDos} />
						}
					/>
				))}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};
