class Explorer {
  constructor() {
    this.latestBlocks = [];
    this.latestTransactions = [];
  }

  updateLatestBlocks(newBlocks) {
    this.latestBlocks = newBlocks;
  }

  updateLatestTransactions(newTransactions) {
    this.latestTransactions = newTransactions;
  }

  displayLatestBlocks() {
    this.latestBlocks.forEach((block) => {
      console.log(`Block ${block.height}: ${block.hash.substring(0, 10)}`);
    });
  }

  displayLatestTransactions() {
    this.latestTransactions.forEach((transaction) => {
      console.log(`Tx: ${transaction.hash.substring(0, 10)}`);
    });
  }
}

module.exports = Explorer;
