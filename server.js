const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const studentModel = require('./models/user');
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Employee')
    .then(() => {
        console.log("DB Connected successfully");
    })
    .catch((err) => {
        console.error("Not connected successfully " + err);
    });

app.get("/", (req, res) => {
    console.log("All working");
    res.send("Server is running");
});

app.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
        const existingUser = await studentModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await studentModel.create({ name, email, password: hashedPassword });
      res.json(user);

    } catch (err) {
      console.error('Error registering user:', err.message);
      if (err.code === 11000) { 
        return res.status(400).json({ message: 'Email already exists' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
      try {
      const user = await studentModel.findOne({ email: email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user._id }, 'secret123', { expiresIn: '3600s' }); // Token expires in 1 hour
  
      res.json({ success: true, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });


app.post('/displayUsers', async(req,res)=>{
  const users = await studentModel.find({email: {$ne: 'admin@example.com'}})
  res.json(users)
})

app.get('/getUser/:id',
  (req,res)=>{
    const id = req.params.id
    studentModel.findById({_id: id})
    .then(users =>{res.json(users)})
    .catch(err=>{res.json(err)})
  }
)


app.delete('/deleteUser/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const deletedUser = await studentModel.findByIdAndDelete({ _id: id });

      if (!deletedUser) {
          return res.status(404).send('User not found');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
  }
});



app.put('/updateUser/:id', (req,res)=>{
  const id = req.params.id
  studentModel.findByIdAndUpdate({_id:id}, {name:req.body.name}, {email:req.body.email})
  .then(users =>{res.json(users)})
  .catch(err=>{res.json(err)})
})
const createAdminUser = async (req,res) => {
  const adminEmail = 'admin@example.com';
    const admin = await studentModel.findOne({ email: adminEmail });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const user = await studentModel.create({ name:'admin', email:adminEmail, password: hashedPassword });
    }
};
createAdminUser();

app.listen(port, () => {
    console.log("Application is running on port " + port);
});
