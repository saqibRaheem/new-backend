const express = require("express");
const pdfService = require("../services/pdfService");
const router = express.Router();

router.post("/", (req, res, next) => {
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment;filename=report.pdf`,
  });
  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end(),
    // req.body.companyName,
    req.body.standard,
    req.body.score,
    req.body.nonConformities,
    req.body.clauses,
  );
});

module.exports = router;
