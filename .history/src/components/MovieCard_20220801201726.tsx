import { Clock, Star } from "react-feather";

import "../styles/movie-card.scss";

interface MovieCardProps {
  title: string;
  poster: string;
  rating: string;
  runtime: string;
}

export function MovieCard(props: MovieCardProps) {
  var ratingInNumber = parseFloat(props.rating);
  var ratingGreen = ratingInNumber >= 8 && ratingInNumber <= 9;
  var ratingYellow = ratingInNumber >= 5 && ratingInNumber <= 7;
  var ratingRed = ratingInNumber >= 0 && ratingInNumber <= 4.99;

  return (
    <div className="movie-card">
      <img
        src={props.poster}
        alt={props.title}
      />

      <div>
        <div className="movie-info">
          <span>{props.title}</span>
          <div className="meta">
            <div>
            <Star color='green'/>



              {ratingGreen && (
                <Star color='green'/>
              )}
              {ratingYellow && (
                <Star color='yellow'/>
              )} 
              {ratingRed && (
                <Star color='red'/>
              )}
              
            </div>

            <div>
              <Clock /> {props.runtime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
