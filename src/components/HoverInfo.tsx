export type HoverInfoProps = {
  mmsi?: number;
  name?: string;
  lantBatt?: number;
  position?: [x: number, y: number];
};

function HoverInfo(props: HoverInfoProps) {
  if (!props || !props.position) return null;

  return (
    <div
      className="absolute bg-gray-700 p-2 rounded"
      style={{
        left: props.position[0] + 10,
        top: props.position[1] + 10,
        pointerEvents: "none",
      }}
    >
      {props.name && <p className="font-bold">{props.name}</p>}
      {props.mmsi && <p>MMSI: {props.mmsi}</p>}
      {props.lantBatt !== undefined && (
        <p>
          <strong>Lant Battery:</strong> {props.lantBatt.toFixed(2)}V
        </p>
      )}
    </div>
  );
}

export default HoverInfo;
