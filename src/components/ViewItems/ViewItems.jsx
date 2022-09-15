import Table from "@mui/material/Table";
import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField'
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Moment from 'react-moment'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function ViewItems(){

  const history = useHistory();
  const dispatch = useDispatch();
  const allItems = useSelector(store => store.items.allItems)

  const handleItemClick = (loc, con, itemid) => {
    history.push(`/${loc}/${con}/details/${itemid}`)
  }

  useEffect(() => {
    dispatch({type: 'FETCH_ALL_ITEMS'})
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [dispatch]);

  return(
    <div className="viewItemsContainer">
    <h3 className='recentlyAddedItemsHeader'>View All Items</h3>
      <TableContainer
        sx={{maxWidth: '100%', marginTop: '0px', boxShadow: 2}}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{backgroundColor: '#fa8072'}}>
              <TableCell onClick={() => {handleSort('item_name')}} sx={{minWidth: 100, fontWeight: 'bold', fontSize: '12pt'}}
              >Item Name
              </TableCell>
              <TableCell sx={{ minWidth: 100, fontWeight: 'bold', fontSize: '12pt' }}>
                Container
              </TableCell>
              <TableCell sx={{ minWidth: 100, fontWeight: 'bold', fontSize: '12pt' }}>
                State
              </TableCell>
              <TableCell sx={{ minWidth: 100, fontWeight: 'bold', fontSize: '12pt' }}>
                Date Added
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allItems.map((item) => (
              <TableRow
                hover
                key={item.item_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <button className="btn_asLinkTables" onClick={() => handleItemClick(item.location_id, item.container_id, item.item_id)}>{item.item_name}</button>
                </TableCell>
                <TableCell>{item.container_name}</TableCell>
                <TableCell>{item.state}</TableCell>
                <TableCell>
                  <Moment format="MMM Do YYYY">{item.date_added}</Moment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
  )
}

export default ViewItems;