const calculateShipmentCost = (baseCost, weight) => {
  const maxWeight = 100;
  const costPerUnit = 0.1;

  if (weight > maxWeight) {
    throw new Error('Maximum allowed weight exceeded');
  }

  const cost = baseCost + weight * costPerUnit;

  return cost;
};

// Example usage
const baseCost = 100;
const weight = 50;

const shipmentCost = calculateShipmentCost(baseCost, weight);

console.log(`The cost of the shipment is: ${shipmentCost}`);
