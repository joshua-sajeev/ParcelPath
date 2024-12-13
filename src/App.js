import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { TextField, Button, Container, Typography } from "@mui/material";

const App = () => {
  const [fromAddress, setFromAddress] = useState(
    `Default Address Line 1\nDefault Address Line 2\nCity, State, ZIP`
  );
  const [toAddresses, setToAddresses] = useState("");

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
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

      // Draw "From" address
      page.drawText("From:", { x, y, size: 12, color: rgb(0, 0, 0) });
      fromAddress.split("\n").forEach((line, idx) => {
        page.drawText(line, { x, y: y - 15 * (idx + 1), size: 10 });
      });

      // Draw "To" address
      page.drawText("To:", { x, y: y - 100, size: 12, color: rgb(0, 0, 0) });
      toAddressesArray[i].split("\n").forEach((line, idx) => {
        page.drawText(line, { x, y: y - 115 - 15 * idx, size: 10 });
      });

      pairCount++;
      if (pairCount % 4 === 0 && i !== toAddressesArray.length - 1) {
        const newPage = pdfDoc.addPage([595, 842]);
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
      >
        Generate PDF
      </Button>
    </Container>
  );
};

export default App;
