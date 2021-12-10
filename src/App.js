import React, { useState, useEffect } from 'react';
import './App.css';
import Pagination from './components/Pagination';
import ButtonTheme from './components/ButtonTheme';

function App() {

	return (
		<div>
			<ButtonTheme />
			<Pagination />
		</div>
	);
}

export default App;
