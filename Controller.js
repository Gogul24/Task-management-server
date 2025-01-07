const {Task , User} = require('./Schema');
const bcrypt = require('bcryptjs');

exports.createTask = async (req, res) => {
  try {
    const { title, priority, dueDate, status } = req.body;
    const userId = req.params.userId;

    const newTask = new Task({
      title,
      priority,
      dueDate,
      status,
      user: userId,
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', data: newTask });
  } catch (err) {
    res.status(400).json({ message: 'Error creating task', error: err.message });
  }
};

exports.getAllTasks = async (req, res) => {
    try {
        const userId = req.params.userId;  
        const tasks = await Task.find({ user: userId });
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found for this user' });
        }
        res.status(200).json({ data: tasks });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving tasks', error: err.message });
    }
};


exports.updateTask = async (req, res) => {
    try {
      const {title, priority, dueDate, status } = req.body;

      const updatedTask = await Task.findOneAndUpdate(
        { _id: req.params.id},
        { title, priority, dueDate, status },
        { new: true }
      )
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task updated successfully', data: updatedTask });
    } catch (err) {
      res.status(400).json({ message: 'Error updating task', error: err.message });
    }
  };
  

  exports.deleteTask = async (req, res) => {
    try {
          const deletedTask = await Task.findOneAndDelete({ _id: req.params.id}); 
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting task', error: err.message });
    }
  };


  exports.createUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:'All fields are required'});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
        })

        await newUser.save();
        res.status(201).json({message:'User created successfully',user:{id:newUser._id,name:newUser.name,email:newUser.email}})
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
      }
  }

  exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If successful, return user details
    res.status(200).json({
      message: 'Sign in successful',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
};