import {
  TextField,
  Typography,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/config";

export const AuthForm = styled("form")({
  width: "40%",
  padding: "1.5rem",
  background: "rgb(246,244,186)",
  background:
    "linear-gradient(141deg, rgba(246,244,186,1) 38%, rgba(223,247,50,1) 80%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  borderRadius: "1rem",
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        const user = await userCredential.user;
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
    await updateProfile(auth.currentUser, {
      displayName: user.displayName,
    }).then(() => {
      setLoading(false);
      navigate("/auth/login");
    });
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
      <Typography variant="h4" fontWeight={800} color="rebeccapurple">
        Register
      </Typography>
      <TextField
        name="displayName"
        label="Your name"
        fullWidth
        color="secondary"
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Email"
        fullWidth
        color="secondary"
        variant="outlined"
        onChange={handleChange}
      />
      <FormControl fullWidth variant="outlined" color="secondary">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          fullWidth
          name="password"
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleToggleShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button type="submit" variant="contained" color="secondary" fullWidth>
        Register
      </Button>
      {error && (
        <Typography variant="p" color="red">
          {error}
        </Typography>
      )}
      <Typography
        variant="p"
        color="secondary"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/auth/login")}
      >
        Already have a account ? Log in.
      </Typography>
    </AuthForm>
  );
};

export default Register;
