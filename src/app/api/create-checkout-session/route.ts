import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { products } = body;
    const lineItems = products.map((product: any) => ({
      price_data: {
        currency: "usd",
        product_data: { name: product.title },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["GB", "US", "CA"],
        },
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );
    return NextResponse.json({ id: session.id });
  } catch (error) {
    return NextResponse.json(
      {
        error,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
