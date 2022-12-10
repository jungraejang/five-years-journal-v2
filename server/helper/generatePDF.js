const fs = require("fs");
const PDFDocument = require("pdfkit");

async function generatePDF(questions, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  //   generateCustomerInformation(doc, questions);
  //   generatequestionsTable(doc, questions);
  generateFooter(doc);

  //   return doc.pipe(fs.createWriteStream(path));
  console.log("generate completed");
  doc.end();

  return fs.createWriteStream(path);
}

function generateHeader(doc) {
  doc
    // .image("logo.png", 50, 45, { width: 50 })
    // .fillColor("#444444")
    // .fontSize(20)
    .text("Five Years Journal.", 110, 57)
    .fontSize(10)
    .text("JRJ Enterprises.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 11373", 200, 80, { align: "right" })
    .moveDown();
}

// function generateCustomerInformation(doc, questions) {
//   doc.fillColor("#444444").fontSize(20).text("questions", 50, 160);

//   generateHr(doc, 185);

//   const customerInformationTop = 200;

//   doc
//     .fontSize(10)
//     .text("questions Number:", 50, customerInformationTop)
//     .font("Helvetica-Bold")
//     .text(questions.questions_nr, 150, customerInformationTop)
//     .font("Helvetica")
//     .text("questions Date:", 50, customerInformationTop + 15)
//     .text(formatDate(new Date()), 150, customerInformationTop + 15)
//     .text("Balance Due:", 50, customerInformationTop + 30)
//     .text(
//       formatCurrency(questions.subtotal - questions.paid),
//       150,
//       customerInformationTop + 30
//     )

//     .font("Helvetica-Bold")
//     .text(questions.shipping.name, 300, customerInformationTop)
//     .font("Helvetica")
//     .text(questions.shipping.address, 300, customerInformationTop + 15)
//     .text(
//       questions.shipping.city +
//         ", " +
//         questions.shipping.state +
//         ", " +
//         questions.shipping.country,
//       300,
//       customerInformationTop + 30
//     )
//     .moveDown();

//   generateHr(doc, 252);
// }

// function generatequestionsTable(doc, questions) {
//   let i;
//   const questionsTableTop = 330;

//   doc.font("Helvetica-Bold");
//   generateTableRow(
//     doc,
//     questionsTableTop,
//     "Item",
//     "Description",
//     "Unit Cost",
//     "Quantity",
//     "Line Total"
//   );
//   generateHr(doc, questionsTableTop + 20);
//   doc.font("Helvetica");

//   for (i = 0; i < questions.items.length; i++) {
//     const item = questions.items[i];
//     const position = questionsTableTop + (i + 1) * 30;
//     generateTableRow(
//       doc,
//       position,
//       item.item,
//       item.description,
//       formatCurrency(item.amount / item.quantity),
//       item.quantity,
//       formatCurrency(item.amount)
//     );

//     generateHr(doc, position + 20);
//   }

//   const subtotalPosition = questionsTableTop + (i + 1) * 30;
//   generateTableRow(
//     doc,
//     subtotalPosition,
//     "",
//     "",
//     "Subtotal",
//     "",
//     formatCurrency(questions.subtotal)
//   );

//   const paidToDatePosition = subtotalPosition + 20;
//   generateTableRow(
//     doc,
//     paidToDatePosition,
//     "",
//     "",
//     "Paid To Date",
//     "",
//     formatCurrency(questions.paid)
//   );

//   const duePosition = paidToDatePosition + 25;
//   doc.font("Helvetica-Bold");
//   generateTableRow(
//     doc,
//     duePosition,
//     "",
//     "",
//     "Balance Due",
//     "",
//     formatCurrency(questions.subtotal - questions.paid)
//   );
//   doc.font("Helvetica");
// }

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text("This is the dopest journal ever", 50, 780, {
      align: "center",
      width: 500,
    });
}

// function generateTableRow(
//   doc,
//   y,
//   item,
//   description,
//   unitCost,
//   quantity,
//   lineTotal
// ) {
//   doc
//     .fontSize(10)
//     .text(item, 50, y)
//     .text(description, 150, y)
//     .text(unitCost, 280, y, { width: 90, align: "right" })
//     .text(quantity, 370, y, { width: 90, align: "right" })
//     .text(lineTotal, 0, y, { align: "right" });
// }

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  generatePDF,
  generateHeader,
  generateFooter,
};
