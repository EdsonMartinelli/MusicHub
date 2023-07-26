import TesteComponent from "@/client/components/Teste/TesteComponent";

const info = {
  value: 10,
  left: {
    value: 5,
    left: {
      value: 3,
      left: null,
      right: null,
    },
    right: {
      value: 7,
      left: null,
      right: null,
    },
  },
  right: {
    value: 15,
    left: {
      value: 13,
      left: null,
      right: {
        value: 14,
        left: null,
        right: null,
      },
    },
    right: {
      value: 17,
      left: {
        value: 23,
        left: {
          value: 20,
          left: null,
          right: null,
        },
        right: {
          value: 27,
          left: null,
          right: null,
        },
      },
      right: null,
    },
  },
};
export default function Teste() {
  return (
    <div className="text-zinc-950 w-full">
      <TesteComponent node={info} parent={null} side={"left"} />
    </div>
  );
}
