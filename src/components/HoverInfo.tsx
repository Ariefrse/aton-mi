export type HoverInfoProps = null | {
  mmsi: number;
  name: string;
  lantBatt: number;
  position: [x:number, y:number]
};

function HoverInfo(props: HoverInfoProps) {
  if (!props) return;
  return (
    <div
      className="absolute bg-gray-700 p-2 rounded"
      style={{
        left: props.position[0] + 10,
        top: props.position[1] + 10,
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
