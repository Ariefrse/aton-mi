export type HoverInfoProps = null | {
  mmsi: number;
  name: string;
  lantBatt: number;
  x: number;
  y: number;
};

function HoverInfo(props: HoverInfoProps) {
  if (!props) return;
  return (
    <div
      className="absolute bg-gray-700 p-2 rounded"
      style={{
        left: props.x + 10,
        top: props.y + 10,
        pointerEvents: "none",
      }}
    >
      <p className="font-bold">{props.name}</p>
      <p>{props.mmsi}</p>
      <p>
        <strong>Lant Battery:</strong>
        {props?.lantBatt?.toFixed(2)}
      </p>
    </div>
  );
}

export default HoverInfo;
