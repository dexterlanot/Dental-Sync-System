import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    unique: true,
  },
  password: String,
});

const Admin = mongoose.model('admin', adminSchema);

export default Admin;