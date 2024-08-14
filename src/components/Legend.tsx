const Legend = () => {
  const legendItems = [
    { color: "green", device: "Beacon", status: "Good" },
    { color: "blue", device: "Buoy", status: "Good" },
    { color: "pink", device: "Lighthouse", status: "Good" },
    { color: "yellow", device: "Beacon", status: "NG" },
    { color: "orange", device: "Buoy", status: "NG" },
    { color: "red", device: "Lighthouse", status: "NG" },
  ];

  return (
    <div className="bg-gray-800 text-white absolute bottom-2 right-2 p-4 rounded-md">
      <p className="text-lg font-bold leading-none mb-4">
        Legend <br /> <span className="text-base text-gray-400">AtoN</span>
      </p>
      {legendItems.map((item, index) => (
        <p key={index + 1} className="px-2 text-gray-400 text-sm my-2">
          ✅ {item.device + ' - ' + item.status}
        </p>
      ))}
    </div>
  );
};

export default Legend;
