import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
	return (
		<div className={styles.root}>
			<span>:(</span>
			<h1>Ничего не найдено</h1>
			<div className={styles.description}>К сожалению, такая страница отсутствует</div>
		</div>
	);
};

export default NotFoundBlock;
