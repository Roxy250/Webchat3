import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Verification from "./Verification";

export default function Registration() {
  const [userInfo, setUserInfo] = useState();
  const [display, setDisplay] = useState(true);

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisplay(false);
    axios
      .post("http://localhost:3000/api/user/register", userInfo)
      .then(async (response) => {
        alert(response.data.message);
        if (response.data.success) {
          setDisplay(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let timerId;
    if (!display) {
      timerId = setTimeout(() => {
        setDisplay(true);
      }, 2 * 60 * 1000); // 2 minutes in milliseconds
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [display]);

  const randomWallpaperUrl = () => {
    const wallpapers = [
      "https://source.unsplash.com/random?japan",
      // Add more wallpaper URLs here if needed
    ];
    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    return wallpapers[randomIndex];
  };

  return (
    <>
      {display ? (
        <div
          style={{
            backgroundImage: `url(${randomWallpaperUrl()})`,
            backgroundSize: "cover",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              height: "520px",
              width: "400px",
              backgroundColor: "rgba(255,255,255,0.13)",
              borderRadius: "10px",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.1)",
              boxShadow: "0 0 40px rgba(8,7,16,0.6)",
              padding: "50px 35px",
            }}
          >
            <h3
              style={{
                fontSize: "32px",
                fontWeight: "500",
                lineHeight: "42px",
                textAlign: "center",
              }}
            >
              Register
            </h3>
            <div>
              <label>Email:</label>
              <input
                type="text"
                required
                name="email"
                onChange={handleChange}
                style={{
                  display: "block",
                  height: "50px",
                  width: "100%",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderRadius: "3px",
                  padding: "0 10px",
                  marginTop: "8px",
                  fontSize: "14px",
                  fontWeight: "300",
                }}
              />
            </div>
            <div>
              <label>Username:</label>
              <input
                type="text"
                required
                name="username"
                onChange={handleChange}
                style={{
                  display: "block",
                  height: "50px",
                  width: "100%",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderRadius: "3px",
                  padding: "0 10px",
                  marginTop: "8px",
                  fontSize: "14px",
                  fontWeight: "300",
                }}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                required
                name="password"
                autoComplete="current-password"
                onChange={handleChange}
                style={{
                  display: "block",
                  height: "50px",
                  width: "100%",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderRadius: "3px",
                  padding: "0 10px",
                  marginTop: "8px",
                  marginBottom: "16px", // Added space after password input
                  fontSize: "14px",
                  fontWeight: "300",
                }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <label>Gender:</label>
              <input
                type="radio"
                value="female"
                name="gender"
                onChange={handleChange}
                style={{ marginLeft: "5px", marginRight: "5px" }} // Center radio buttons
              />
              <label>Female</label>
              <input
                type="radio"
                value="male"
                name="gender"
                onChange={handleChange}
                style={{ marginLeft: "5px", marginRight: "5px" }} // Center radio buttons
              />
              <label>Male</label>
            </div>
            <button
              type="submit"
              style={{
                marginTop: "20px",
                width: "100%",
                backgroundColor: "#ffffff",
                color: "#080710",
                padding: "15px 0",
                fontSize: "18px",
                fontWeight: "600",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
            <div>
              <Link
                to="/login"
                style={{
                  color: "#ffffff",
                  display: "block",
                  textAlign: "center",
                  marginTop: "20px",
                  textDecoration: "none",
                }}
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <Verification />
      )}
    </>
  );
}


// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import {Link} from 'react-router-dom';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { FormControlLabel, FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
// import { useState, useEffect } from 'react';
// import Verification from './Verification';
// import axios from 'axios';
// const defaultTheme = createTheme();

// export default function Registration() {
//   const [userInfo, setUserInfo] = useState();
//   const [display, setDisplay] = useState(true);

//   const handleChange = (event) => {
//     setUserInfo({...userInfo, [event.target.name]: event.target.value})
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setDisplay(false);
//     // Assuming you have some logic here to handle form submission
//     axios
//     .post("http://localhost:3000/api/user/register", userInfo)
//     .then(async (response) => {
//       alert(response.data.message);
//       if (response.data.success) {
//         setDisplay(false);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   };

//   useEffect(() => {
//     let timerId;
//     if (!display) {
//       // If display is false, set it back to true after 2 minutes
//       timerId = setTimeout(() => {
//         setDisplay(true);
//       }, 2 * 60 * 1000); // 2 minutes in milliseconds
//     }
//     return () => {
//       clearTimeout(timerId); // Clear the timer if component unmounts or if display changes before 2 minutes
//     };
//   }, [display]);

//   return (
//     <>
//       {display ? (
//         <ThemeProvider theme={defaultTheme}>
//           <Grid container component="main" sx={{ height: '100vh' }}>
//             <CssBaseline />
//             <Grid
//               item
//               xs={false}
//               sm={4}
//               md={7}
//               sx={{
//                 backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
//                 backgroundRepeat: 'no-repeat',
//                 backgroundColor: (t) =>
//                   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}
//             />
//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//               <Box
//                 sx={{
//                   my: 8,
//                   mx: 4,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
//                   <LockOutlinedIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                   Sign Up
//                 </Typography>
//                 <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     label="email"
//                     name="email"
//                     autoFocus
//                     onChange={handleChange}
//                     autoComplete="email"
//                   />
//                     <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     label="username"
//                     name="username"
//                     autoFocus
//                     onChange={handleChange}
//                     autoComplete="username"
//                   />
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     autoComplete='current-password'
//                     onChange={handleChange}
//                   />
//                    <FormControl sx={{ml:'5px',mt:'10px'}} >
//                     <FormLabel >Gender</FormLabel>
//                     <RadioGroup row name="gender" onChange={handleChange}>
//                         <FormControlLabel value="female"  control={<Radio />} label="Female" />
//                         <FormControlLabel value="male"  control={<Radio />} label="Male" />
//                         </RadioGroup>
//                         </FormControl>
//                   <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     sx={{ mt: 3, mb: 2 }}
//                   >
//                     Sign Up
//                   </Button>
//                   <Grid container justifyContent="center">
//                     <Grid item >
//                       <Link  to={'/login'}>
//                         {"I Already have an Account ?"}
//                       </Link>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </ThemeProvider>
//       ) : (
//         <Verification />
//       )}
//     </>
//   );
// }
