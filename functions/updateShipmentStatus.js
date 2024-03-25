// Function to update the status of a shipment
const updateShipmentStatus = (shipmentId, newStatus) => {
  // Fetch the current shipment data
  const [shipment] = shipments.filter(s => s.id === shipmentId);

  // Check if the shipment exists
  if (!shipment) {
    throw new Error(`No shipment found with ID ${shipmentId}`);
  }

  // Check if the provided status is valid
  const validStatuses = ['pending', 'in_transit', 'delivered', 'cancelled'];
  if (!validStatuses.includes(newStatus)) {
    throw new Error('Invalid status. Valid statuses: pending, in_transit, delivered, cancelled.');
  }

  // Update the shipment status
  shipment.status = newStatus;

  // Save the updated shipment data
  saveShipments();

  // Return the updated shipment
  return shipment;
};

// Example usage
const updatedShipment = updateShipmentStatus(123, 'delivered');
console.log('Shipment updated:', updatedShipment);
