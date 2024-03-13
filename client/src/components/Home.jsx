import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import logo from "../assets/msg.png"; // Import your logo image
import "./home.css"; // Import your CSS file
import LoginGmail from "./Login/Gmail"; // Import the LoginGmail component

const Home = () => {
  const [textColor, setTextColor] = useState("#ffffff"); // Default text color

  useEffect(() => {
    const loadBackgroundAndCalculateColor = () => {
      const japanBackgroundUrl = "https://source.unsplash.com/random/?japan";
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = japanBackgroundUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        setTextColor("#ffffff"); // Set default text color to white
      };
    };

    loadBackgroundAndCalculateColor();
  }, []);

  const customStyles = {
    height: "auto",
    width: "auto",
    maxWidth: "1000px",
    backgroundColor: "rgba(255, 255, 255, 0.13)",
    borderRadius: "2%",
    backdropFilter: "blur(8px)",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 0 40px rgba(8, 7, 16, 0.6)",
    padding: "80px 35px 50px", // Added padding top of 100px
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto", // Center the content horizontally
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(https://source.unsplash.com/random/?japan)`,
      }}
    >
      <div className="container">
        <img src={logo} alt="Logo" className="logo" />
        <ul>
          <li>
            <Link to="/" style={{ color: textColor }}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/about" style={{ color: textColor }}>
              ABOUT
            </Link>
          </li>
          <li>
            <Link to="/service" style={{ color: textColor }}>
              SERVICE
            </Link>
          </li>
          <li>
            <Link to="/blog" style={{ color: textColor }}>
              BLOG
            </Link>
          </li>
          <li>
            <Link to="/privacy" style={{ color: textColor }}>
              PRIVACY
            </Link>
          </li>
        </ul>
        <Button className="btn" component={Link} to="/contact">
          Contact us
        </Button>
      </div>
      <div style={customStyles} className="content">
        <Typography variant="h1">
          <b>
            Welcome to Our
            <br />
            ChatApp!
          </b>
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/register"
            className="btn"
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/login"
            className="btn"
            style={{ marginTop: "10px" }}
          >
            Sign In
          </Button>
        </div>
        {/* Google Sign-In Button */}
        <div style={{ marginTop: "20px" }}>
          <LoginGmail />
        </div>
      </div>
    </div>
  );
};

export default Home;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Button, Typography } from "@mui/material";
// import logo from "../assets/msg.png"; // Import your logo image
// import "./home.css"; // Import your CSS file

// const Home = () => {
//   const [textColor, setTextColor] = useState("#ffffff"); // Default text color

//   useEffect(() => {
//     const loadBackgroundAndCalculateColor = () => {
//       const japanBackgroundUrl = "https://source.unsplash.com/random/?japan";
//       const img = new Image();
//       img.crossOrigin = "Anonymous";
//       img.src = japanBackgroundUrl;

//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         context.drawImage(img, 0, 0, img.width, img.height);

//         setTextColor("#ffffff"); // Set default text color to white
//       };
//     };

//     loadBackgroundAndCalculateColor();
//   }, []);

//   const customStyles = {
//     height: "auto",
//     width: "auto",
//     maxWidth: "1000px",
//     backgroundColor: "rgba(255, 255, 255, 0.13)",
//     borderRadius: "2%",
//     backdropFilter: "blur(8px)",
//     border: "2px solid rgba(255, 255, 255, 0.1)",
//     boxShadow: "0 0 40px rgba(8, 7, 16, 0.6)",
//     padding: "80px 35px 50px", // Added padding top of 100px
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "0 auto", // Center the content horizontally
//   };

//   return (
//     <div
//       className="container-fluid"
//       style={{
//         backgroundImage: `url(https://source.unsplash.com/random/?japan)`,
//       }}
//     >
//       <div className="container">
//         <img src={logo} alt="Logo" className="logo" />
//         <ul>
//           <li>
//             <Link to="/" style={{ color: textColor }}>
//               HOME
//             </Link>
//           </li>
//           <li>
//             <Link to="/about" style={{ color: textColor }}>
//               ABOUT
//             </Link>
//           </li>
//           <li>
//             <Link to="/service" style={{ color: textColor }}>
//               SERVICE
//             </Link>
//           </li>
//           <li>
//             <Link to="/blog" style={{ color: textColor }}>
//               BLOG
//             </Link>
//           </li>
//           <li>
//             <Link to="/privacy" style={{ color: textColor }}>
//               PRIVACY
//             </Link>
//           </li>
//         </ul>
//         <Button className="btn" component={Link} to="/contact">
//           Contact us
//         </Button>
//       </div>
//       <div style={customStyles} className="content">
//         <Typography variant="h1">
//           <b>
//             Welcome to Our
//             <br />
//             ChatApp!
//           </b>
//         </Typography>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             component={Link}
//             to="/register"
//             className="btn"
//           >
//             Sign Up
//           </Button>
//           <Button
//             variant="outlined"
//             color="primary"
//             component={Link}
//             to="/login"
//             className="btn"
//             style={{ marginTop: "10px" }}
//           >
//             Sign In
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// v2



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Typography } from '@mui/material';
// import logo from '../assets/msg.png'; // Import your logo image
// import './home.css'; // Import your CSS file

// const Home = () => {
//   const [textColor, setTextColor] = useState('#ffffff'); // Default text color

//   useEffect(() => {
//     const loadBackgroundAndCalculateColor = () => {
//       const japanBackgroundUrl = 'https://source.unsplash.com/random/?japan';
//       const img = new Image();
//       img.crossOrigin = 'Anonymous';
//       img.src = japanBackgroundUrl;

//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d');
//         canvas.width = img.width;
//         canvas.height = img.height;
//         context.drawImage(img, 0, 0, img.width, img.height);

//         setTextColor('#ffffff'); // Set default text color to white
//       };
//     };

//     loadBackgroundAndCalculateColor();
//   }, []);

//   return (
//     <div className="container-fluid" style={{ backgroundImage: `url(https://source.unsplash.com/random/?japan)` }}>
//       <div className="container">
//         <img src={logo} alt="Logo" className="logo" />
//         <ul>
//           <li><Link to="/" style={{ color: textColor }}>HOME</Link></li>
//           <li><Link to="/about" style={{ color: textColor }}>ABOUT</Link></li>
//           <li><Link to="/service" style={{ color: textColor }}>SERVICE</Link></li>
//           <li><Link to="/blog" style={{ color: textColor }}>BLOG</Link></li>
//           <li><Link to="/privacy" style={{ color: textColor }}>PRIVACY</Link></li>
//         </ul>
//         <Button className="btn" component={Link} to="/contact">Contact us</Button>
//       </div>
//       <div className="content" style={{ color: textColor }}>
//         <Typography variant="h1"><b>Welcome to Our<br />Chat App!</b></Typography>
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Centered buttons */}
//           <Button variant="contained" color="primary" component={Link} to="/register" className="btn">Sign Up</Button>
//           <Button variant="outlined" color="primary" component={Link} to="/login" className="btn" style={{ marginTop: '10px' }}>Sign In</Button> {/* Added margin top */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
