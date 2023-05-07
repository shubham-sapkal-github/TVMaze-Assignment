// Import necessary modules and components from React and React Bootstrap

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

// Define a functional component called "ShowList"

function ShowList() {
  // Declare and initialize a state variable called "shows" with an empty array
  const [shows, setShows] = useState([]);

  // Use the useEffect hook to make an HTTP GET request to the TVMaze API when the component mounts
  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => setShows(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Return JSX to render a list of TV shows
  return (
    <div className="container">
      <h1 className="text-center mb-4">TV Shows</h1>
      <div className="row">
        {/* Use the map method to iterate over the "shows" array and render a Bootstrap Card for each TV show */}
        {shows.map((show) => (
          <div className="col-md-4 mb-4" key={show.show.id}>
            {/* Render a Bootstrap Card for the TV show */}
            <Card>
              <Card.Img variant="top" src={show.show.image?.medium} />
              <Card.Body>
                {/* Render the name of the TV show */}
                <Card.Title>{show.show.name}</Card.Title>
                {/* Render the genre of the TV show */}
                <Card.Text>{show.show.genres.join(", ")}</Card.Text>
                <Card.Text>{show.show.rating.average}</Card.Text>
                {/* Render a link to view details about the TV show */}
                <Link to={`/show/${show.show.id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowList;
