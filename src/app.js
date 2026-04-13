
const express = require('express');
const multer = require('multer');
const { addJob } = require('./queue');

const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(express.json());

app.post('/evaluate', upload.single('resume'), async (req,res)=>{
  const id = await addJob(req.file.path, req.body.jobDescription);
  res.status(202).json({evaluation_id:id});
});

app.get('/evaluate/:id',(req,res)=>{
  res.json({status:"PENDING"});
});

app.listen(3000);
module.exports = app;
