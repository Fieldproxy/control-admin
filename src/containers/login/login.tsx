import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LoginImage from "../../assets/images/login.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootStoreI } from "../../redux/reducers";
import { useHistory, useLocation } from "react-router-dom";
import {  validateError , signInToPortal} from "../../redux/actions/authenticate";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

type locationI = { 
  state: {
    from: {
      pathname: string;
    };
  };
};

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  let location: locationI = useLocation();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const setError = (message: string) => {
    dispatch(validateError(message));
  };

  const submitForm = () => {
    if (username === "" || password === "") {
      return setError("Fields are required");
    }
    dispatch(signInToPortal({username, password}));
  };

  const { isLoggedIn, loadingLogIn, error } = useSelector(
    (state: RootStoreI) => state.auth
  );

  const takeToTheDashboard = () => {
    let from = { pathname: "/dashboard" };
    if (location.state.from.pathname !== "/") {
      from = location.state.from;
    }
    history.replace(from);
  };

  useEffect(() => {
    if (isLoggedIn) {
      takeToTheDashboard();
    }
  }, [isLoggedIn]);

  return (
    <div className="login-container">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={LoginImage}
            title="Login welcome"
          />
          <CardContent>
            <form>
              <Typography variant="h5" style={{ marginBottom: 8 }}>
                Login
              </Typography>
              <TextField
                label="username"
                variant="outlined"
                fullWidth
                style={{ marginBottom: 10 }}
                className="form-input"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                style={{ marginBottom: 10 }}
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                disabled={loadingLogIn}
                fullWidth
                className="form-input"
                size="large"
                onClick={submitForm}
              >
                {loadingLogIn ? "Logging in..." : "Login"}
              </Button>

              {error && error.message && (
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  severity="error"
                  onClick={() => setError("")}
                >
                  {error.message}
                </MuiAlert>
              )}
            </form>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Login;
