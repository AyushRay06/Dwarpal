import bcryptjs from "bcryptjs"
import { User } from "../models/user.modal.js"
import { genrateTokenAndSetCookie } from "../utils/generateJWTandSetCookie.js"

export const signup = async (req, res) => {
  const { email, password, name } = req.body

  try {
    if (!email || !password || !name) {
      throw new Error("All feilds are required")
    }

    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" })
    }

    const hashedpassword = await bcryptjs.hash(password, 10)

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString()

    //adding thhe new user tyo the DB
    const user = new User({
      email,
      password: hashedpassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 10 * 60 * 60 * 1000, //24 Hours
    })
    console.log(user)
    await user.save()
    //JWT
    genrateTokenAndSetCookie(res, user._id)

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc, //spreading all the fields that the user has
        password: undefined, // explicitly defining passswoed as undefined to hide it from the client side
      },
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
export const login = async (req, res) => {
  res.send("Login")
}
export const logout = async (req, res) => {
  res.send("Login")
}
