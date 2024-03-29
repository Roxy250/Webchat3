import user_schema from "../models/user_schema.mjs";
import TempUser from "../models/tempUser_schema.mjs";
import bcrypt from 'bcrypt';
import {sendOTP} from '../nodemailer.mjs';
import generateOTP from 'otp-generator';


export const Register = async (req, res) => {
    const { email, username, password, gender } = req.body;
    try {
        const user = await user_schema.findOne({ email });

        if (!user) {
            // Generate OTP
            const otp = generateOTP.generate(4, { digits: true,upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false});

            //  Create Profile
            const boy = "https://avatar.iran.liara.run/public/boy";
            const girl = "https://avatar.iran.liara.run/public/girl";
            const profile = gender === "male"?boy:gender === "female"?girl:null;

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new TempUser({ email, username, password: hashedPassword, profile, otp });
            await newUser.save();

            // Send OTP to user
            await sendOTP(email, otp);

            res.json({ message: 'OTP sent to your email. Please verify.',success: true});
        } else {
            res.json({ message: 'User already exists' });
        }
    } catch (error) {
        console.error('Failed to register user:', error);
        res.status(500).json({ error: 'Failed to register user.' });
    }
};



export const Verification = async (req, res) => {
    const { otp} = req.body;
    
    try {
        // Verify OTP

        const tempUser = await TempUser.findOne({ otp });
        if(!tempUser){
            return res.json({ message: 'Invalid OTP.'});
        }else{
            if (tempUser.otp !== otp) {
                return res.json({ message: 'Invalid OTP.'});
            }else{
                const { email, username, password, profile } = tempUser;

                // Save user data to the database
                const newUser = new user_schema({ email, username, password, profile });
                await newUser.save();
        
                res.json({ message: 'User registered successfully.',success:true});
                console.log(`${username} registered successfully`)
            }  
    }} catch (error) {
        console.error('Failed to verify OTP:', error);
        res.status(500).json({ error: 'Failed to verify OTP.' });
    }
};

// export const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     let user = await user_schema.findOne({ email: email });
//     if (!user) {
//       console.log("Email not found!");
//       res.json({ message: "Email or Password Invalid!" });
//     } else {
//       let checkPassword = await bcrypt.compare(password, user.password);
//       if (!checkPassword) {
//         console.log("Invalid Password!");
//         res.json({ message: "Email or Password Invalid!" });
//       } else {
//         console.log("Login successful!");
//         const userId = user._id;
//         res.json({
//           message: "Login successful!",
//           success: true,
//           userId,
//         });
//       }
//     }
//   } catch (err) {
//     console.log("Error occurred" + err);
//     res.json({ error: err });
//   }
// };




export const Login = async (req, res) => {
  try {
    const { email, password,room_id } = req.body;
    let user = await user_schema.findOne({ email: email });
    if (!user) {
      console.log("Email not found!");
      res.json({ message: "Email or Password Invalid!" });
    } else {
      let checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        console.log("Invalid Password!");
        res.json({ message: "Email or Password Invalid!" });
      } else {
        user.room_id = room_id;await user.save();
        console.log("Login successful!");
        res.json({
          message: "Login successful!",
          success: true,
          user:{
            profile:user.profile,
            username:user.username,
            room_id:user.room_id,
            user_id:user._id
          },
        });
      }
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { _id } = req.body;

    let user = await user_schema.findById(_id).select('-password -email');
    if (!user) {
      return res.json({ message: "User not found!" });
    } else {
      res.json({ user: user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getUserByRoomId = async (req, res) => {
  try {
    const { room_id } = req.body;
    // Assuming user_schema is your Mongoose model for users
    let users = await user_schema.find({ room_id });

    if (!users || users.length === 0) {
      console.log('No users found for the provided room_id');
      return res.json({ message: "No users found for the provided room_id" });
    } else {
      return res.json({ users });
    }
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const Logout = async (req, res) => {
  try {
    const { user_id } = req.body;

    await user_schema.findOneAndUpdate(
      { _id: user_id },
      { $set: { room_id: null } }
    );
    console.log(`${user_id} logged out`);
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Failed to logout" });
  }
};



