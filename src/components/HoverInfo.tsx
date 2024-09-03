type HoverInfoProps = {
  mmsi: number;
  name: string;
  lantBatt: number;
  x: number;
  y: number;
};

function HoverInfo({ hoverInfo }: Readonly<{ hoverInfo: HoverInfoProps }>) {
  return (
    <div
      className="absolute bg-gray-700 p-2 rounded"
      style={{
        left: hoverInfo.x + 10,
        top: hoverInfo.y + 10,
        pointerEvents: "none",
      }}
    >
      <div className="text-sm"></div>
      <p className="font-bold">{hoverInfo.name}</p>
      <p>{hoverInfo.mmsi}</p>
      <p>
        <strong>Lant Battery:</strong>
        {hoverInfo.lantBatt.toFixed(2)}
      </p>
    </div>
  );
}

export default HoverInfo;
