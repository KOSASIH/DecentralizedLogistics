// Function to validate the business requirements for a shipment
const validateBusinessRequirements = (shipmentData) => {
  const {
    sender,
    receiver,
    origin,
    destination,
    goods,
    shippingDate,
    deliveryDate,
  } = shipmentData;

  // Validate the sender
  if (!sender) {
    throw new Error("Sender is required");
  }

  // Validate the receiver
  if (!receiver) {
    throw new Error("Receiver is required");
  }

  // Validate the origin
  if (!origin) {
    throw new Error("Origin is required");
  }

  // Validate the destination
  if (!destination) {
    throw new Error("Destination is required");
  }

  // Validate the goods
  if (!goods || !goods.description || !goods.quantity) {
    throw new Error("Goods description and quantity are required");
  }

  // Validate the shipping date
  if (!shippingDate) {
    throw new Error("Shipping date is required");
  }

  // Validate the delivery date
  if (!deliveryDate) {
    throw new Error("Delivery date is required");
  }

  // Check if the delivery date is after the shipping date
  if (new Date(deliveryDate) <= new Date(shippingDate)) {
    throw new Error("Delivery date must be after shipping date");
  }

  // Additional business rules and validation checks can be added here

  // If all checks pass, return true
  return true;
};

// Sample usage
const shipmentData = {
  sender: "John Doe",
  receiver: "Jane Smith",
  origin: "New York, NY",
  destination: "Los Angeles, CA",
  goods: {
    description: "T-shirts",
    quantity: 100,
  },
  shippingDate: "2022-08-01",
  deliveryDate: "2022-08-10",
};

try {
  const isValid = validateBusinessRequirements(shipmentData);
  console.log("Shipment data is valid");
} catch (error) {
  console.log("Error validating shipment data:", error.message);
}
