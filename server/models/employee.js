import mongoose from 'mongoose';
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  department: { type: String, required: true },
  status: { type: String, enum: ['Remote Location', 'Contract Employee', 'Full-Time'], required: true },
}, { timestamps: true });

export const Employee = mongoose.model('Employee', employeeSchema);

