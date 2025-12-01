export default function App() {
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
      <div className="flex flex-col justify-between items-center max-h-[80vh] min-h-[80vh] bg-white p-2 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="bg-[#333333] w-full h-[15vh] rounded-lg"></div>

        <div className="grid grid-cols-4 bg-[#0D0D0D] w-full h-[61vh] rounded-lg p-3 gap-1">
          {buttons.map((button, index) => (
            <button className="bg-[#1C1D21] text-white text-3xl font-bold rounded-full w-[4.5rem] h-[4.5rem] justify-center items-center flex">
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
