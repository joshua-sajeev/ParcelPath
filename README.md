# Address PDF Generator

This is a simple React application for generating a PDF document with "From" and "To" addresses formatted in pairs. The app allows users to:

1. Enter a "From Address."
2. Enter multiple "To Addresses," each separated by a blank line.
3. Generate a PDF file with these addresses formatted into pairs on an A4-sized page.
4. Copy a helpful message to the clipboard for correctly formatting the addresses.

## Features

- **From Address Input**: Enter the sender's address, which will be included in the PDF.
- **To Addresses Input**: Enter multiple recipient addresses, separated by a blank line for each address.
- **PDF Generation**: Automatically formats the addresses into pairs on each page (up to 4 pairs per page).
- **Clipboard Copy**: A button to copy a helpful message for address formatting.
- **Responsive Design**: User-friendly interface built with Material-UI.

## How to Use

1. Enter the "From Address" in the first text field.
2. Enter the "To Addresses" in the second text field. Ensure each address is separated by a blank line.
3. Click the "Generate PDF" button. A PDF file containing the addresses will be created and downloaded automatically.
4. (Optional) Click the "Copy Text to Clipboard" button to copy instructions for formatting addresses.

## Example Input for "To Addresses"
```
John Doe
123 Main Street
Springfield, IL 62701

Jane Smith
456 Elm Street
Greenfield, CA 93927
```
