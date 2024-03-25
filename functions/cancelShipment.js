const cancelShipment = async (shipmentId, reason) => {
  // 1. Fetch the shipment from the database by ID
  const shipment = await db.shipments.get(shipmentId);

  // 2. Check if the shipment exists
  if (!shipment) {
    throw new Error(`Shipment with ID ${shipmentId} not found`);
  }

  // 3. Check if the user has permission to cancel the shipment
  // This can be implemented based on your business logic

  // 4. Check if the shipment has already been cancelled
  if (shipment.status === 'cancelled') {
    throw new Error(`Shipment with ID ${shipmentId} has already been cancelled`);
  }

  // 5. Update the shipment status and reason
  shipment.status = 'cancelled';
  shipment.cancellationReason = reason;

  // 6. Save the updated shipment to the database
  await db.shipments.put(shipment);

  // 7. Optionally, send notifications to relevant parties
  // for example, send an email to the shipper, consignee, and other stakeholders

  return shipment;
};

module.exports = {
  cancelShipment
};
