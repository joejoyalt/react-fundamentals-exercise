import React from 'react'

function Card({employer}) {
	return (
		<article className="center-text">
			<h3>{employer.name}</h3>
			<p>{employer.jobTitle}</p>
			<p>{employer.age}</p>
		</article>
	)
}

export default Card