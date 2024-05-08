import React, { useState } from 'react';
// Import the useState hook from React

import axios from 'axios';
// Import axios for making HTTP requests

const Podcast = () => {
  // Define a functional component called Podcast
  const [albums, setAlbums] = useState([]);
  // Initialize state for albums using useState hook
  const [loading, setLoading] = useState(true);
  // Initialize state for loading status using useState hook

  const handleSearchTopAlbums = async () => {
    // Define a function to handle searching for top albums
    setLoading(true);
    // Set loading status to true to indicate data fetching is in progress
    try {
      // Start a try-catch block to handle errors
      const response = await axios.get('https://spotify23.p.rapidapi.com/search?type=album&q=album', {
        // Make a GET request to the Spotify API's search endpoint
        headers: {
          // Provide necessary headers including RapidAPI key and host
          'x-rapidapi-key': 'd65d099f81mshfb46b6e8c0d8ddfp16ee3bjsnc801f6cbf524',
          'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
      });

      if (response.data.results) {
        // Check if albums are found in the response
        const albumsData = response.data.results;
        // Extract albums data from the response
        const detailedAlbums = await Promise.all(
          // Use Promise.all to concurrently fetch details of each album
          albumsData.map(async (album) => {
            // Map over each album to fetch its details
            const albumResponse = await axios.get(`https://spotify23.p.rapidapi.com/album/${album.id}`, {
              // Make a GET request to the Spotify API's album endpoint
              headers: {
                // Provide necessary headers
                'x-rapidapi-key': 'd65d099f81mshfb46b6e8c0d8ddfp16ee3bjsnc801f6cbf524',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
              }
            });
            return albumResponse.data;
            // Return the detailed album data
          })
        );

        setAlbums(detailedAlbums);
        // Update state with detailed album data
      } else {
        setAlbums([]);
        // Set albums state to an empty array if no albums are found
      }
      setLoading(false);
      // Set loading status to false to indicate data fetching is complete
    } catch (error) {
      console.error('Error fetching album data:', error);
      setLoading(false);
      // Log error and set loading status to false in case of error
    }
  };

  return (
    <div>
      {/* Render a heading for the section */}
      <h2>Top Albums</h2>
      {/* Render a button to trigger the search for top albums */}
      <button onClick={handleSearchTopAlbums}>Search Top Albums</button>
      {/* Conditional rendering based on loading status */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Render albums data if loading is false
        <ul>
          {albums && albums.length > 0 ? (
            // Check if albums data exists and is not empty
            albums.map((album) => (
              // Map over each album and render its details
              <li key={album.id}>
                {/* Render album details */}
                <h3>{album.name}</h3>
                <p>Artist: {album.artist}</p>
                <p>Release Date: {album.release_date}</p>
                <p>Total Tracks: {album.total_tracks}</p>
                <img src={album.image} alt={album.name} />
                <a href={album.listen}>Listen on Spotify</a>
              </li>
            ))
          ) : (
            // Render a message if no albums are found
            <p>No albums found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Podcast;
