import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Form = () => {
	const [moviesData, setMoviesData] = useState([]);
	const [search, setSearch] = useState('code');
	const [sortTopFlop, setSortTopFlop] = useState(null);

	useEffect(() => {
		axios
			.get(`https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${search}`)
			.then((res) => setMoviesData(res.data.results));
	}, [search]);

	return (
		<div className="form-component">
			<div className="form-container">
				<form>
					<input
						type="text"
						placeholder="Enter a movie title"
						id="search-input"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<input type="submit" value="Search" />
				</form>

				<div className="btn-sort-container">
					<div className="btn-sort" id="goodToBad" onClick={() => setSortTopFlop('topToFlop')}>
						Top<span>➜</span>
					</div>
					<div className="btn-sort" id="badToGood" onClick={() => setSortTopFlop('flopToTop')}>
						Flop<span>➜</span>
					</div>
				</div>
			</div>
			<div className="result">
				{moviesData
					.slice(0, 12)
					.sort((a, b) => {
						if (sortTopFlop === 'topToFlop') {
							return b.vote_average - a.vote_average;
						} else if (sortTopFlop === 'flopToTop') {
							return a.vote_average - b.vote_average;
						}
					})
					.map((movie) => (
						<Card key={movie.id} movie={movie} />
					))}
			</div>
		</div>
	);
};

export default Form;
