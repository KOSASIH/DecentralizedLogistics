import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { OasisSupplyChainABI } from '../OasisSupplyChainABI';

export function OrderItem() {
  const [itemName, setItemName] = React.useState('');
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter item name:</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={orderItem}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>Order</Text>
      </TouchableOpacity>
      {isSuccess && <Text style={styles.successText}>Item ordered successfully!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    fontSize: 16,
    marginTop: 20,
  },
});
