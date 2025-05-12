import mongoose from "mongoose";
import bcrypt from "bcrypt";

// ควรเพิ่ม field name และ timestamps
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
); // เพิ่ม timestamps เพื่อบันทึกเวลาสร้างและอัปเดต

// hash password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);
