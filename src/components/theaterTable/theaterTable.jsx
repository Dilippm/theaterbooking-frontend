import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { gettheaters, gettheaterById,updateTheater } from '../../api/OwnerApi'; // Import your API functions
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateTheaterModal from '../../components/theater/UpdateTheater'; // Import your AddTheaterModal component

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TheaterTable({ refresh }) {
  const token = useSelector((state) => state.user?.token);
  const id = useSelector((state) => state.user?.user?.id);
const [theaterid,setTheaterId] = useState('')
  const [theaters, setTheaters] = useState([]); // State to store theater data
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [selectedTheater, setSelectedTheater] = useState(null); // State to store selected theater data

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await gettheaters(id, token); // Call the API
        setTheaters(response); // Update the state with the fetched data
        console.log(response)
      } catch (error) {
        console.error("Failed to fetch theaters:", error);
      }
    };

    fetchTheaters(); // Call the function when the component mounts
  }, [token, id, refresh]);

  const handleEdit = async (theaterId) => {
    try {
      setTheaterId(theaterId)
      const response = await gettheaterById(theaterId, token); // Fetch theater data by ID
      setSelectedTheater(response); // Set selected theater data
      setModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Failed to fetch theater details:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTheater(null);
  };
  const handleUpdate = async (theaterData) => {
    try {
      await updateTheater(theaterData, token, theaterid); // Call the update function
      console.log('Updated theater data:', theaterData);
      // Refresh theaters list or update state if needed
      const response = await gettheaters(id, token); // Refresh theater list
      setTheaters(response);
      handleCloseModal(); // Close the modal after submission
    } catch (error) {
      console.error('Error updating theater:', error);
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Theater Name</StyledTableCell>
              <StyledTableCell align="right">Seats</StyledTableCell>
              <StyledTableCell align="right">Rows</StyledTableCell>
              <StyledTableCell align="right">Columns</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Show Timings</StyledTableCell>
              <StyledTableCell align="right">Place</StyledTableCell>
              <StyledTableCell align="right">State</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {theaters.map((theater) => (
              <StyledTableRow key={theater.id}>
                <StyledTableCell component="th" scope="row">
                  {theater.TheaterName}
                </StyledTableCell>
                <StyledTableCell align="right">{theater.Seats}</StyledTableCell>
                <StyledTableCell align="right">{theater.Rows}</StyledTableCell>
                <StyledTableCell align="right">{theater.Columns}</StyledTableCell>
                <StyledTableCell align="right">
                  {Object.entries(theater.Price).map(([key, value]) => (
                    <div key={key}>{`${key}: ${value}`}</div>
                  ))}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {theater.ShowTimings.map((timing, index) => (
                    <div key={index}> {new Date(timing).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      timeZone: 'UTC' 
                    })}</div>
                  ))}
                </StyledTableCell>
                <StyledTableCell align="right">{theater.Place}</StyledTableCell>
                <StyledTableCell align="right">{theater.State}</StyledTableCell>
                <StyledTableCell align="right" sx={{display:'flex', cursor:'pointer'}}>
                  <EditIcon
                    sx={{ color: 'blue' }}
                    onClick={() => handleEdit(theater.ID)} // Trigger handleEdit on click
                  />
                  <DeleteIcon sx={{ color: 'red' }} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {modalOpen && (
        <UpdateTheaterModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleUpdate={handleUpdate} // Pass handleUpdate function
        initialData={selectedTheater} // Pass the selected theater data to populate the form
      />
      )}
    </>
  );
}
