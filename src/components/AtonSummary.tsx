import { Fragment } from "react";
import { useAtonStore } from "../store/store";

const AtonSummary = () => {
  const { setSelectedAton, toggles, setToggles } = useAtonStore();

  const atonSummaryInfoData = {
    atonType: ["Buoy", "Lighthouse", "Beacon"],
    atonDetails: [
      { title: "Total Sites", unit: 480 },
      { title: "No Messages", unit: 13, percentage: 1.27 },
      { title: "Light Error", unit: 1, percentage: 13.27 },
      { title: "Low LDR Lantern", unit: 50, percentage: 26.54 },
      { title: "Bad LDR", unit: 26, percentage: 50.14 },
      { title: "Off Position", unit: 7, percentage: 7.14 },
    ],
  };

  return (
    <aside className="min-w-max bg-gray-800 z-10 text-white p-10 rounded-lg shadow-lg max-w-xs">
      <div className="flex justify-between items-center mb-4">
        <div className="w-auto">
          <h2 className="text-xl font-bold whitespace-nowrap">
            AtoN Summary
            <span className="text-sm text-gray-400 pl-2 whitespace-nowrap">
              (23/07/2024)
            </span>
          </h2>
        </div>
        <button
          className="text-white w-4"
          onClick={() =>
            setToggles({
              ...toggles,
              atonSummary: false,
              atonSummaryToggleBtn: true,
            })
          }
        >
          X
        </button>
      </div>
      <hr className="my-2 border-gray-600" />
      <p className="my-2">Structure</p>
      {atonSummaryInfoData.atonType.map((struct, index) => (
        <div key={index + 1} className="flex items-center mb-2">
          <input type="checkbox" name={struct} id={struct} />
          <label className="ml-2">{struct}</label>
        </div>
      ))}
      <hr className="my-2 border-gray-600" />
      <div className="mb-4 text-sm">
        {atonSummaryInfoData.atonDetails.map((info, index) => (
          <Fragment key={index + 1}>
            <div className="flex gap-4">
              <p
                className="flex-1 whitespace-nowrap"
                onClick={() => setSelectedAton("Buoy")}
              >
                {info.title}
              </p>
              <p className="text-right whitespace-nowrap">{info.unit}</p>
              <p>{info.percentage}%</p>
            </div>
            {index < atonSummaryInfoData.atonDetails.length - 1 && (
              <hr className="my-2 border-gray-600" />
            )}
          </Fragment>
        ))}
        <button
          className="absolute bottom-2 right-2 bg-red-600 rounded-full w-10 h-10"
          onClick={() =>
            setToggles({
              ...toggles,
              messageCountOverview: !toggles.messageCountOverview,
            })
          }
        />
      </div>
    </aside>
  );
};

export default AtonSummary;
