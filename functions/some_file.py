from generateQRCode import generate_shipment_qr_code

# Create a sample shipment dictionary
sample_shipment = {
    "id": "123456",
    "sender": "John Doe",
    "recipient": "Jane Smith",
    "status": "in-transit"
}

# Generate the QR code
qr_code_url = generate_shipment_qr_code("qr_code_bucket", sample_shipment)

# Print the URL
print(qr_code_url)
