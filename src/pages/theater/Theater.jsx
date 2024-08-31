import React, { useState } from 'react';
import { TheaterTable } from '../../components';
import AddTheaterModal from '../../components/theater/AddTheater';
import { Button } from '@mui/material';
import { useSelector} from 'react-redux';
import { addtheater } from '../../api/OwnerApi'; // Import your API function
// Inline styles
const styles = {
  container: {
    backgroundColor: '#e0f2f1', // Light green shade
    padding: '20px',
    minHeight: '100vh',
    position: 'relative',
  },
  button: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color:'white',
    backgroundColor:'black'
  },
  tableContainer: {
    marginTop: '60px', // Space to ensure the table is below the button
  },
};

const Theater = () => {
  const token = useSelector((state) => state.user?.token);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSubmit = async(theaterData) => {
    try {
      // Convert `prices` from array of objects to a map
      const pricesMap = theaterData.prices.reduce((acc, { name, amount }) => {
        acc[name] = parseFloat(amount) || 0;
        return acc;
      }, {});
  
      // Convert `showTimings` to ISO 8601 format if needed
      // Here we'll just ensure it's a valid array of strings
      const showTimingsArray = theaterData.showTimings.map(time => {
        return new Date(`1970-01-01T${time}:00Z`).toISOString();
      });
  
      const formattedData = {
        theaterName: theaterData.theaterName,
        ownerId: theaterData.ownerId, // Ensure this is correctly set
        place: theaterData.place,
        state: theaterData.state,
        movie: theaterData.movie || '', // Include movie if applicable
        rows: parseInt(theaterData.rows, 10),
        columns: parseInt(theaterData.columns, 10),
        seats: parseInt(theaterData.seats, 10),
        price: pricesMap,
        showTimings: showTimingsArray,
      };
      console.log(formattedData)
  
      // Call the API with the formatted data
      const response = await addtheater(formattedData, token);
       // Refresh the TheaterTable component
       setRefresh(prev => !prev); // Toggle the refresh state
      console.log('Theater added successfully:', response);
    
    } catch (error) {
      setError('Error adding theater. Please try again later.');
      console.error('Error adding theater:', error);
    }
  }
  return (
    <div style={styles.container}>
      <Button
        variant="contained"
      
        onClick={handleOpen}
        style={styles.button}
      >
        Add New Theater
      </Button>
      <AddTheaterModal
        open={modalOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <div style={styles.tableContainer}>
      <TheaterTable refresh={refresh} />
      </div>
    </div>
  );
}

export default Theater;
