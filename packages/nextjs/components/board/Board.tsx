import { Card } from "./Card";
import { Player } from "./Player";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Board = () => {
  const { address } = useAccount();

  const { data: currentCard } = useScaffoldContractRead({
    contractName: "PartyCardCrasher",
    functionName: "currentCard",
  });

  const { data: currentPlayers } = useScaffoldContractRead({
    contractName: "PartyCardCrasher",
    functionName: "getCurrentPlayers",
  });

  const { data: isPay } = useScaffoldContractRead({
    contractName: "PartyCardCrasher",
    functionName: "isPay",
    args: [address],
  });

  const { data: playerCards } = useScaffoldContractRead({
    contractName: "PartyCardCrasher",
    functionName: "getPlayerCards",
    args: [address],
  });

  const { writeAsync: playGame } = useScaffoldContractWrite({
    contractName: "PartyCardCrasher",
    functionName: "playGame",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: drawCard } = useScaffoldContractWrite({
    contractName: "PartyCardCrasher",
    functionName: "drawCard",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });
  return (
    <div>
      <div className="flex">
        <div>
          {currentPlayers?.map((playerAddress, index) => {
            return address !== playerAddress && <Player address={playerAddress} yourAddress={address} key={index} />;
          })}
        </div>
        <div>
          <h1 className="mt-3 text-4xl">Deck</h1>
          <Card key={"99"} id={99} content={currentCard?.toString()} index={99} />
          {!isPay && (
            <button
              className="py-2 px-16 mb-1 mt-3 mr-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={() => playGame()}
            >
              Play Game
            </button>
          )}
          <h2 className="mt-4 text-3xl">Your Cards</h2>
          {isPay && (
            <button
              className="py-2 px-16 mb-1 mt-3 mr-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
              onClick={() => drawCard()}
            >
              Draw Card
            </button>
          )}
          <div className="flex flex-wrap" style={{ width: "350px" }}>
            {playerCards &&
              playerCards.map((val, index) => <Card key={index} id={index} content={val.toString()} index={index} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
