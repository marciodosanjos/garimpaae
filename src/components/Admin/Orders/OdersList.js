import { useDispatch, useSelector } from "react-redux";
import OrdersStats from "./OrdersStatistics";
import { useState } from "react";
import { fetchOrdersAction } from "../../../redux/slices/orders/ordersSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import NoDataFound from "../../NoDataFound/NoDataFound";
import { Link } from "react-router-dom";

export default function OrdersList() {
  const dispatch = useDispatch();

  useState(() => {
    dispatch(fetchOrdersAction());
  }, []);

  const { orders, error, loading } = useSelector((state) => state?.orders);

  const ordersData = orders?.data;

  return (
    <>
      {error && <p>{error?.message}</p>}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center"></div>
        {/* order stats */}
        <OrdersStats />

        <h3 className="text-lg font-medium leading-6 text-gray-900 mt-3">
          Pedidos
        </h3>
        <div className="-mx-4 mt-3  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Status do pagamento
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Data do pedido
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Data de envio
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Ação
                </th>
                {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th> */}
              </tr>
            </thead>
            {loading ? (
              <LoadingComponent />
            ) : ordersData?.length <= 0 ? (
              <NoDataFound />
            ) : (
              <tbody className="divide-y divide-gray-200 bg-white">
                {ordersData?.map((order) => (
                  <tr key={order?._id}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                      {order?.orderNumber}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {order?.paymentStatus}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      Não especificado
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {order?.status}
                    </td>

                    <td className="px-3 py-4 text-sm text-gray-500">
                      R$ {order?.totalPrice}
                    </td>

                    <td className="px-3 py-4 text-sm text-gray-500">
                      {order?.paymentStatus !== "Not paid" ? (
                        <Link
                          style={{ color: "blue" }}
                          to={`/admin/orders/${order?._id}`}
                        >
                          Editar<span className="sr-only">, {order?.name}</span>
                        </Link>
                      ) : (
                        <Link style={{ color: "grey", cursor: "not-allowed" }}>
                          Nada <span className="sr-only">, {order?.name}</span>
                        </Link>
                      )}
                    </td>

                    {/* <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit<span className="sr-only">, {order.name}</span>
                  </a>
                </td> */}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
