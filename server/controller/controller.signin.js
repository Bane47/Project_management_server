const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmployeeModel = require("../model/EmployeeModel");

//Login Controller

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  try {
    if ((!email, !password)) {
      return res.status(401).json({ message: "Fields Cannot be empty" });
    }

    const user = await EmployeeModel.findOne({ Email: email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Email or password doesn't match" });
    }

    // Update the lastLoginTime for the user
    user.lastLoginTime = new Date();
    user.isLoggedIn = true;
    await user.save();

    //sessionToken

    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET);

    // Create a rememberme token as an object with email and password fields
    const remembermeToken = jwt.sign(
      { email, password },
      process.env.JWT_SECRET
    );

    // const remembermeToken=generateAccessToken({email,password})

    // Create an access token for the user's designation
    const designationToken = jwt.sign(
      { designation: user.Designation },
      process.env.JWT_SECRET
    );

    //roleid token

    const roleIdToken = jwt.sign(
      { roleId: user.DesignationId },
      process.env.JWT_SECRET
    );

    // console.log(roleIdToken);
    // console.log(user.DesignationId);

    const userName = user.EmployeeName;

    // const designationToken=generateAccessToken({ designation: user.Designation })

    res.status(200).json({
      message: "Login successful",
      userName,
      designationToken,
      remembermeToken,
      accessToken,
      roleIdToken,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" + error.message });
  }
};



//logout controller

const handleLogout=async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await EmployeeModel.findOne({ Email: email });
  
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      // Update the isLoggedIn status to false
      user.isLoggedIn = false;
      await user.save();
  
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

module.exports ={
    handleLogin,
    handleLogout
}