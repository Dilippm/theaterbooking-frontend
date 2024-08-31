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
import { getMovies,getMovieById,updateMovie } from '../../../api/movieApi'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateMovieModal from '../movieModal/updateModal';
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

export default function MovieTable({ refresh }) {
  const token = useSelector((state) => state.user?.token);
  const id = useSelector((state) => state.user?.user?.id);
  const [movieId, setMovieId] = useState('');
  const [movies, setMovies] = useState([]); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await getMovies(token); 
        setMovies(response);
        console.log(response);
      } catch (error) {
        console.error('Failed to fetch theaters:', error);
      }
    };

    fetchTheaters();
  }, [token, refresh]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will format the date as MM/DD/YYYY or based on your locale
  };

  const handleEdit = async (movieID) => {
    try {
      setMovieId(movieID);
      const response = await getMovieById(movieID, token); 
      setSelectedTheater(response);
      setModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch theater details:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTheater(null);
  };

  const handleUpdate = async (movieData,uploadResult) => {
    try {
      const formattedData = {
        movieName: movieData.movieName,
        description: movieData.description,
        language: movieData.language,
        releaseDate: movieData.releaseDate,
        genre: movieData.genre,
        image: uploadResult ?? movieData.image,
        trailerId: movieData.trailerId,
      };
      await updateMovie(formattedData, token, movieId); 
      console.log('Updated theater data:', movieData);
      const response = await getMovies(token); 
      setMovies(response);
      handleCloseModal();
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
              <StyledTableCell>Movie Name</StyledTableCell>
              <StyledTableCell >Language</StyledTableCell>
              <StyledTableCell>Release Date</StyledTableCell>
              <StyledTableCell >Genre</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <StyledTableRow key={movie.ID}>
                <StyledTableCell component="th" scope="row">
                  {movie.MovieName}
                </StyledTableCell>
                <StyledTableCell >{movie.Language}</StyledTableCell>
                <StyledTableCell >
                  {formatDate(movie.ReleaseDate)}
                </StyledTableCell>
                <StyledTableCell >{movie.Genre}</StyledTableCell>
                <StyledTableCell component="th" scope="row" align="right" sx={{ display: 'flex', cursor: 'pointer'}}>
                  <EditIcon
                    sx={{ color: 'blue' }}
                    onClick={() => handleEdit(movie.ID)}
                  />
                  <DeleteIcon sx={{ color: 'red' }} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {modalOpen && (
        <UpdateMovieModal
          open={modalOpen}
          handleClose={handleCloseModal}
          handleUpdate={handleUpdate}
          initialData={selectedTheater}
        />
      )}
    </>
  );
}
