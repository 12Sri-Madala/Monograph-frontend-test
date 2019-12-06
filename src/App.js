import React, { useState } from 'react';
import './App.css';
import Header from './Header.js';
import Form from './Form.js';
import Preview from './Preview.js';
import './Mobile.css';

function App() {

	const [formArea, setFormArea] = useState({});

	/**
	 * changeForm is called when there are changes in the user feedback form. Captures the changes and 
	 * passes them down to the preview component to maintain sync between Form and Preview
	 * @param: Input field values from user feedback form
	 * @returns none
	 */
	const changeForm = (textFeedback, partyCount, emoji, gif) => {
		setFormArea({
			...formArea,
			textFeedback,
			partyCount,
			emoji,
			gif
		});
	}

	return (
		<div className="app">
			<div className="header-container">
				<Header />
			</div>
			<main className="app-main">
				<section className="app-left">
					<Form onChange={changeForm} />
				</section>
				<section className="app-right">
					<Preview feedbackPreview={formArea} />
				</section>
			</main>
		</div>
	);
}

export default App;
