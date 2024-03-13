import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignInSide() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/user/login", userInfo)
      .then(async (response) => {
        if (response.data.success) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.loggedInUser)
          );
          navigate("/messages");
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const randomWallpaperUrl = () => {
    const wallpapers = [
      "https://source.unsplash.com/random?japan",
      // Add more wallpaper URLs here if needed
    ];
    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    return wallpapers[randomIndex];
  };

  return (
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
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
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
          Login
        </h3>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            required
            name="email"
            autoComplete="email"
            autoFocus
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
          <label htmlFor="password">Password:</label>
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
              fontSize: "14px",
              fontWeight: "300",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            marginTop: "50px",
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
          Login In
        </button>
        <div>
          <Link
            to="#"
            style={{
              color: "#ffffff",
              display: "block",
              textAlign: "center",
              marginTop: "20px",
              textDecoration: "none",
            }}
          >
            Forgot password?
          </Link>
        </div>
        <div>
          <Link
            to="/Register"
            style={{
              color: "#ffffff",
              display: "block",
              textAlign: "center",
              marginTop: "20px",
              textDecoration: "none",
            }}
          >
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}

// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import { Link, useNavigate } from "react-router-dom";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useState } from "react";
// import axios from "axios";
// import Registration from "./Register";

// const defaultTheme = createTheme();

// export default function SignInSide() {
//   const [userInfo, setUserInfo] = useState(null);
//   let navigate = useNavigate();
//   const handleChange = (e) => {
//     setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//   };
//   console.log(userInfo);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:3000/api/user/login", userInfo)
//       .then(async (response) => {
//         if(response.data.success){
//           localStorage.setItem('user',JSON.stringify(response.data.loggedInUser));
//           navigate('/home');
//           alert(response.data.message)
//         }else{
//           alert(response.data.message)
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: '100vh' }}>
//         <CssBaseline />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 onChange={handleChange}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 onChange={handleChange}
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Login In
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="#" variant="body2">
//                     Forgot password?
//                   </Link>
//                 </Grid>
//                 <Grid item>
//                   <Link to={'/Register'}>
//                     {"Don't have an account? Register"}
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Grid>
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
//             backgroundRepeat: 'no-repeat',
//             backgroundColor: (t) =>
//               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//       </Grid>
//     </ThemeProvider>
//   );
// }
