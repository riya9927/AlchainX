// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AlchainXModel
 * @dev ERC1155 contract for tokenizing AI models.
 * Each model is a unique token type (ID).
 */
contract AlchainXModel is ERC1155, Ownable {
    uint256 public nextTokenId;

    // Event to be emitted when a new model is tokenized
    event ModelTokenized(
        uint256 indexed tokenId,
        address indexed owner,
        string modelName,
        string modelDescription,
        string license
    );

    constructor() ERC1155("https://alchain-x.vercel.app/api/token/{id}.json") Ownable(msg.sender) {
        nextTokenId = 1; // Start token IDs from 1
    }

    /**
     * @dev Mints a new AI model as an NFT.
     * The caller of this function becomes the owner of the new token.
     * @param modelName Name of the AI model.
     * @param modelDescription A short description of the model.
     * @param license The license type for the model.
     */
    function mintModel(
        string memory modelName,
        string memory modelDescription,
        string memory license
    ) public returns (uint256) {
        uint256 tokenId = nextTokenId;
        
        // Mints 1 copy of the token with the new ID to the caller
        _mint(msg.sender, tokenId, 1, "");

        // Emit an event to log the details on-chain
        emit ModelTokenized(tokenId, msg.sender, modelName, modelDescription, license);
        
        // Increment the ID for the next model
        nextTokenId++;
        
        return tokenId;
    }
}