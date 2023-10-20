import React from 'react'
import "./card.css"

function Card({ attendant }) {
	return (
		<article className="card">
			<h3>{attendant.name} {attendant.lastName}</h3>
			<p>{attendant.jobTitle}</p>
			<p>{attendant.age}</p>
		</article>
	)
}

export default Card