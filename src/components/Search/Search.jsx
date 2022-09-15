import { useParams, useHistory} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";

import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";

function Search() {
  const dispatch = useDispatch();
  const paramID = useParams();
  const searchResults = useSelector((store) => store.items.searchResults);
  console.log(paramID);
  const history = useHistory();

  const handleItemClick = (locID, containerID, itemID) => {
    history.push(`/${locID}/${containerID}/details/${itemID}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch({ type: "SEARCH_ITEMS", payload: paramID.string });
  }, [dispatch]);

  return (
    <div className="searchContainer">
      <h2>Search results for "{paramID.string}"</h2>
      <div className="searchDataContainer">
        <TableContainer
          sx={{ maxWidth: "100%", marginTop: "0px", boxShadow: 2 }}
          component={Paper}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#fa8072" }}>
                <TableCell
                  onClick={() => {
                    handleSort("item_name");
                  }}
                  sx={{ minWidth: 100, fontWeight: "bold", fontSize: "12pt" }}
                >
                  Item Name
                </TableCell>
                <TableCell
                  sx={{ minWidth: 100, fontWeight: "bold", fontSize: "12pt" }}
                >
                  Container
                </TableCell>
                <TableCell
                  sx={{ minWidth: 100, fontWeight: "bold", fontSize: "12pt" }}
                >
                  State
                </TableCell>
                <TableCell
                  sx={{ minWidth: 100, fontWeight: "bold", fontSize: "12pt" }}
                >
                  Date Added
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((item) => (
                <TableRow
                  hover
                  key={item.item_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <button
                      className="btn_asLinkTables"
                      onClick={() =>
                        handleItemClick(
                          item.location_id,
                          item.container_id,
                          item.item_id
                        )
                      }
                    >
                      {item.item_name}
                    </button>
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
    </div>
  );
}

export default Search;
