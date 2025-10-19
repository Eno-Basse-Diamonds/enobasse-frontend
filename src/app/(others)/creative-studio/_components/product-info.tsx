import type { RingConfiguration } from "../../../../lib/types/creative-studio";
import { getFullMetalName, getRingName } from "@/lib/utils/creative-studio";

interface ProductInfoProps {
  configuration: RingConfiguration;
}

export function ProductInfo({ configuration }: ProductInfoProps) {
  const ringName = getRingName(
    configuration.headStyle,
    configuration.shankStyle
  );
  const metalName = getFullMetalName(
    configuration.metalType,
    configuration.karat
  );

  return (
    <div className="mb-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-medium text-primary-500 font-primary">
            {ringName}
          </h1>
          <div className="mt-4 lg:mt-6">
            <p className="text-lg lg:text-xl font-medium text-primary-500">
              Price available upon request
            </p>
            <p className="font-medium text-gray-600 mt-2">
              You can request a quote using the link below or by calling by
              phone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
