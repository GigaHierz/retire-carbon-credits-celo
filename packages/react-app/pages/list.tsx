import { useEffect, useState } from "react";
import ToucanClient, { UserRetirementsResponse } from "toucan-sdk";
import { useAccount } from "wagmi";

export default function List() {
  const toucan = new ToucanClient("alfajores");
  const { address } = useAccount();

  const [retirements, setRetirements] = useState<UserRetirementsResponse[]>([]);

  const getUserRetirements = async () => {
    const result =
      address && (await toucan.fetchUserRetirements(address?.toLowerCase()));
    result && setRetirements(result);
  };

  useEffect(() => {
    getUserRetirements();
  });

  return (
    <div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {retirements.length && (
              <div className="overflow-hidden ring-1 ring-black">
                <table className="min-w-full divide-y divide-black">
                  <thead className="bg-prosperity">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Token Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Token Symbol
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Certificate ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Creation Tx
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black bg-white">
                    {retirements.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {item.token.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.token.symbol}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.certificate?.id}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`https://alfajores.celoscan.io/tx/${item.creationTx}`}
                              className="text-forest hover:text-forest"
                            >
                              ...
                              {item.creationTx.substring(
                                item.creationTx.length - 15
                              )}
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
