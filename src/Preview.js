import React from 'react';
import { PropTypes } from 'prop-types';
import './Preview.css';

/**
 * Preview - React Functional Component 
 * @param {object} feedbackPreview contains the form values with the selected emoji and gif to populate the preview
 * @returns JSX elements to create a preview of user's review 
 */
function Preview(props) {
	const { textFeedback, partyCount, emoji, gif } = props.feedbackPreview


	/**
	 * Functions to alter preview text and number based on provided values
	 * @param: none
	 * @returns text/number
	 */
	const partyCountText = () => {
		if (partyCount == 1) return "person dined here"
		return "people dined here"
	}

	const partyCounter = () => {
		if (partyCount < 1) return 0
		return partyCount || 2
	}

	const defaultGif = "https://media0.giphy.com/media/Bo1hlNIkt9NgnA3ZDr/giphy.gif?cid=790b7611d55e93a1b5f8405429a0fa1beb1c0d5a9bbd27f8&rid=giphy.gif"

	return (
		<section className="preview">
			<div className="preview-label">Preview of your review</div>
			<div className="preview-content">
				<div className="preview-emoji-gif">
					<div className="emoji-border">
						<div className="preview-emoji">
							{emoji || "😄"}
						</div>
					</div>
					<div className="gif-content">
						<img className="preview-gif-image" src={gif || defaultGif} alt="Gif" />
					</div>
				</div>

				<div className="preview-feedback">
					<div>
						{textFeedback || "Let us know what we did well or could improve..."}
					</div>
				</div>
				<div className="preview-party">
					<div className="party-count">
						{partyCounter()}
					</div>
					<div>
						{partyCountText()}
					</div>
				</div>
			</div>
		</section>
	);
}



Preview.propTypes = {
	feedbackPreview: PropTypes.shape({
		textFeedback: PropTypes.string,
		partyCount: PropTypes.number,
		emoji: PropTypes.string,
		gif: PropTypes.string
	})
}

export default Preview;
