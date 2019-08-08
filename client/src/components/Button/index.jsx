import React from 'react';
import './style.css';

export default function Button({ buttonLabel, buttonClass, hoverTitle, buttonWidth }) {
	
	return (
		<div>
			<button  title={hoverTitle} className={buttonClass} type="submit" style={{ width: buttonWidth }}>
				{buttonLabel}
			</button>
		</div>
	);
}
