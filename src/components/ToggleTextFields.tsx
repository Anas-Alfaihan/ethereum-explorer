import React, { useState } from "react";
import { getLastBlockNumber, getUsdtBalance } from "eth-balance-tracker";

const ToggleTextFields: React.FC = () => {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const getBalance = async () => {
    if (address.length) {
      try {
        const balance = await getUsdtBalance({
          INFURA_PROJECT_ID: "bd4eb180b1cc4aea9c9eaa5e13c700f4",
          Address: address,
        });
        setResult(`USDT Balance: ${Number(balance) / 1e6} usdt`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getBlock = async () => {
    const block = await getLastBlockNumber({
      INFURA_PROJECT_ID: "bd4eb180b1cc4aea9c9eaa5e13c700f4",
    });
    setResult(`Last Mainnet Block: ${block.toString()}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  return (
    <div className="flex flex-col items-center  text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Ethereum Explorer</h1>
      <div className="max-w-md w-full">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={getBalance}
        >
          Get Balance
        </button>
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={getBlock}
        >
          Get Last Mainnet Block
        </button>
        <input
          type="text"
          className="w-full border border-gray-400 rounded p-2 mb-2 bg-gray-800 text-white"
          placeholder="Enter Ethereum Address"
          value={address}
          onChange={handleInputChange}
        />
        {result && (
          <div className="border p-2 rounded bg-gray-800 mb-2">
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleTextFields;
