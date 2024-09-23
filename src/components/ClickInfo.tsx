import { AtonType } from "../declarations/types/types";

export type ClickInfoProps = null | {
  name?: string;
  mmsi?: number;
  type?: AtonType;
  position: {
    lat: number;
    lng: number;
  };
};

export default function ClickInfo(props: ClickInfoProps) {
  return (
    <div className="absolute top-2 right-2 bg-gray-800 text-white p-4 rounded-md shadow-lg">
      <h2 className="text-lg font-bold">{props?.name}</h2>
      <p>MMSI: {props?.mmsi}</p>
      <p>Type: {props?.type}</p>
      <p>Latitude: {props?.position?.lat?.toFixed(3)}</p>
      <p>Longitude: {props?.position?.lng?.toFixed(3)}</p>
    </div>
  );
}