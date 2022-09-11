import { useHistory } from 'react-router-dom'

function ItemDetails(){

  const history = useHistory();

  return (
    <div className="itemDetailsContainer">
      <button className="btn" onClick={() => history.goBack()}>
        Back
      </button>
      <div className="itemDetailsDataContainer">
      <h1>Details</h1>
      </div>
    </div>
  )
}

export default ItemDetails;