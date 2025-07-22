import { ethers } from "ethers";

// IMPORTANT: After you deploy your contract, you must paste its address here.
const contractAddress = "0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3"; 

// This is the Application Binary Interface (ABI).
// It's a description of the smart contract's functions.
const contractABI = [
    "function mintModel(address to, string memory modelName)"
];

// Function to connect to the user's MetaMask wallet.
export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts",);
            const signer = await provider.getSigner();
            return {
                status: "Wallet connected.",
                address: await signer.getAddress()
            };
        } catch (error) {
            return {
                status: `Error: ${error.message}`
            };
        }
    } else {
        return {
            status: "You must install MetaMask in your browser."
        };
    }
};

// Function to call the `mintModel` function on the smart contract.
export const mintModelOnChain = async (modelName) => {
    if (!window.ethereum ||!modelName) {
        return { status: "Please connect wallet and enter a model name." };
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.mintModel(await signer.getAddress(), modelName);
        console.log("Transaction sent:", tx.hash);
        await tx.wait(); // Wait for the transaction to be mined
        return {
            status: `✅ Model "${modelName}" minted successfully! Check your wallet.`
        };
    } catch (error) {
        return {
            status: `Error: ${error.message}`
        };
    }
};