import { useDispatch, useSelector } from "react-redux";
import AddShippingAddress from "../Forms/AddShippingAddress";
import { useEffect } from "react";
import { getCartItemsAction } from "../../../redux/slices/cart/cartSlice";
import { useLocation } from "react-router-dom";
import { placeOrderAction } from "../../../redux/slices/orders/ordersSlice";
import { getUserProfileAction } from "../../../redux/slices/users/usersSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";

export default function OrderPayment() {
  //get data from location
  const location = useLocation();
  const { sumTotalPrice } = location?.state;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsAction());
  }, [dispatch]);

  //---get cart items from store---
  const { cartItems } = useSelector((state) => state?.cart);

  //const calculateTotalDiscountedPrice = () => {};

  //create order submit handler
  //  // const createOrderSubmitHandler = (e) => {
  //     e.preventDefault();
  //   };

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  const { profile } = useSelector((state) => state?.users);
  const userShippingAddress = profile?.data?.shippingAddress;

  //place order action
  const placeOrderHandler = () => {
    dispatch(
      placeOrderAction({
        orderItems: cartItems,
        shippingAddress: userShippingAddress,
        totalPrice: sumTotalPrice,
      })
    );
    //empty cart items
    localStorage.removeItem("cartItems");
  };

  const { loading: orderLoading, error: orderErr } = useSelector(
    (state) => state?.orders
  );

  return (
    <div className="bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div className="mt-10 border-t border-gray-200 pt-10">
                {/* shipping Address */}
                <AddShippingAddress />
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul className="divide-y divide-gray-200">
                  {cartItems?.map((product) => (
                    <li key={product._id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          src={product?.image}
                          alt={product?.name}
                          className="w-20 rounded-md"
                        />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <p className="mt-1 text-sm text-gray-500">
                              {product.name}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.size}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            R$ {product?.price} X {product?.qty} = R${" "}
                            {product?.totalPrice}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Sub Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      {/* $ {calculateTotalDiscountedPrice()} */}
                      R$ {sumTotalPrice},00
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  {orderLoading ? (
                    <LoadingComponent />
                  ) : (
                    <button
                      onClick={placeOrderHandler}
                      className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Confirm Payment - R$ {sumTotalPrice}
                    </button>
                  )}

                  <>{orderErr && <p>{orderErr?.message}</p>}</>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
