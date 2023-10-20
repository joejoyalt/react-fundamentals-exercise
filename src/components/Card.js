import React from 'react'

function Card({ attendant }) {
	return (
		<article className="center-text">
			<h3>{attendant.name}</h3>
			<p>{attendant.jobTitle}</p>
			<p>{attendant.age}</p>
		</article>
	)
}

export default Card