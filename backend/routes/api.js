const express = require('express');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Test database connection
router.get('/test-connection', async (req, res) => {
    try {
      const database = req.app.locals.database;
      await database.command({ ping: 1 });
      res.json({ message: 'Successfully connected to the database' });
    } catch (error) {
      console.error('Database connection test failed:', error);
      res.status(500).json({ message: 'Failed to connect to the database', error: error.message });
    }
  });
  
  // Doctor routes
  router.get('/doctors', async (req, res) => {
    try {
      const database = req.app.locals.database;
      const doctorCollection = database.collection('docData');
      const doctors = await doctorCollection.find({}).toArray();
      res.json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
  });
  
  router.get('/doctors/:id', async (req, res) => {
    try {
      const database = req.app.locals.database;
      const doctorCollection = database.collection('docData');
      const doctor = await doctorCollection.findOne({ _id: new ObjectId(req.params.id) });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (error) {
      console.error('Error fetching doctor:', error);
      res.status(500).json({ message: 'Error fetching doctor', error: error.message });
    }
  });
  
  router.post('/doctors/add', async (req, res) => {
    try {
      const database = req.app.locals.database;
      const doctorCollection = database.collection('docData');
      const newDoctor = req.body;
      const result = await doctorCollection.insertOne(newDoctor);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error adding new doctor:', error);
      res.status(500).json({ message: 'Error adding new doctor', error: error.message });
    }
  });
  
  // Patient routes
  router.get('/patients', async (req, res) => {
    try {
      const database = req.app.locals.database;
      const patientCollection = database.collection('patData');
      const patients = await patientCollection.find({}).toArray();
      res.json(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ message: 'Error fetching patients', error: error.message });
    }
  });
  
  router.post('/patients/add', async (req, res) => {
    try {
      const database = req.app.locals.database;
      const patientCollection = database.collection('patData');
      const newPatient = req.body;
      const result = await patientCollection.insertOne(newPatient);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error adding new patient:', error);
      res.status(500).json({ message: 'Error adding new patient', error: error.message });
    }
  });
  
  // Appointment routes
  router.get('/appointments', async (req, res) => {
    try {
      const database = req.app.locals.database;
      const appointmentsCollection = database.collection('appointData');
      const appointments = await appointmentsCollection.find({}).toArray();
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
  });
  
  router.get('/appointments/doctor/:doctorId', async (req, res) => {
    try {
      const database = req.app.locals.database;
      const appointmentsCollection = database.collection('appointData');
      const appointments = await appointmentsCollection.find({ 
        doctorId: new ObjectId(req.params.doctorId) 
      }).toArray();
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
      res.status(500).json({ message: 'Error fetching doctor appointments', error: error.message });
    }
  });
  
  router.get('/appointments/patient/:patientId', async (req, res) => {
    try {
      const database = req.app.locals.database;
      const appointmentsCollection = database.collection('appointData');
      const appointments = await appointmentsCollection.find({ 
        patientId: new ObjectId(req.params.patientId) 
      }).toArray();
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching patient appointments:', error);
      res.status(500).json({ message: 'Error fetching patient appointments', error: error.message });
    }
  });
  
  router.post('/appointments/create', async (req, res) => {
    try {
      const database = req.app.locals.database;
      const appointmentsCollection = database.collection('appointData');
      
      // Validate doctorId and patientId
      let doctorId, patientId;
      try {
        doctorId = ObjectId.createFromHexString(req.body.doctorId);
        patientId = ObjectId.createFromHexString(req.body.patientId);
      } catch (error) {
        return res.status(400).json({ message: 'Invalid doctorId or patientId', error: error.message });
      }
  
      // Validate date
      if (!req.body.date) {
        return res.status(400).json({ message: 'Date is required' });
      }
  
      const newAppointment = {
        doctorId,
        patientId,
        date: new Date(req.body.date) // Convert string to Date object
      };
  
      const result = await appointmentsCollection.insertOne(newAppointment);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error adding new appointment:', error);
      res.status(500).json({ message: 'Error adding new appointment', error: error.message });
    }
  });
  
  // Registration route
  router.post('/register', upload.single('image'), async (req, res) => {
    try {
      const database = req.app.locals.database;
      const { role, name, email, password, contactNumber, age, gender } = req.body;

      console.log('Received registration data:', { role, name, email, contactNumber, age, gender });

      // Check if user already exists
      const existingUser = await database.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new ObjectId to use for both collections
      const userId = new ObjectId();

      // Prepare user object
      const user = {
        _id: userId,
        role,
        name,
        email,
        password: hashedPassword,
        contactNumber,
        age,
        gender,
        imagePath: req.file ? req.file.path : null
      };

      console.log('Prepared user object:', user);

      // Add role-specific fields
      if (role === 'doctor') {
        user.specialization = req.body.specialization;
        user.hospitalName = req.body.hospitalName;
        await database.collection('docData').insertOne(user);
      } else {
        user.address = req.body.address;
        await database.collection('patData').insertOne(user);
      }

      // Add user to users collection (for authentication purposes)
      await database.collection('users').insertOne({
        _id: userId,
        email: user.email,
        password: user.password,
        role: user.role
      });

      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  });

// Login route
// router.post('/login', async (req, res) => {
//   console.log('Login route hit');
//   console.log('Request body:', req.body);
//   try {
//     const database = req.app.locals.database;
//     const { email, password, role } = req.body;

//     // Find user by email and role in the appropriate collection
//     const collection = role === 'doctor' ? 'docData' : 'patData';
//     const user = await database.collection(collection).findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or role' });
//     }

//     // Check password
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     const idToSend = user._id.toString();
//     console.log(`Sending ${role === 'doctor' ? 'doctorId' : 'userId'}: ${idToSend}`);

//     // Return doctorId for doctors, userId for patients
//     const response = { 
//       token, 
//       role: user.role,
//       [role === 'doctor' ? 'doctorId' : 'userId']: idToSend
//     };

//     res.json(response);
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Error during login', error: error.message });
//   }
// });

router.post('/login', async (req, res) => {
  console.log('Login attempt:', req.body);
  try {
    const { email, password, role } = req.body;
    const database = req.app.locals.database;
    
    const collection = role === 'doctor' ? 'docData' : 'patData';
    
    const user = await database.collection(collection).findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login successful for:', user.email, 'Role:', user.role, 'ID:', user._id);

    res.json({
      token,
      userId: user._id.toString(),
      role: user.role
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

// Get user details
router.get('/user/:id', authMiddleware, async (req, res) => {
  console.log('User details route hit for ID:', req.params.id);
  try {
    console.log('Received request for user:', req.params.id);
    console.log('User role from token:', req.user.role);
    const database = req.app.locals.database;
    const userId = req.params.id;
    const userRole = req.user.role;

    let user;
    const collection = userRole === 'doctor' ? 'docData' : 'patData';
    
    try {
      user = await database.collection(collection).findOne({ _id: new ObjectId(userId) });
    } catch (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ message: 'Error querying database', error: error.message });
    }

    if (!user) {
      console.log('User not found in database');
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove sensitive information
    delete user.password;

    console.log('User found:', user);
    res.json(user);
  } catch (error) {
    console.error('Error in /user/:id route:', error);
    res.status(500).json({ message: 'Error fetching user details', error: error.message });
  }
});

// // Add this new route before the catch-all route
// router.get('/check-user/:id', async (req, res) => {
//   try {
//     const database = req.app.locals.database;
//     const userId = req.params.id;
//     const user = await database.collection('patData').findOne({ _id: new ObjectId(userId) });
//     res.json({ userExists: !!user, user: user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// router.get('/all-users', async (req, res) => {
//   try {
//     const database = req.app.locals.database;
//     const users = await database.collection('patData').find({}).toArray();
//     res.json(users.map(user => ({ _id: user._id, email: user.email, name: user.name })));
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get('/update-user-id', async (req, res) => {
//   try {
//     const database = req.app.locals.database;
//     const usersCollection = database.collection('users');
//     const patDataCollection = database.collection('patData');

//     // First, try to find the user in the patData collection
//     const patUser = await patDataCollection.findOne({ email: "kp1@gmail.com" });

//     if (patUser) {
//       // If found in patData, check if exists in users collection
//       const existingUser = await usersCollection.findOne({ email: "kp1@gmail.com" });

//       if (existingUser) {
//         // If exists in users, update the _id
//         const result = await usersCollection.updateOne(
//           { email: "kp1@gmail.com" },
//           { $set: { _id: patUser._id } }
//         );
//         res.json({ message: 'User updated successfully', result });
//       } else {
//         // If not in users, insert new document
//         const result = await usersCollection.insertOne({
//           _id: patUser._id,
//           email: patUser.email,
//           password: patUser.password,
//           role: patUser.role
//         });
//         res.json({ message: 'User added to users collection', result });
//       }
//     } else {
//       res.status(404).json({ message: 'User not found in patData collection' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// New route to fetch doctor ID
// router.get('/doctor/id', authMiddleware, async (req, res) => {
//   console.log('Doctor ID route hit');
//   try {
//     if (req.user.role !== 'doctor') {
//       return res.status(403).json({ message: 'Access denied. Not a doctor.' });
//     }
//     const doctorId = req.user.userId;
//     console.log('Sending doctorId:', doctorId);
//     res.json({ doctorId: doctorId });
//   } catch (error) {
//     console.error('Error fetching doctor ID:', error);
//     res.status(500).json({ message: 'Error fetching doctor ID', error: error.message });
//   }
// });



// New route to fetch doctor profile
router.get('/doctor/profile/:id', authMiddleware, async (req, res) => {
  console.log('Doctor profile route hit for ID:', req.params.id);
  try {
    const database = req.app.locals.database;
    const doctorId = req.params.id;

    if (!doctorId || doctorId === 'undefined') {
      return res.status(400).json({ message: 'Invalid doctor ID' });
    }

    const doctor = await database.collection('docData').findOne({ _id: new ObjectId(doctorId) });

    if (!doctor) {
      console.log('Doctor not found in database');
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Remove sensitive information
    delete doctor.password;

    console.log('Doctor found:', doctor);
    res.json(doctor);
  } catch (error) {
    console.error('Error in /doctor/profile/:id route:', error);
    res.status(500).json({ message: 'Error fetching doctor details', error: error.message });
  }
});

// Doctor details route
router.get('/doctor/:id', authMiddleware, async (req, res) => {
  console.log('Doctor details route hit for ID:', req.params.id);
  try {
    const database = req.app.locals.database;
    const doctorId = req.params.id;

    if (!doctorId || doctorId === 'undefined') {
      return res.status(400).json({ message: 'Invalid doctor ID' });
    }

    const doctor = await database.collection('docData').findOne({ _id: new ObjectId(doctorId) });

    if (!doctor) {
      console.log('Doctor not found in database');
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Remove sensitive information
    delete doctor.password;

    console.log('Doctor found:', doctor);
    res.json(doctor);
  } catch (error) {
    console.error('Error in /doctor/:id route:', error);
    res.status(500).json({ message: 'Error fetching doctor details', error: error.message });
  }
});

// Update doctor profile route
router.put('/doctor/update/:id', authMiddleware, async (req, res) => {
  try {
    const database = req.app.locals.database;
    const doctorId = req.params.id;
    const updates = req.body;

    // Remove sensitive fields that shouldn't be updated directly
    delete updates.password;
    delete updates._id;

    const result = await database.collection('docData').updateOne(
      { _id: new ObjectId(doctorId) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor profile updated successfully' });
  } catch (error) {
    console.error('Error updating doctor profile:', error);
    res.status(500).json({ message: 'Error updating doctor profile', error: error.message });
  }
});




router.get('/doctors/search/:term', async (req, res) => {
  try {
    const { term } = req.params;
    console.log('Received search term:', term);

    if (!term) {
      console.log('Search term is missing');
      return res.status(400).json({ message: 'Search term is required' });
    }

    const database = req.app.locals.database;
    if (!database) {
      console.error('Database not connected');
      return res.status(500).json({ message: 'Database connection error' });
    }

    console.log('Executing database query');
    const doctors = await database.collection('docData').find({
      $or: [
        { specialization: { $regex: new RegExp(term, 'i') } },
        { 'specialization.name': { $regex: new RegExp(term, 'i') } },
        { 'specialization.value': { $regex: new RegExp(term, 'i') } }
      ]
    }).toArray();

    console.log('Doctors found:', doctors);

    if (doctors.length === 0) {
      console.log('No doctors found');
      return res.status(404).json({ message: 'No doctor found with that specialization' });
    }

    const sanitizedDoctors = doctors.map(doctor => {
      const { password, ...sanitizedDoctor } = doctor;
      return {
        ...sanitizedDoctor,
        _id: sanitizedDoctor._id.toString(), // Convert ObjectId to string
        specialization: sanitizedDoctor.specialization.name || sanitizedDoctor.specialization.value || sanitizedDoctor.specialization
      };
    });

    console.log('Sending response');
    res.json(sanitizedDoctors);
  } catch (error) {
    console.error('Error in doctor search:', error);
    res.status(500).json({ message: 'Error searching doctors', error: error.message });
  }
});


// Catch-all route for unmatched routes
router.use('*', (req, res) => {
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found' });
});

module.exports = router;