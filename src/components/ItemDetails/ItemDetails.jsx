import { useHistory, useParams } from 'react-router-dom'
import { Paper, Box } from '@mui/material';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField } from '@mui/material'
import Moment from "react-moment";
import moment from 'moment'

function ItemDetails(){

  const currentItem = useSelector(store => store.items.currentItem)
  const dispatch = useDispatch();
  const itemID = useParams();
  const history = useHistory();
  const [fieldLocked, setFieldLocked] = useState(true);
  const date = moment(currentItem.warranty_expiration)
  console.log('date is', moment(date).format('MMM Do YYYY'))

  useEffect(() => {
    refresh(itemID.id)
  }, [dispatch]);

  const refresh = () => {
    dispatch({type: 'FETCH_CURRENT_ITEM', payload: itemID.id})
  }

  return (
    <div className="itemDetailsContainer">
      <button className="btn" onClick={() => history.goBack()}>
        Back
      </button>
      <button className="editItembtn" onClick={() => history.goBack()}>
        Edit Item
      </button>
      <div className="itemDetailsDataContainer">
        <Box
        sx={{textAlign: 'center', maxWidth: '100%', paddingLeft: '20px', paddingRight: '20px', boxShadow: 2}}
        component={Paper}
        >
          <h2 className='itemDetailsHeader'>Item Details for {currentItem.item_name}</h2>
          Name:
          <TextField
           disabled={fieldLocked}
           size='small'
           sx={{margin: '5px'}}
           id="standard-disabled"
           label="Name"
           defaultValue={currentItem.item_name}
          />
          <br></br>
        </Box>
      </div>
    </div>
  )
}

export default ItemDetails;