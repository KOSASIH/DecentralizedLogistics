import db

def get_shipment_info(shipment_id):
    """
    Retrieves information about a specific shipment from the database.

    Arguments:
        shipment_id (int) -- The ID of the shipment to retrieve.

    Returns:
        dict -- A dictionary containing information about the shipment,
            including the ID, origin, destination, and status.

    Raises:
        ValueError: If the shipment ID does not exist in the database.
    """

    shipment = db.get_shipment(shipment_id)

    if shipment is None:
        raise ValueError("Shipment ID not found in database.")

    return {
        "ID": shipment["ID"],
        "origin": shipment["origin"],
        "destination": shipment["destination"],
        "status": shipment["status"],
    }
