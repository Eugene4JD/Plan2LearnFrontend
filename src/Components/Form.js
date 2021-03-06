import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const Form = ({ resourceId }) => {
  const [quantity, setQuantity] = useState(0);
  const [dateFrom, setDateFrom] = useState("2021-01-01T10:30");
  const [dateTo, setDateTo] = useState("2021-01-02T10:30");
  const [message, setMessage] = useState("");

  const booking = {
    id: 0,
    dateFrom: dateFrom,
    dateTo: dateTo,
    BookedQuantity: quantity,
    resourceId: resourceId,
  };

  const refresh = () => {
    setQuantity(0);
    setDateTo("2021-01-02T10:30");
    setDateFrom("2021-01-01T10:30");
  };

  const onSubmit = async (event) => {
    event.preventDefault(event);
    try {
      const response = await axios.post(
        "https://localhost:5001/api/booking",
        booking
      );
      console.log(
        "EMAIL SENT TO admin@admin.com FOR CREATED BOOKING WITH ID " +
          response.data.id
      );

      setMessage("Success!");
      refresh();
    } catch (e) {
      setMessage(e.response.data);
      refresh();
    }
  };

  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);
  };
  const handleDateToChange = (e) => {
    setDateTo(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const classes = useStyles();
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={handleQuantityChange}
            id="quantity"
            placeholder="0"
          />
        </div>
        <div className="form-group">
          <TextField
            id="datetime-local-from"
            label="Date from"
            type="datetime-local"
            value={dateFrom}
            onChange={handleDateFromChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="form-group">
          <TextField
            id="datetime-local-to"
            label="Date to"
            type="datetime-local"
            value={dateTo}
            onChange={handleDateToChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <hr></hr>
        <div className="form-group">
          <button className="form-control btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
      <h1>{message}</h1>
    </div>
  );
};
export default Form;
