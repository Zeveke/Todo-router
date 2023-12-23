import styles from './todos-search.module.css';
import { useState } from 'react';

export const ToDosSearch = ({ setConfirmedSearchValue }) => {
	const [currentSearchFieldValue, setCurrentSearchFieldValue] = useState('');

	return (
		<div className={styles.searchContainer}>
			<input
				name="searchingToDosField"
				type="text"
				value={currentSearchFieldValue}
				placeholder="Введите текст для поиска..."
				onChange={({ target }) => setCurrentSearchFieldValue(target.value)}
			/>
			<div>
				<button
					type="button"
					onClick={() => {
						if (currentSearchFieldValue) {
							setConfirmedSearchValue(currentSearchFieldValue);
						} else {
							alert('Введите текст для поиска');
							setConfirmedSearchValue('');
						}
					}}
				>
					Искать
				</button>
				<button
					type="button"
					onClick={() => {
						setCurrentSearchFieldValue('');
						setConfirmedSearchValue('');
					}}
				>
					Очистить
				</button>
			</div>
		</div>
	);
};
