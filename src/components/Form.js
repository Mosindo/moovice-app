import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Form = () => {
	const [moviesData, setMoviesData] = useState([]);

	useEffect(() => {
		axios
			.get(`https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=star`)
			.then((res) => setMoviesData(res.data.results));
	}, []);

	return (
		<div className="form-component">
			<div className="form-container">
				<form>
					<input type="text" placeholder="Enter a movie title" id="search-input" />
					<input type="submit" value="Search" />
				</form>

				<div className="btn-sort-container">
					<div className="btn-sort" id="goodToBad">
						Top<span>➜</span>
					</div>
					<div className="btn-sort" id="badToGood">
						Flop<span>➜</span>
					</div>
				</div>
			</div>
			<div className="result">
				{moviesData.map((movie) => (
					<Card key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default Form;
