const qrcode = require('qrcode');
const sharp = require('sharp');

// Define the QR code settings
const qrSettings = {
  errorCorrectionLevel: 'H',
  typeNumber: 7,
  mode: 'byte',
  quietZone: 0,
  maskPattern: 4
};

// Define the label dimensions
const labelWidth = 400;
const labelHeight = 220;

// Define the background color
const backgroundColor = 'white';

// Define the font size and color
const fontSize = 14;
const fontColor = 'black';

// Define the label layout
const labelLayout = {
  topLeft: { x: 20, y: 20 },
  topRight: { x: labelWidth - 20, y: 20 },
  bottomLeft: { x: 20, y: labelHeight - 20 },
  bottomRight: { x: labelWidth - 20, y: labelHeight - 20 },
  textOffsetX: 10,
  textOffsetY: 10
};

// Generate a QR code
const generateQRCode = async (data) => {
  try {
    const qrGenerated = await qrcode.toDataURL(data, qrSettings);
    return qrGenerated;
  } catch (error) {
    throw error;
  }
};

// Generate the label
const generateShippingLabel = async (shipment) => {
  try {
    // Generate the QR code
    const qrData = `${process.env.SHIPMENT_BASE_URL}/view/${shipment.id}`;
    const qrCode = await generateQRCode(qrData);

    // Create a new label
    const label = new sharp(labelWidth, labelHeight, backgroundColor);

    // Add the QR code
    label
      .composite([
        {
          input: qrCode
        }
      ])
      .toFile('label.png');

    // Add the shipment information
    label
      .text({
        font: `${fontSize}px sans-serif`,
        color: fontColor,
        background: { r: 255, g: 255, b: 255, alpha: 0.5 },
        trim: true
      })
      .text(shipment.sender.name, labelLayout.topLeft.x + labelLayout.textOffsetX, labelLayout.topLeft.y + labelLayout.textOffsetY);

    // Add the destination information
    label
      .text({
        font: `${fontSize}px sans-serif`,
        color: fontColor,
        background: { r: 255, g: 255, b: 255, alpha: 0.5 },
        trim: true
      })
      .text(`${shipment.destination.name}\n${shipment.destination.address.street}\n${shipment.destination.address.city}, ${shipment.destination.address.state} ${shipment.destination.address.zip}`, labelLayout.bottomLeft.x + labelLayout.textOffsetX, labelLayout.bottomLeft.y + labelLayout.textOffsetY);

    // Save the label
    await label.toFile(`shipping_label_${shipment.id}.png`);

    return `shipping_label_${shipment.id}.png`;
  } catch (error) {
    throw error;
  }
};

// Example usage
// Generate a shipping label for a sample shipment
const shipment = {
  sender: {
    name: 'John Doe',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    }
  },
  destination: {
    name: 'Jane Doe',
    address: {
      street: '456 Park Ave',
      city: 'Othertown',
      state: 'NY',
      zip: '67890'
    }
  },
  id: '1234567890'
};

generateShippingLabel(shipment);
