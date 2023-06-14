import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//create the API

export const appAPI = createApi({
  reducerPath: "appAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://e-commerce-backend-15em.onrender.com" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    //creating products
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
    }),

    //delete products
    deleteProduct: builder.mutation({
      query: ({product_id, user_id}) => ({
        url: `/products/${product_id}`,
        method: "DELETE",
        body: { 
          user_id, 
        }
      }),
    }),

    //update products
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PATCH",
        body: product
      }),
    }),

    //add to cart
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/products/add-to-cart",
        method: "POST",
        body: cartInfo,
      }),
    }),

    //remove from cart
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: "/products/remove-from-cart",
        method: "POST",
        body,
      }),
    }),

    //increase the cart
    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: "/products/increase-cart",
        method: "POST",
        body,
      }),
    }),

    //decrese the cart
   decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: "/products/decrease-cart",
        method: "POST",
        body,
      }),
    }),

    //create order
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      })
    })

  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useCreateOrderMutation,
  useDeleteProductMutation,
  useUpdateProductMutation
} = appAPI;

export default appAPI;
