const express=require('express'); 
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
const adminRouter = require("./router/adminRouter");
const customerRouter = require("./router/cutomerRouter");
const transactionRouter = require("./router/transactionRouter");

const db = require("./config/dbConfig");

//middleware 
app.use(bodyParser.json());
app.use(bodyParser.json({ type:"application/json" }));
app.use(cors());

// router middleware 
app.use("/api/admin",adminRouter);
app.use("/api/customer",customerRouter);
app.use("/api/transaction",transactionRouter);

app.listen(port,()=>console.log(`Server running on port ${port} number`));

