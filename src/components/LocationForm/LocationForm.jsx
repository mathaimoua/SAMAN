import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function LocationForm() {
  const history = useHistory();
  const [locationName, setLocationName] = useState("");
  const errors = useSelector((store) => store.errors);
  const location = useSelector((store) => store.locations);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (locationName === "") {
      return -1;
    } else {
      if (location.main === {} || location.main === "") {
        dispatch({ type: "ADD_FIRST_LOCATION", payload: locationName });
        history.push('/locations')
      } else {
        dispatch({ type: "ADD_LOCATION", payload: locationName });
        history.push("/locations");
      }
    }
  };

  return (
    <div className="locationFormDiv">
      <form className="locationForm" onSubmit={handleSubmit}>
        <h2>Add New Location</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div>
          <label htmlFor="location name">
            Name:
            <input
              type="text"
              name="location name"
              required
              value={locationName}
              onChange={(event) => setLocationName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="submit" />
        </div>
      </form>
    </div>
  );
}

export default LocationForm;
