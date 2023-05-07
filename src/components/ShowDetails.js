import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Form, Modal } from "react-bootstrap";
import "./css/modal.css";
import axios from "axios";

function ShowDetails() {
  // Get the `id` parameter from the URL using `useParams` hook
  const { id } = useParams();

  // State variables to hold the show data, booking form data and modal state

  const [show, setShow] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    showId: id,
  });
  const [showModal, setShowModal] = useState(false);

  // Fetch the show data using the `id` parameter from the TVMaze API
  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => setShow(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  // Event handler to update the booking form data when the user types in the form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingForm({ ...bookingForm, [name]: value });
  };

  // Event handler to submit the booking form data and show a success message
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("booking", JSON.stringify(bookingForm));
    setBookingForm({ name: "", email: "", phone: "", showId: id });
    setShowModal(false);
    alert("Booking successful!");
  };

  // Event handler to close the booking modal
  const handleModalClose = () => setShowModal(false);

  // Render JSX to display the show details and a booking form
  return (
    <div className="container">
      {/* Display the show details and booking button if the show data has been fetched */}
      {show ? (
        <div>
          <h1 className="text-center mb-4">{show.name}</h1>
          <div className="row">
            <div className="col-md-4 mb-4">
              <Card>
                <Card.Img variant="top" src={show.image?.medium} />
              </Card>
            </div>
            <div className="col-md-8 mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Summary</Card.Title>
                  <Card.Text>
                    {show.summary.replace(/<\/?[^>]+(>|$)/g, "")}
                  </Card.Text>
                  <hr />
                  <Card.Title>Details</Card.Title>
                  <Card.Text>
                    <strong>Status:</strong> {show.status}
                  </Card.Text>
                  <Card.Text>
                    <strong>Language:</strong> {show.language}
                  </Card.Text>
                  <Card.Text>
                    <strong>Runtime:</strong> {show.runtime} minutes
                  </Card.Text>
                  <Card.Text>
                    <strong>Genres:</strong> {show.genres.join(", ")}
                  </Card.Text>
                  <hr />
                  {/* Pop up the booking modal when the user clicks the "Book Ticket" button  */}
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    Book Ticket
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        // Show a loading message if the show data is being fetched
        <h1 className="text-center mb-4">Loading...</h1>
      )}

      {/* This modal displays the booking form when user clicks on Book Ticket button */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fs-2 mb-1">{show?.name}</p>
          <p className="mb-4">
            <strong>Language:</strong> {show?.language}
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={bookingForm.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={bookingForm.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                className="remove_arrows"
                type="number"
                name="phone"
                value={bookingForm.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button className="mt-4" variant="primary" type="submit">
              Book Ticket
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShowDetails;
