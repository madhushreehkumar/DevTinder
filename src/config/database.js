const mongoose=require('mongoose');

const connectDB = async () => {
  await  mongoose.connect('mongodb+srv://nodepractice:mtQx5Q9ZJvguvcUu@nodepractice.7fl1kti.mongodb.net/devtinder');
}

module.exports= connectDB;



