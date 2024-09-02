
import { AtonDataForTable, AtonStore } from "../declarations/types/types";
import { allAtonData } from "../dummy-data/all-aton";
import { useAtonStore } from "../store/store";

export default function TableModule() {
  const {  } = useAtonStore()

  const headers = Object.keys(allAtonData[0]);

  // function transformAtonArray(atonArray: AtonDetailedData[]): AtonDataForTable[] {
  //   return atonArray.flatMap((aton) =>
  //     aton.data.map((data) => ({
  //       mmsi: aton.mmsi,
  //       type: aton.type,
  //       name: aton.name,
  //       al_mmsi: aton.al_mmsi,
  //       al_type: aton.al_type,
  //       al_name: aton.al_name,
  //       ...data,
  //     }))
  //   );
  // }

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="relative w-full h-full bg-gray-900 bg-opacity-50 shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto h-[98%] w-[98%] m-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {allAtonData.map((atonData: AtonStore) => (
                  <tr key={atonData.mmsi}>
                    {headers.map((header) => (
                      <td
                        key={header}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                      >
                        {atonData[header]}
                      </td>
                    ))}
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit<span className="sr-only">, {atonData.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
