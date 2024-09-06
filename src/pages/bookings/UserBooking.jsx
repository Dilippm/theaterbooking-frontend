import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getBookingDetails } from "../../api/BookingApi";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Modal, Button, Box, Typography } from "@mui/material";
import "./UserBooking.css";

const UserBooking = () => {
  const token = useSelector((state) => state.user?.user.id);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        if (token) {
          const details = await getBookingDetails(token);
          setBookings(details);
        }
      } catch (err) {
        setError("Failed to fetch booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [token]);

  const handleCardClick = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleDownloadPdf = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('booking-ticket.pdf');
    });
  };

  return (
    <div className="booking-container">
      <h1>Bookings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking.ID}
            className="booking-card"
            onClick={() => handleCardClick(booking)}
          >
            {/* First line: Movie name and theater */}
            <div className="booking-header">
              <h2>
                <strong style={{ color: "black" }}>Movie:</strong> {booking.Movie}
              </h2>
              <p className="theater-name">
                <strong style={{ color: "black" }}>Theater:</strong> {booking.Theater}
              </p>
            </div>

            {/* Second line: Date, seats, and time */}
            <div className="booking-details">
              <p>
                <strong style={{ color: "black" }}>Date:</strong> {booking.Date} |{" "}
                <strong style={{ color: "black" }}>Time:</strong> {new Date(booking.Time).toLocaleTimeString()} |{" "}
                <strong style={{ color: "black" }}>Seats:</strong> {booking.SelectedSeats.join(", ")}
              </p>
            </div>

            {/* Third line: Payment ID */}
            <div className="booking-payment-id">
              <p>
                <strong style={{ color: "black" }}>Payment ID:</strong> {booking.PaymentId}
              </p>
            </div>

            {/* Price */}
            <div className="booking-price">
              <p>
                <strong style={{ color: "black" }}>Price: </strong>₹{booking.Price}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}

      {/* Modal for viewing ticket and downloading PDF */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ color: 'white' ,fontWeight:'bold' }}>
            Ticket Details
          </Typography>
          {selectedBooking && (
            <div id="pdf-content" style={{ color: '#333333' }}>
              <p ><strong  style={{ color: "black" }}>Movie:</strong> {selectedBooking.Movie}</p>
              <p><strong style={{ color: "black" }}>Theater:</strong> {selectedBooking.Theater}</p>
              <p><strong style={{ color: "black" }}>Date:</strong> {selectedBooking.Date}</p>
              <p><strong style={{ color: "black" }}>Time:</strong> {new Date(selectedBooking.Time).toLocaleTimeString()}</p>
              <p><strong style={{ color: "black" }}>Seats:</strong> {selectedBooking.SelectedSeats.join(", ")}</p>
              <p><strong style={{ color: "black" }}>Payment ID:</strong> {selectedBooking.PaymentId}</p>
              <p><strong style={{ color: "black" }}>Price:</strong> ₹{selectedBooking.Price}</p>
            </div>
          )}
          <Button variant="contained" color="primary" onClick={handleDownloadPdf}>
            Download Ticket as PDF
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#578a73', // Forest green background
  display: 'flex',
  flexDirection: 'column', // Corrected property name
  alignItems: 'center',
  border: '2px solid #000',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)', // 3D effect shadow
  padding: '16px', // Changed 'p' to 'padding'
};



export default UserBooking;
