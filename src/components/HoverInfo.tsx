import { AtonType } from "../declarations/dtos/dtos";

type HoverInfoProps = {
  structure: AtonType;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  atonbatt: number;
  lantBatt: number;
  offPosition: string;
  ambient: string;
  light: number;
  localTime: string;
  utcTime: string;
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
        <strong>Position:</strong> {hoverInfo.name}
        <br />
        <strong>Region:</strong> {hoverInfo.region}
        <br />
        <strong>Latitude:</strong> {hoverInfo.latitude}
        <br />
        <strong>Longitude:</strong> {hoverInfo.longitude}
        <br />
        <strong>Aton Battery:</strong> {hoverInfo.atonbatt}
        <br />
        <strong>Lant Battery:</strong> {hoverInfo.lantBatt}
        <br />
        <strong>Offset Position:</strong> {hoverInfo.offPosition}
        <br />
        <strong>Ambient:</strong> {hoverInfo.ambient}
        <br />
        <strong>Light:</strong> {hoverInfo.light}
        <br />
        <strong>Local Time:</strong> {hoverInfo.localTime}
        <br />
        <strong>UTC Time:</strong> {hoverInfo.utcTime}
      </div>
    </div>
  );
}

export default HoverInfo