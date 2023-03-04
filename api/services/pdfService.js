const PDFDocument = require("pdfkit");

function buildPDF(
  dataCallback,
  endCallback,
  // companyName,
  standard,
  score,
  nonConformities,
  clauses
) {
  const doc = new PDFDocument({ bufferPages: true, font: "Times-Roman" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.image("images/logo.png", {
    // fit: [300, 400],
    height: 270,
    align: "center",
  });

  // doc.fontSize(20).text(`Company Name: ${companyName}`, 70, 500, {
  //   characterSpacing: 3,
  //   stroke: true,
  //   fill: true,
  //   lineGap: 5,
  // });
  doc.fontSize(20).text(`Standard Name: ${standard}`, 70, 450, {
    characterSpacing: 3,
    stroke: true,
    fill: true,
    lineGap: 5,
  });
  doc.fontSize(20).text(`Score: ${score}`, {
    characterSpacing: 3,
    stroke: true,
    fill: true,
    lineGap: 5,
  });
  doc.fontSize(20).text(`Non Conformities: ${nonConformities}`, {
    characterSpacing: 3,
    stroke: true,
    fill: true,
    lineGap: 5,
  });
  doc.fontSize(20).text(`Clauses: `, {
    characterSpacing: 3,
    stroke: true,
    fill: true,
    lineGap: 5,
  });
  for (i = 0; i < clauses.length; i++) {
    doc.fontSize(18).text(clauses[i].name, {
      characterSpacing: 3,
      stroke: true,
      fill: true,
      lineGap: 5,
    });
  }

  // ? TABLE OF CONTENT
  doc.addPage().fontSize(25).text("Table Of Content", {
    align: "center",
    characterSpacing: 3,
    lineGap: 20,
    stroke: true,
    fill: true,
  });

  var pageCount = 1;
  for (i = 0; i < clauses.length; i++) {
    children = clauses[i].children;
    doc.fontSize(18).text(clauses[i].name, 50);
    for (j = 0; j < children.length; j++) {
      moreChildren = children[j].children;
      doc.fontSize(18).text(children[j].number, 70);
      for (k = 0; k < moreChildren.length; k++) {
        doc
          .fontSize(18)
          .text(
            `${
              moreChildren[k].name
            }                                ${pageCount++}`,
            90
          );
      }
    }
  }
  pageCount = 1;
  for (i = 0; i < clauses.length; i++) {
    children = clauses[i].children;
    for (j = 0; j < children.length; j++) {
      moreChildren = children[j].children;
      for (k = 0; k < moreChildren.length; k++) {
        doc.addPage({
          margin: 50,
        });
        questions = moreChildren[k].question;
        questionName = moreChildren[k].name;
        doc.fontSize(22).font("Times-Bold").text(`${questionName}`);
        for (l = 0; l < questions.length; l++) {
          doc.fontSize(18).font("Times-Roman").text(`${questions[l].question}`);
          doc
            .fontSize(18)
            .font("Times-Roman")
            .text(`Ans: ${questions[l].answer}`, { lineGap: 50 });
        }
        doc.fontSize(14).font("Courier").text(`${pageCount++}`, 300, 710);
      }
    }
  }

  doc.end();
}

module.exports = { buildPDF };
