const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  gender: String,
  dob: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  countryCode: String,
  streetAddress: String,
  city: String,
  state: String,
  pinCode: String,
});

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log('🔐 comparePassword called');
  console.log('  - Candidate password length:', candidatePassword ? candidatePassword.length : 0);
  console.log('  - Stored password hash exists:', !!this.password);
  console.log('  - Stored password hash length:', this.password ? this.password.length : 0);

  try {
    const result = await bcrypt.compare(candidatePassword, this.password);
    console.log('  - Comparison result:', result);
    return result;
  } catch (error) {
    console.error('  - ❌ Error in bcrypt.compare:', error.message);
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);
