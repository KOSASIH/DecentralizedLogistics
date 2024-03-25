import React, { useState } from 'react';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { OasisSupplyChainABI } from '../OasisSupplyChainABI';

import { InputField } from './InputField';

function useOrderItem() {
  const [itemName, setItemName] = useState('');

  const { config } = usePrepareContractWrite({
    address: "ENTER YOUR OASIS_SUPPLY_CHAIN_CONTRACT_ADDRESS",
    abi: OasisSupplyChainABI,
    functionName: 'orderItem',
    args: [itemName],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const orderItem = async () => {
    if (write) {
      write();
    }
  };

  return {
    isLoading,
    orderItem,
    itemName,
    setItemName,
    isSuccess,
  };
}

export default function SupplyChain() {
  const { isLoading, orderItem, itemName, setItemName, isSuccess } = useOrderItem();

  return (
    <div className="p-4">
      <InputField
        placeholder="Enter item name..."
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isLoading}
        onClick={orderItem}
      >
        Order
      </button>
      {isSuccess && <p>Item ordered successfully!</p>}
    </div>
  );
}
