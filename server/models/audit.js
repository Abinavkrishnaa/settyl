import mongoose from "mongoose";
const auditSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  changes: { type: Map, of: String, required: true },
}, { timestamps: true });

export const Audit = mongoose.model('Audit', auditSchema);

