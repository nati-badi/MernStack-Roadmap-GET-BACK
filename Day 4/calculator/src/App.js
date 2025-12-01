import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");

  const buttons = [
    "C",
    "±",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  const isOperator = (val) => ["+", "-", "*", "/"].includes(val);

  const handleClick = (btn) => {
    if (btn === "C") return setInput("");

    if (btn === "=") {
      try {
        setInput(String(eval(input)));
      } catch {
        setInput("Error");
      }
      return;
    }

    if (btn === "±") {
      if (!input) return;
      return setInput(String(Number(input) * -1));
    }

    if (btn === "%") {
      if (!input) return;
      return setInput(String(Number(input) / 100));
    }

    if (isOperator(btn)) {
      if (!input) return;
      const last = input[input.length - 1];

      if (isOperator(last)) {
        return setInput(input.slice(0, -1) + btn);
      }

      return setInput(input + btn);
    }

    if (btn === ".") {
      const parts = input.split(/[\+\-\*\/]/);
      const last = parts[parts.length - 1];
      if (last.includes(".")) return;
    }

    setInput(input + btn);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#141E30] to-[#243B55] p-4">
      <div className="flex flex-col justify-between items-center bg-white/10 backdrop-blur-2xl p-5 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        {/* Display */}
        <div className="w-full min-h-[100px] bg-black/40 text-right text-white rounded-2xl p-5 text-5xl font-light tracking-wider shadow-inner border border-white/10">
          {input || "0"}
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3 mt-6 w-full">
          {buttons.map((button, i) => {
            const isZero = button === "0";
            const isOp = ["/", "*", "-", "+", "="].includes(button);
            const isFunc = ["C", "±", "%"].includes(button);

            return (
              <button
                key={i}
                onClick={() => handleClick(button)}
                className={`
                  ${isZero ? "col-span-2" : ""}
                  ${
                    isOp
                      ? "bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-900/50"
                      : isFunc
                      ? "bg-gradient-to-br from-gray-300 to-gray-100 text-black"
                      : "bg-gradient-to-br from-[#1F1F1F] to-[#2D2D2D]"
                  }
                  ${isOp ? "text-white" : isFunc ? "text-black" : "text-white"}
                  h-20 rounded-2xl text-3xl font-semibold flex justify-center items-center
                  shadow-lg active:scale-95 transition-all duration-150
                `}
              >
                {button}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
