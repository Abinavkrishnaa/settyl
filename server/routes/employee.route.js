import express from 'express';
import {Employee} from '../models/employee.js';
import  {Audit} from '../models/audit.js';
import auth from '../middleware/auth.js';
const router = express.Router();


router.post('/', auth, async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const oldEmployee = await Employee.findById(id);
    const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    
    const changes = {};
    for (const key in req.body) {
      if (req.body[key] !== oldEmployee[key]) {
        changes[key] = `Changed from ${oldEmployee[key]} to ${req.body[key]}`;
      }
    }
    const audit = new Audit({ employeeId: id, changes });
    await audit.save();

    res.send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;