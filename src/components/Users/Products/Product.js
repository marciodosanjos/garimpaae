import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAtion } from "../../../redux/slices/products/productsSlice";
import {
  addOrderAction,
  getCartItemsAction,
} from "../../../redux/slices/cart/cartSlice";
import Swal from "sweetalert2";
import { Button, Container } from "@mui/material";
import Footer from "../../Footer/Footer";

const policies = [
  {
    name: "International delivery",
    icon: GlobeAmericasIcon,
    description: "Get your order in 2 years",
  },
  {
    name: "Loyalty rewards",
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  //get id from params;
  const { id } = useParams();

  //get single product productData
  useEffect(() => {
    dispatch(fetchProductAtion(id));
  }, [dispatch, id]);

  const { product } = useSelector((state) => state?.products);

  const productData = product?.data;

  console.log(product);

  //get cart
  useEffect(() => {
    dispatch(getCartItemsAction());
  }, [dispatch]);

  const { cartItems } = useSelector((state) => state?.cart);

  const productInCart = cartItems?.find(
    (item) => item?._id?.toString() === productData?._id?.toString()
  );

  //Add to cart handler
  const addToCartHandler = () => {
    if (selectedSize === "") {
      return Swal.fire({
        icon: "error",
        title: "Selecione um tamanho",
        text: "para poder prosseguir com o checkout",
      });
    }

    // if (selectedColor === "") {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "Selecione uma cor",
    //     text: "para poder prosseguir com o checkout",
    //   });
    // }

    //check if product is in cart
    if (productInCart) {
      return Swal.fire({
        icon: "error",
        title: "Produto já adicionado ao carrinho",
        text: "",
      });
    }

    dispatch(
      addOrderAction({
        _id: productData?._id,
        name: productData?.name,
        qty: productData?.qty,
        price: productData?.price,
        description: productData?.description,
        color: selectedColor,
        size: selectedSize,
        image: productData?.images[0],
        totalPrice: productData?.price,
        qtyLeft: productData?.qtyLeft,
      })
    );
    return Swal.fire({
      icon: "success",
      title: "produto adicionado ao carrinho",
      text: "Uhuu",
    });
  };

  //let cartItems = [];

  return (
    <>
      <Container maxWidth="xl" disableGutters="true" sx={{ marginY: "3rem" }}>
        <div className="bg-white" style={{ paddingTop: "2rem" }}>
          <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {productData?.name}
                  </h1>
                  <p className="text-xl font-medium text-gray-900">
                    R$ {productData?.price},00
                  </p>
                </div>
                {/* Reviews */}
                <div className="mt-4">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-700">
                      {productData?.product?.averageRating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                    <div className="ml-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            productData?.averageRate > rating
                              ? "text-yellow-400"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <div
                      aria-hidden="true"
                      className="ml-4 text-sm text-gray-300"
                    ></div>
                    <div className="ml-4 flex">
                      <a
                        href="/"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {productData?.totalReviews} total reviews
                      </a>
                    </div>
                  </div>
                  {/* leave a review */}

                  <div className="mt-4">
                    <Link to={`/add-review/${productData?._id}`}>
                      <h3 className="text-sm font-medium text-blue-600">
                        Deixe um comentário
                      </h3>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Image gallery */}
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  {productData?.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={productData.name}
                      className={classNames(
                        image.primary
                          ? "lg:col-span-2 lg:row-span-2"
                          : "hidden lg:block",
                        "rounded-lg"
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8 lg:col-span-5">
                <>
                  {/* Color picker */}
                  <div>
                    <h2 className="text-sm font-medium text-gray-900">Cor</h2>
                    <div className="flex items-center space-x-3">
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                      >
                        <div className="mt-4 flex items-center space-x-3">
                          {productData?.color?.length > 0 &&
                            productData?.color?.map((color) => (
                              <RadioGroup.Option
                                key={color}
                                value={color}
                                className={({ active, checked }) =>
                                  classNames(
                                    active && checked
                                      ? "ring ring-offset-1"
                                      : "",
                                    !active && checked ? "ring-2" : "",
                                    "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                                  )
                                }
                              >
                                <RadioGroup.Label as="span" className="sr-only">
                                  {color}
                                </RadioGroup.Label>
                                <span
                                  style={{ backgroundColor: color }}
                                  aria-hidden="true"
                                  className={classNames(
                                    "h-8 w-8 border border-black border-opacity-10 rounded-full"
                                  )}
                                />
                              </RadioGroup.Option>
                            ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Size picker */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-900">
                        Tamanho
                      </h2>
                    </div>
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-2"
                    >
                      {/* Choose size */}
                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {productData?.sizes?.map((size) => (
                          <RadioGroup.Option
                            key={size}
                            value={size}
                            className={({ active, checked }) => {
                              return classNames(
                                checked
                                  ? "bg-indigo-600 border-transparent  text-white hover:bg-indigo-700"
                                  : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer"
                              );
                            }}
                          >
                            <RadioGroup.Label as="span">
                              {size}
                            </RadioGroup.Label>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  {/* add to cart */}
                  <Button
                    onClick={() => addToCartHandler()}
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      width: "32vw",
                      marginY: "1rem",
                    }}
                  >
                    Adicionar ao carrinho
                  </Button>

                  {/* proceed to check */}

                  {cartItems?.length > 0 && (
                    <Link
                      to="/shopping-cart"
                      className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-green-800 py-3 px-8 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Continuar com checkout
                    </Link>
                  )}
                </>

                {/* Product details */}
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Descrição
                  </h2>
                  <div className="prose prose-sm mt-4 text-gray-500">
                    {productData?.description}
                  </div>
                </div>

                {/* Policies */}
                <section aria-labelledby="policies-heading" className="mt-10">
                  <h2 id="policies-heading" className="sr-only">
                    Our Policies
                  </h2>

                  <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {policies.map((policy) => (
                      <div
                        key={policy.name}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                      >
                        <dt>
                          <policy.icon
                            className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="mt-4 text-sm font-medium text-gray-900">
                            {policy.name}
                          </span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500">
                          {policy.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            </div>

            {/* Reviews */}
            <section
              aria-labelledby="reviews-heading"
              className="mt-16 sm:mt-24"
            >
              <h2
                id="reviews-heading"
                className="text-lg font-medium text-gray-900"
              >
                Recent reviews
              </h2>

              <div className="mt-6 space-y-10 divide-y divide-gray-200 border-t border-b border-gray-200 pb-10">
                {productData?.product?.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
                  >
                    <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                      <div className="flex items-center xl:col-span-1">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                review.rating > rating
                                  ? "text-yellow-400"
                                  : "text-gray-200",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="ml-3 text-sm text-gray-700">
                          {review.rating}
                          <span className="sr-only"> out of 5 stars</span>
                        </p>
                      </div>

                      <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                        <h3 className="text-sm font-medium text-gray-900">
                          {review?.message}
                        </h3>

                        <div
                          className="mt-3 space-y-6 text-sm text-gray-500"
                          dangerouslySetInnerHTML={{ __html: review.content }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                      <p className="font-medium text-gray-900">
                        {review.author}
                      </p>
                      <time
                        dateTime={review.datetime}
                        className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                      >
                        {review.date}
                      </time>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </Container>
      <Footer />
    </>
  );
}
