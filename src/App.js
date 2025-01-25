import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { TextField, Button, Container, Typography } from "@mui/material";

const App = () => {
  const [fromAddress, setFromAddress] = useState(
    `IZABEL\nOPP. ST ANTHONY'S CHURCH\nKALOOR\nKOCHI,682017\n9605000549`
  );
  const [toAddresses, setToAddresses] = useState("");

  // Text that will be copied to the clipboard when the button is clicked
  const copyText = "Please separate the following addresses by a newline for each address properly formatted";

  // Copy the text to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyText)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy to clipboard: " + err);
      });
  };

const generatePDF = async () => {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4 size (use let for reassignment)
  const { width, height } = page.getSize();

  // Split addresses
  const toAddressesArray = toAddresses
    .split("\n\n")
    .map((address) => address.trim())
    .filter((address) => address.length > 0);

  const positions = [
    [50, height - 100],
    [300, height - 100],
    [50, 400],
    [300, 400],
  ];

  let pairCount = 0;
  for (let i = 0; i < toAddressesArray.length; i++) {
    const [x, y] = positions[pairCount % 4];

    // Draw "To" address with bold text and font size 13
    page.drawText("To:", { x, y, size: 13, color: rgb(0, 0, 0), font: await pdfDoc.embedFont('Helvetica-Bold') });
    toAddressesArray[i].split("\n").forEach((line, idx) => {
      page.drawText(line, { x, y: y - 15 * (idx + 1), size: 10 });
    });

    // Draw "From" address with bold text and font size 13
    page.drawText("From:", { x, y: y - 100, size: 13, color: rgb(0, 0, 0), font: await pdfDoc.embedFont('Helvetica-Bold') });
    fromAddress.split("\n").forEach((line, idx) => {
      page.drawText(line, { x, y: y - 115 - 15 * idx, size: 10 });
    });

    pairCount++;
    // Start a new page after every 4 address pairs, but avoid adding an extra page at the end
    if (pairCount % 4 === 0 && i !== toAddressesArray.length - 1) {
      page = pdfDoc.addPage([595, 842]); // Reassign the page variable for a new page
    }
  }

  const pdfBytes = await pdfDoc.save();

  // Download the PDF
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "addresses.pdf";
  link.click();
};

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Address PDF Generator
      </Typography>

      <TextField
        label="From Address"
        multiline
        rows={4}
        fullWidth
        value={fromAddress}
        onChange={(e) => setFromAddress(e.target.value)}
        variant="outlined"
        margin="normal"
      />

      <TextField
        label="To Addresses (Separate each address by a blank line)"
        multiline
        rows={10}
        fullWidth
        value={toAddresses}
        onChange={(e) => setToAddresses(e.target.value)}
        variant="outlined"
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "20px" }}
        onClick={generatePDF}
        disabled={!toAddresses.trim()} // Disable if "To Addresses" is empty
      >
        Generate PDF
      </Button>
      
      {/* Button to copy the message to clipboard */}
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        style={{ marginTop: "20px" }}
        onClick={copyToClipboard}
      >
        Copy Text to Clipboard
      </Button>

    </Container>
  );
};

export default App;
