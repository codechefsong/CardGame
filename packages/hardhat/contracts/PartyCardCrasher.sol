//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract PartyCardCrasher {
  // State Variables
  address public immutable owner;
  uint256 currentCard = 5;
  mapping(address => uint256[]) public playerCards;
  mapping(address => bool) public isPay;

  constructor(address _owner) {
    owner = _owner;
  }

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function playGame() public {
    isPay[msg.sender] = true;
    uint256[] memory cards = drawCards(7);
    playerCards[msg.sender] = cards;
  }

  function playCard(uint256 index) public {
    require(index < playerCards[msg.sender].length, "You do not have this card");

    for (uint i = index; i < playerCards[msg.sender].length - 1; i++) {
      playerCards[msg.sender][i] = playerCards[msg.sender][i + 1];
    }

    playerCards[msg.sender].pop();
  }

  function drawCard() public {
    uint256 _randomNumber = uint(keccak256(abi.encode(block.timestamp, msg.sender))) % 9;
    playerCards[msg.sender].push(_randomNumber + 1);
  }

  function drawCards(uint numberOfCards) internal view returns (uint256[] memory) {
    uint256[] memory currentCards = new uint256[](numberOfCards);

    for(uint i = 0; i < numberOfCards; i++){
      uint256 _randomNumber = uint(keccak256(abi.encode(block.timestamp, msg.sender, i))) % 9;
      currentCards[i] = _randomNumber + 1;
    }

    return currentCards;
  }

  function getPlayerCards(address player) public view returns (uint256[] memory) {
    return playerCards[player];
  }

  /**
   * Function that allows the owner to withdraw all the Ether in the contract
   * The function can only be called by the owner of the contract as defined by the isOwner modifier
   */
  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }

  /**
   * Function that allows the contract to receive ETH
   */
  receive() external payable {}
}
