const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require('./api/controllers/user')
const companyRoute = require('./api/controllers/compDetailRouter')
const auditorRoute = require('./api/controllers/auditor')
const auditRoute = require('./api/controllers/audit')
const clauseRoute = require('./api/controllers/clause')
const dummyClauseRoute = require('./api/controllers/dummyClause')
const generatePDF = require('./api/controllers/generate-pdf')
require("dotenv").config();
const app = express();
const cors = require("cors");


const connectionParams = {
  useNewUrlParser: true,
};
app.use(cors())
mongoose.set('strictQuery', true);
mongoose
//   .connect(process.env.URL, connectionParams)
.connect("mongodb+srv://waris:soulhacker69@cluster0.zz9utvp.mongodb.net/?retryWrites=true&w=majority", connectionParams)
  .then(() => {
    console.log("Connected: Run your API ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/company', companyRoute);
app.use('/auditor', auditorRoute);
app.use('/audit', auditRoute);
app.use('/clause', clauseRoute);
app.use('/dummyClause', dummyClauseRoute);
app.use('/generate-pdf', generatePDF);


// ? Bad Request error if any one will hit incorrect URL
app.use((req, res, next) => {
  res.status(404).json({
    error: "Bad Request",
  });
});

app.listen(5000);


