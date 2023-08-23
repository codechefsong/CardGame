import { useRef } from "react";
import { useRouter } from "next/router";
import { useDrag, useDrop } from "react-dnd";

export const Card = ({ id, content, index }: any) => {
  const router = useRouter();

  const handleDrop = async (item: any, index: any) => {
    console.log(item, index);
    router.push("/confirm/play/" + item.id);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CELL",
    item: { id, index, content },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "CELL",
    drop: item => handleDrop(item, index),
  }));

  const cellRef = useRef(null);

  drag(drop(cellRef));

  return (
    <div
      ref={cellRef}
      className="w-16 h-20 border border-gray-300 flex items-center justify-center font-bold mr-2 bg-white mb-2"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {content}
    </div>
  );
};
