const assert = require('assert');
const { deployContract, setUp, tearDown } = require('./test-helpers');

describe('System Tests', () => {
  beforeEach(async () => {
    await setUp();
  });

  afterEach(async () => {
    await tearDown();
  });

  describe('Deployment', () => {
    it('should deploy the contract', async () => {
      const contract = await deployContract();

      assert.ok(contract.options.address);
    });

    it('should have the correct initial values', async () => {
      const contract = await deployContract();

      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();

      assert.equal(name, 'DecentralizedLogistics');
      assert.equal(symbol, 'DLG');
    });
  });

  describe('Integration', () => {
    it('should allow a user to create a new shipment', async () => {
      const contract = await deployContract();

      const senderAddress = '0x1234567890123456789012345678901234567890';
      const receiverAddress = '0x2345678901234567890123456789012345678901';

      const tx = await contract.methods
        .createShipment(senderAddress, receiverAddress)
        .send({ from: accounts[0] });

      const shipment = await contract.methods.shipments(0).call();

      assert.equal(shipment.sender, senderAddress);
      assert.equal(shipment.receiver, receiverAddress);
      assert.equal(shipment.status, 'CREATED');
    });

    it('should allow a user to update the status of a shipment', async () => {
      const contract = await deployContract();

      const senderAddress = '0x1234567890123456789012345678901234567890';
      const receiverAddress = '0x2345678901234567890123456789012345678901';

      const tx1 = await contract.methods
        .createShipment(senderAddress, receiverAddress)
        .send({ from: accounts[0] });

      const tx2 = await contract.methods
        .updateShipmentStatus(0, 'SHIPPED')
        .send({ from: accounts[0] });

      const shipment = await contract.methods.shipments(0).call();

      assert.equal(shipment.status, 'SHIPPED');
    });

    it('should allow a user to cancel a shipment', async () => {
      const contract = await deployContract();

      const senderAddress = '0x1234567890123456789012345678901234567890';
      const receiverAddress = '0x2345678901234567890123456789012345678901';

      const tx1 = await contract.methods
        .createShipment(senderAddress, receiverAddress)
        .send({ from: accounts[0] });

      const tx2 = await contract.methods
        .cancelShipment(0)
        .send({ from: accounts[0] });

      const shipment = await contract.methods.shipments(0).call();

      assert.equal(shipment.status, 'CANCELED');
    });

    it('should allow a user to receive a shipment', async () => {
      const contract = await deployContract();

      const senderAddress = '0x12345678901234567890Here is the updated test suite that includes the new functionality of allowing a user to receive a shipment:

```javascript
const { expect } = require('chai');
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { deployContract } = require('./test-helpers');

describe('System Tests', () => {
  let contract;
  let accounts;

  beforeEach(async () => {
    contract = await deployContract();
    accounts = await web3.eth.getAccounts();
  });

  describe('Deployment', () => {
    it('should deploy the contract', async () => {
      expect(contract.options.address).to.be.ok;
    });

    it('should have the correct initial values', async () => {
      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();

      expect(name).to.equal('DecentralizedLogistics');
      expect(symbol).to.equal('DLG');
    });
  });

  describe('Integration', () => {
    it('should allow a user to create a new shipment', async () => {
      const senderAddress = '0x1234567890123456789012345678901234567890';
      const receiverAddress = '0x2345678901234567890123456789012345678901';

      const tx = await contract.methods
        .createShipment(senderAddress, receiverAddress)
        .send({ from: accounts[0] });

      const shipment = await contract.methods.shipments(0).call();

      expect(shipment.sender).to.equal(senderAddress);
      expect(shipment.receiver).to.equal(receiverAddress);
      expect(shipment.status).to.equal('CREATED');
    });

    it('should allow a user to update the status of a shipment', async () => {
      const senderAddress = '0x1234567890123456789012345678901234567890';
      const receiverAddress = '0x2345678901234567890123456789012345678901';

      const tx1 = await contract.methods
        .createShipment(senderAddress, receiverAddress)
        .send({ from: accounts[0] });

      const tx2 = await contract.methods
        .updateShipmentStatus(0, 'SHIPPED')
        .send({ from: accounts[0] });

      const shipment = await contract.methods.shipments(0).call();

      expect(shipment.status).to.equal('SHIPPED');
    });

    it('should allow a user to cancel a shipment', async () => {
      const senderAddress = '0x1234567890123456789012345678901234567890';
      const receiverAddress = '0x2345678901234567890123456789012345678901';

      const tx1 = await contract.methods
        .createShipment(senderAddress, receiverAddress)
        .send({ from: accounts[0] });

      const tx2 = await contract.methods
        .cancelShipment(0)
        .send({ from: accounts[0] });

      const shipment = await contract.methods.shipments(0).call();

      expect(shipment.status).to.equal('CANCELED');
    });

    it('should allow a user to receive a shipment', async () => {
      const senderAddress = '0x1234567890123456789012345678901234567890';
      const receiverAddress = '0x2345678901234567890123456789012345678901';

      const tx1 = await contract.methods
        .createShipment(senderAddress, receiverAddress)
        .send({ from: accounts[0] });

      const tx2 = await contract.methods
        .receiveShipment(0)
        .send({ from: accounts[1] });

      const shipment = await contract.methods.shipments(0).call();

      expect(shipment.status).to.equal('RECEIVED');
    });
  });
});
