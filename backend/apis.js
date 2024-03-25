const express = require('express');
const Web3 = require('web3');
const OasisSupplyChainABI = require('../OasisSupplyChainABI.json');
const web3 = new Web3('ENTER YOUR ETHEREUM NODE URL');
const contractAddress = 'ENTER YOUR OASIS_SUPPLY_CHAIN_CONTRACT_ADDRESS';
const contract = new web3.eth.Contract(OasisSupplyChainABI, contractAddress);
const router = express.Router();

router.post('/orderItem', async (req, res) => {
  try {
    const { itemName } = req.body;
    const accounts = await web3.eth.getAccounts();
    const orderItemResponse = await contract.methods.orderItem(itemName).send({ from: accounts[0] });
    res.status(200).json({ success: true, message: 'Item ordered successfully', data: orderItemResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/approveItem', async (req, res) => {
  try {
    const { itemId, approver } = req.body;
    const accounts = await web3.eth.getAccounts();
    const approveItemResponse = await contract.methods.approveItem(itemId, approver).send({ from: accounts[0] });
    res.status(200).json({ success: true, message: 'Item approved successfully', data: approveItemResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/cancelItem', async (req, res) => {
  try {
    const { itemId } = req.body;
    const accounts = await web3.eth.getAccounts();
    const cancelItemResponse = await contract.methods.cancelItem(itemId).send({ from: accounts[0] });
    res.status(200).json({ success: true, message: 'Item canceled successfully', data: cancelItemResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/shipItem', async (req, res) => {
  try {
    const { itemId, shipper } = req.body;
    const accounts = await web3.eth.getAccounts();
    const shipItemResponse = await contract.methods.shipItem(itemId, shipper).send({ from: accounts[0] });
    res.status(200).json({ success: true, message: 'Item shipped successfully', data: shipItemResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/searchItems', async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const items = await contract.methods.searchItems(searchTerm).call();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
