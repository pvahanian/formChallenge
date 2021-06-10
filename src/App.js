import { useState, useEffect } from "react";
import { TextField, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import "./App.css";

function App() {

  const defaultObj = {
    id: 1,
    name: "",
    email: "",
    birthDate: "",
    emailConsent: false,
  };

  //Gets the current day in "year-month-day" format to set max date
  let dateHolder = new Date();
  let dd = String(dateHolder.getDate()).padStart(2, '0');
  let mm = String(dateHolder.getMonth() + 1).padStart(2, '0')
  let yyyy = dateHolder.getFullYear();
  let today = yyyy + '-' + mm + '-' + dd


  const [input, setInput] = useState(defaultObj);
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (validateForm(input)) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [input]);

  const myChangeHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const validateForm = (values) => {
    const validateEmail = (email) => {
      const regExpression =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regExpression.test(String(email).toLowerCase());
    };
    if (values.name.length > 0 && values.emailConsent) {
      return validateEmail(values.email);
    }
  };

  function clearForm() {
    //Tried multiple ways of not using this dom manipulation but couldn't get it. Refactor Possible
    document.getElementById("checkBox").checked = false;
    setInput(defaultObj);
    setBtnDisabled(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
      fetch("https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users", {
        method: "POST",
        body: JSON.stringify(input),
      }).then((res) => {
        console.log("Request complete! response:", res);
        clearForm();
        document.getElementById("success").style.display="block";
      });
  };

  return (
    <>
    <form id="myform" onSubmit={handleSubmit}>
      <Paper id="App">
        <h1>Contact Us</h1>
        <p>Enter your name:</p>
        <TextField
          id="nameHolder"
          required
          type="text"
          name="name"
          value={input.name}
          onChange={myChangeHandler}
        />
        <p>Enter your email:</p>
        <TextField
          required
          id="emailHolder"
          type="email"
          name="email"
          value={input.email}
          onChange={myChangeHandler}
        />
        <p>Enter your birth date:</p>
        <input
          id="date"
          name="birthDate"
          type="date"
          //This can be set to 
          max={today}
          value={input.birthDate}
          onChange={myChangeHandler}
        />
        <div id="holder"></div>
        <div id="contacted">
          <input
            type="checkbox"
            id="checkBox"
            onClick={() =>
              setInput({ ...input, emailConsent: !input["emailConsent"] })
            }
          />
          <label>I agree to be contacted </label>
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          id="myBtn"
          disabled={btnDisabled}
        >
          Submit
        </Button>
        <Button variant="contained" color="primary" onClick={clearForm}>
          Clear Form
        </Button>
      </Paper>
    </form>
    <div id="success">Successfully Submitted</div>
    </>
  );
}
export default App;
