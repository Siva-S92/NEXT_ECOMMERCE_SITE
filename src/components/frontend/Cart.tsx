import { useAppSelector } from '@/redux/hooks';
import React, { Dispatch, SetStateAction } from 'react'
import { RxCross1 } from 'react-icons/rx';
import CartProduct from './CartProduct';
import { loadStripe } from '@stripe/stripe-js';


interface PropsType {
    setShowCart: Dispatch<SetStateAction<boolean>>;
  }

const Cart = ({setShowCart}: PropsType) => {
    const products = useAppSelector((state) => state.cartReducer)

    const getTotal = () => {
        let total = 0;
        products.forEach((item) => (total = total + item.price * item.quantity));
        return total;
    };

    //payment integration
    const makePayment = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
          throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined in environment variables");
        }
        const stipe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
        const body = {
          products: products,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/create-checkout-session`,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          }
        );
        const session = await response.json();
        console.log("session:", session);
        const result = await stipe?.redirectToCheckout({
          sessionId: session.id,
        });

        if (result?.error) {
          console.log(result.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className='bg-[#0000007d] w-full min-h-screen fixed left-0 top-0 z-20 overflow-y-auto '>
        <div className='max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6 '>
            <RxCross1 
              className='absolute right-0 top-0 m-6 text-[24px] cursor-pointer '
              onClick={() => setShowCart(false)}
            />
            <h3 className='p-6 text-lg font-medium text-gray-600 uppercase '>
                Your Cart
            </h3>
            <div className='mt-6 space-y-2 '>
                {products?.map((item: any) => (
                    <CartProduct 
                      key={item.id}
                      id={item.id}
                      img={item.img}
                      title={item.title}
                      price={item.price}
                      quantity={item.quantity}
                    />
                ))}
            </div>

            <div className='flex justify-between items-center font-medium text-xl py-4'>
                <p>Total:</p>
                <p>${getTotal()}.00</p>
            </div>
            {/* <button className='bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent my-4 '>
                View Cart
            </button> */}
            <button onClick={makePayment} className='bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent '>
                CheckOut
            </button>
        </div>
    </div>
  );
};

export default Cart