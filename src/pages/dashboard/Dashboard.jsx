import React from 'react'
import './Dashboard.css'
import TrailerPlayer from '../../components/trailerPlayer/TrailerPlayer';
const Dashboard = () => {
  
  const trailerVideoId = '7TavVZMewpY';
  return (
   <div className="dashcontainer">
<div className="carousal">
  <TrailerPlayer videoId={trailerVideoId}/>
</div>

<div className="latest">
  Latest
</div>
<div className="movies">
  Movies
</div>
<div className="upcomming">
  Upcomming
</div>
   </div>
  )
  
}

export default Dashboard