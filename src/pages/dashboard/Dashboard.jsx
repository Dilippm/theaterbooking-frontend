import React ,{useState,useEffect} from 'react'
import './Dashboard.css'
import TrailerPlayer from '../../components/trailerPlayer/TrailerPlayer';
import { LatestMovie } from '../../components';
import { getLatestMovies } from '../../api/movieApi';
const Dashboard = () => {
  const [latestmovies, setlatestMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getLatestMovies();
      
        setlatestMovies(movieData.slice(0, 5)); // Limit to fit within the available space
      
      } catch (err) {
        setError('Failed to fetch latest movies');
        console.error(err);
      }
    };

    fetchMovies();
  }, []);
  const trailerVideoId = '7TavVZMewpY';
  return (
   <div className="dashcontainer">
<div className="carousal">
  <TrailerPlayer videoId={trailerVideoId}/>
</div>
<h2>Latest Movies</h2>
<div className="latest">

  <LatestMovie movies={latestmovies}/>
</div>
<h2>Movies</h2>
<div className="movies">
 <LatestMovie movies={latestmovies}/>
</div>
<div className="upcomming">
  Upcomming
</div>
   </div>
  )
  
}

export default Dashboard