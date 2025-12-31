const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// Helper to format user response (converts Buffer to base64)
const formatUserResponse = (user) => {
  const userObj = user.toObject ? user.toObject() : { ...user };
  const formattedUser = {
    id: userObj._id || userObj.id,
    name: userObj.name,
    email: userObj.email,
    role: userObj.role,
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    phone: userObj.phone,
    address: userObj.address,
    gender: userObj.gender,
    dob: userObj.dob,
    countryCode: userObj.countryCode,
    streetAddress: userObj.streetAddress,
    city: userObj.city,
    state: userObj.state,
    pinCode: userObj.pinCode,
  };

  if (userObj.image && userObj.image.data) {
    const base64 = userObj.image.data.toString('base64');
    formattedUser.image = `data:${userObj.image.contentType};base64,${base64}`;
  } else {
    formattedUser.image = userObj.image; // Fallback for old string format or empty
  }

  return formattedUser;
};

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: formatUserResponse(user),
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    console.log('=== LOGIN REQUEST STARTED ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const { email, password } = req.body;
    console.log('Extracted email:', email);
    console.log('Extracted password:', password ? '***' : 'undefined');
    // Validate email & password
    if (!email || !password) {
      console.log('❌ Validation failed: Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
        debug: { step: 'validation', issue: 'missing_fields' },
      });
    }

    console.log('✅ Validation passed');
    console.log('🔍 Searching for user with email:', email);
    console.log('User found:', await User.findOne({ email }));
    // Check for user (include password field)
    const user = await User.findOne({ email }).select('+password');

    console.log('User found:', user ? 'YES' : 'NO');
    if (user) {
      console.log('User ID:', user._id);
      console.log('User email:', user.email);
      console.log('User has password field:', !!user.password);
    }

    if (!user) {
      console.log('❌ User not found in database');
      // Add debug info visible in browser Network tab
      res.setHeader('X-Debug-User-Found', 'NO');
      res.setHeader('X-Debug-Searched-Email', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        debug: {
          step: 'user_lookup',
          searchedEmail: email,
          userFound: false,
        },
      });
    }

    console.log('🔐 Comparing password...');
    // Check if password matches
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('❌ Password does not match');
      // Add debug info visible in browser Network tab
      res.setHeader('X-Debug-User-Found', 'YES');
      res.setHeader('X-Debug-Password-Match', 'NO');
      res.setHeader('X-Debug-User-Email', user.email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        debug: {
          step: 'password_validation',
          userFound: true,
          passwordMatch: false,
          userEmail: user.email,
        },
      });
    }

    console.log('✅ Password matches!');
    // Generate token
    const token = generateToken(user._id);
    console.log('Token generated:', token ? 'YES' : 'NO');

    console.log('✅ Login successful, sending response');
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: formatUserResponse(user),
        token,
      },
    });
    console.log('=== LOGIN REQUEST COMPLETED ===');
  } catch (error) {
    console.error('❌ ERROR in login controller:');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: error.message,
      debug: { step: 'error', error: error.message },
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        user: formatUserResponse(user),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = async (req, res) => {
    console.log('hello world')
  try {
    const fieldsToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address,
      gender: req.body.gender,
      dob: req.body.dob,
      countryCode: req.body.countryCode,
      name: req.body.name,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      pinCode: req.body.pinCode,
    };

    if (req.body.image && req.body.image.startsWith('data:image')) {
      const parts = req.body.image.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const base64Data = parts[1];
      fieldsToUpdate.image = {
        data: Buffer.from(base64Data, 'base64'),
        contentType: contentType,
      };
    } else if (req.body.image === null || req.body.image === '') {
      fieldsToUpdate.image = null;
    }

    const user = await User.findByIdAndUpdate(req.body.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: {
        user: formatUserResponse(user),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
