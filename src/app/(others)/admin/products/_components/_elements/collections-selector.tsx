import React from "react";

interface CollectionsSelectorProps {
  collections: any[];
  selectedCollections: string[];
  onCollectionsChange: (collections: string[]) => void;
}

export const CollectionsSelector: React.FC<CollectionsSelectorProps> = ({
  collections,
  selectedCollections,
  onCollectionsChange,
}) => {
  const handleCollectionToggle = (collectionId: string) => {
    const newSelected = selectedCollections.includes(collectionId)
      ? selectedCollections.filter((id) => id !== collectionId)
      : [...selectedCollections, collectionId];

    onCollectionsChange(newSelected);
  };

  const selectedCollectionsList = collections.filter((c) =>
    selectedCollections.includes(c.id)
  );
  const unselectedCollections = collections.filter(
    (c) => !selectedCollections.includes(c.id)
  );

  return (
    <div className="space-y-4">
      {selectedCollectionsList.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-green-700 mb-2">
            Selected Collections ({selectedCollectionsList.length})
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {selectedCollectionsList.map((collection) => (
              <button
                key={collection.id}
                type="button"
                onClick={() => handleCollectionToggle(collection.id)}
                className="flex items-center justify-between p-2 bg-green-50 hover:bg-green-100 text-green-700 text-sm"
              >
                <span>{collection.name}</span>
                <input
                  type="checkbox"
                  checked={true}
                  readOnly
                  className="h-4 w-4 text-primary-500 focus:ring-primary-300 focus:ring-1"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {unselectedCollections.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">
            Available Collections ({unselectedCollections.length})
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
            {unselectedCollections.map((collection) => (
              <button
                key={collection.id}
                type="button"
                onClick={() => handleCollectionToggle(collection.id)}
                className="flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm"
              >
                <span>{collection.name}</span>
                <input
                  type="checkbox"
                  checked={false}
                  readOnly
                  className="h-4 w-4 text-primary-500 focus:ring-primary-300 focus:ring-1"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {collections.length === 0 && (
        <p className="text-sm text-gray-500">No collections available</p>
      )}
    </div>
  );
};
