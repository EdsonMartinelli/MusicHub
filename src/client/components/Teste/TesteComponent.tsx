"use client";
import { Line } from "./LineComponent";

type treeProps = {
  value: number;
  left: treeProps | null;
  right: treeProps | null;
};

type TesteComponentProps = {
  parent: treeProps | null;
  side: "left" | "right";
  node: treeProps | null;
};

export default function TesteComponent({
  node,
  parent,
  side,
}: TesteComponentProps) {
  if (node == null) {
    return null;
  }
  return (
    <>
      {parent && (
        <div
          className={`-my-6 h-24 w-full flex ${
            side == "left" ? "justify-end" : "justify-start"
          }`}
        >
          <div className="w-1/2 h-full">
            <Line side={side} />
          </div>
        </div>
      )}
      <div className="flex items-center justify-center">
        <div className="relative z-50 w-12 h-12 rounded-full bg-white flex items-center justify-center">
          {node.value}
        </div>
      </div>
      <div className="flex flex-row justify-center ">
        <div className="w-1/2">
          <TesteComponent node={node.left} parent={node} side={"left"} />
        </div>
        <div className="w-1/2">
          <TesteComponent node={node.right} parent={node} side={"right"} />
        </div>
      </div>
    </>
  );
}
