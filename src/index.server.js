const express = require('express');
const app = express();

app.listen(process.env.PORT, ()=>{
      console.log('SERVER is running on port ${process.env.PORT');
});