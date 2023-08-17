import { Card } from "./Card";

const gridData = [
  {
    id: 0,
    content: "5",
  },
  {
    id: 1,
    content: "3",
  },
  {
    id: 2,
    content: "2",
  },
];
export const Board = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <h2 className="mt-4 text-3xl">Your Cards</h2>
          <div className="flex flex-wrap" style={{ width: "350px" }}>
            {gridData &&
              gridData.map((item, index) => (
                <Card
                  key={item.id.toString()}
                  id={item.id.toString()}
                  content={item.content.toString()}
                  index={index}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
