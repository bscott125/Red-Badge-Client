import React from 'react'
import TicketDisplay from './TicketDisplay'
import './Ticket.css'


export default class Ticket extends React.Component {
 movies = [
	 {
		 url: "https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg",
		 name: "NO TIME TO DIE",
		 synopsis: "James Bond is enjoying a tranquil life in Jamaica after leaving active service. However, his peace is short-lived as his old CIA friend, Felix Leiter, shows up and asks for help. The mission to rescue a kidnapped scientist turns out to be far more treacherous than expected, leading Bond on the trail of a mysterious villain who's armed with a dangerous new technology.", 
		 id: 1,
		},
	{
		url: "https://m.media-amazon.com/images/I/81yY1bK3W5S._AC_SY879_.jpg",
		name: "HALLOWEEN KILLS",
		synopsis: "An injured Laurie Strode leads a vigilante mob to hunt down unstoppable killer Michael Myers and end his reign of terror once and for all.",
		id: 2,
	},
{
	  url: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F61116cea2313e8bae55a536a%2F-Dune-%2F0x0.jpg%3Ffit%3Dscale",
		name: "DUNE",
		synopsis: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence, only those who can conquer their own fear will survive.",
		id: 3,
	},
{
	url: "https://preview.redd.it/wt1vel35hqm51.jpg?auto=webp&s=ed0faf6976b4403b0774ddc6df2dbbc6ffaced86",
	name: "THE BATMAN",
	synopsis: "The Riddler plays a deadly game of cat and mouse with Batman and Commissioner Gordon in Gotham City.",
	id: 4,
},
{
	url: "https://m.media-amazon.com/images/M/MV5BNTQ5YjkyZWYtNzUyNC00MjM3LWFhNWUtNDcxNzNiZGFlNzI2XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
	name: "THE MATRIX RESURRECTIONS",
	synopsis: "Plagued by strange memories, Neo's life takes an unexpected turn when he finds himself back inside the Matrix.",
	id: 5,
}
 ]



	render(){
		return(
			<div>
				{this.movies.map(movie => 
				// <img src={movie.url}
				// alt={movie.name} 
				// width="325"
				// height="450" />
				// )}
				<TicketDisplay movie={movie}  />
				)}
			</div>
		)
	}
}