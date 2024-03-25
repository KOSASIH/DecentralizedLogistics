import qrcode
import uuid
from io import BytesIO
from google.cloud import storage

def generate_shipment_qr_code(bucket_name, shipment, size=10, border=4):
    """
    Generate a QR code for a shipment and upload it to Google Cloud Storage

    Parameters:
        bucket_name (str): The name of the Google Cloud Storage bucket
        shipment (dict): A dictionary containing the shipment data
        size (int): The size of the QR code
        border (int): The border width of the QR code

    Returns:
        str: The URL of the uploaded QR code image

    """

    # Generate the QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=size,
        border=border
    )

    # Create a string of the shipment data
    shipment_data = str(shipment)

    # Add the data to the QR code
    qr.add_data(shipment_data)

    # Make the QR code
    qr.make(fit=True)

    # Create an image in memory
    img = qr.make_image(fill='black', back_color='white')

    # Save the image to memory
    buf = BytesIO()

    # Save the image as PNG
    img.save(buf, "PNG")

    # Upload the image to Google Cloud Storage
    upload_blob_from_memory(bucket_name, buf, f'shipment_{shipment["id"]}.png')

    # Return the URL of the uploaded image
    url = f'https://storage.googleapis.com/{bucket_name}/shipment_{shipment["id"]}.png'

    return url
