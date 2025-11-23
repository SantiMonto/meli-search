interface Attribute {
  id: string;
  name: string;
  valueName: string;
}

interface ProductAttributesProps {
  attributes: Attribute[];
}

export function ProductAttributes({ attributes }: ProductAttributesProps) {
  if (!attributes || attributes.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Características principales
      </h2>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-200 bg-white">
            {attributes.map((attr, index) => (
              <tr
                key={attr.id}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 w-1/3">
                  {attr.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {attr.valueName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
