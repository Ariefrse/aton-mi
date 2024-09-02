
type HoverInfoProps = {
  mmsi: number;
  name: string;
  // lantBatt: number;
  x: number;
  y: number;
};

function HoverInfo({ hoverInfo }: { hoverInfo: HoverInfoProps }) {
  return (
    <div
      className="absolute bg-gray-700 p-2 rounded"
      style={{
        left: hoverInfo.x + 10,
        top: hoverInfo.y + 10,
        pointerEvents: "none",
      }}
    >
      <div>
        <p className="font-bold">{hoverInfo.name}</p>
        <br />
        <p>{hoverInfo.mmsi}</p>
        <br />
        {/* <strong>Lant Battery:</strong> {hoverInfo.lantBatt} */}
        <br />
      </div>
    </div>
  );
}

export default HoverInfo;
