import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Picker from 'emoji-picker-react';
import './Form.css';

/**
 * Form - React Functional Component 
 * @param {function} onChange captures the current state of each input field and passes it to the parent App component 
 * which passes the changes down to the Preview component
 * @returns JSX elements to create a feedback form 
 */
function Form(props) {

	const [textFeedback, setTextFeedback] = useState("Let us know what we did well or could improve...");
	const [partyCountFeedback, setPartyCountFeedback] = useState(2);
	const [chosenEmoji, setChosenEmoji] = useState("😄");
	const [gifKeyword, setGifKeyword] = useState("Tasty");
	const [offset, setOffset] = useState(0);
	const [gifs, setGifs] = useState([]);
	const [selectedGif, setSelectedGif] = useState();

	useEffect(() => {
		props.onChange(textFeedback, partyCountFeedback, chosenEmoji.emoji, selectedGif);
	}, [textFeedback, partyCountFeedback, chosenEmoji, selectedGif]);

	/**
	 * Event handlers to save the values of each populated field to the state
	 * @param event A reference to the input field which captures its current value
	 * @returns none
	 */
	const handleEmojiClick = (event, emoji) => {
		setChosenEmoji(emoji);
	}

	const handleTextChange = (event) => {
		setTextFeedback(event.target.value);
	}

	const handlePartyChange = (event) => {
		const partyCount = parseInt(event.target.value);
		setPartyCountFeedback(partyCount);
	}

	const handleKeywordChange = (event) => {
		setGifKeyword(event.target.value);
	}

	const handleGifClick = (event) => {
		setSelectedGif(event.target.src);
	}

	/**
	 * API call to Giphy that generates 2 gifs.
	 * The gifs are saved to the state and the offset is increased by 2 so that new results are generated with each click.
	 * @param event that triggers the function to run
	 * @returns none
	 */
	const generateGifs = (event) => {
		event.preventDefault();
		const keywordQuery = gifKeyword.toLowerCase() || "tasty";
		fetch(`/api/giphySearch?q=${keywordQuery}&offset=${offset}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				const gif1URl = responseJson.data[0].images.original.url;
				const gif2URL = responseJson.data[1].images.original.url;
				setGifs([gif1URl, gif2URL]);
			})

		setOffset(offset + 2);
	}

	/**
	 * Function maps through the gif URLs stored in state to generate images 
	 * @param: none
	 * @returns Image elements
	 */
	const populateImages = () => {
		return gifs.map((gifURL, index) => (
			<img className="gif-image" src={gifURL} alt={gifKeyword} onClick={handleGifClick} key={index}></img>
		))
	}

	return (
		<div className="form">
			<label className="form-label">Your feedback</label>
			<textarea className="form-textarea"
				name="feedback"
				rows="4"
				onChange={handleTextChange}
				placeholder={textFeedback}
			/>

			<label className="form-label">How many in your party?</label>
			<input className="form-input"
				type="number"
				name="party"
				min="1"
				onChange={handlePartyChange}
				placeholder={partyCountFeedback}
			/>
			<div className="emoji-gif">
				<div className="emoji">
					<label className="form-label">How was your meal?</label>
					<div className="emoji-selector">
						{
							chosenEmoji
								? (<div><span>You chose:</span> <span className="feedback-emoji">{chosenEmoji.emoji}</span></div>)
								: <span>No emoji Chosen</span>
						}
						<Picker onEmojiClick={handleEmojiClick} />
					</div>
				</div>
				<div className="gif">
					<form id="query-form" onSubmit={generateGifs}>
						<label className="form-label">Gif Keyword:</label>
						<input className="query-input"
							name="query"
							type="text"
							onChange={handleKeywordChange}
							placeholder={gifKeyword}
						/>
						<input className="query-submit" type="submit" value="Generate" />
					</form>
					{populateImages()}
				</div>
			</div>

		</div>
	);
}

Form.propTypes = {
	onChange: PropTypes.func
}

export default Form;
