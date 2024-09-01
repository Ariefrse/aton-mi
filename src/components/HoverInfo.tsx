
export type HoverInfoProps = {
  latitude: number;
  longitude: number;
  lantBatt: number;
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
        <strong>Latitude:</strong> {hoverInfo.latitude}
        <br />
        <strong>Longitude:</strong> {hoverInfo.longitude}
        <br />
        <strong>Lant Battery:</strong> {hoverInfo.lantBatt}
        <br />
      </div>
    </div>
  );
}

export default HoverInfo;
