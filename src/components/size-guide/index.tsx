import Image from "next/image";
import { ringSizeGuide } from "@/lib/utils/constants/ring-size-guide";

export const SizeGuide: React.FC = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      <div className="flex-1 overflow-auto bg-primary-500/10 p-4 lg:p-8">
        <div className="mx-auto max-w-3xl bg-white">
          <div className="p-6 text-center">
            <div className="mx-auto mb-4 flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/enobasse/image/upload/v1756506781/logo_gvieez.png"
                alt="Eno Bassé Diamonds Logo"
                height={30}
                width={30}
              />
            </div>
            <h4 className="font-primary text-lg font-semibold text-gray-800">
              Eno Bassé Diamonds
            </h4>
            <p className="text-sm text-gray-600">Determine Your Ring Size</p>
            <p className="mt-2 text-xs text-gray-500">
              Should you require any assistance finding your ring size, please
              contact us.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="sticky top-0 bg-primary-500 text-white">
                    <th className="border border-gray-300 p-2">USA</th>
                    <th className="border border-gray-300 p-2">FRA</th>
                    <th className="border border-gray-300 p-2">UK / AUS</th>
                    <th className="border border-gray-300 p-2">GER / RUS</th>
                    <th className="border border-gray-300 p-2">
                      ITA / ESP / NED
                    </th>
                    <th className="border border-gray-300 p-2">
                      IND / CHN / JAP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ringSizeGuide.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-300 p-2 text-center"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
