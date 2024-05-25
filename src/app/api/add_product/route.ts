import { connectMongoDB } from "@/lib/connectMongoDB";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imgSrc, fileKey, name, category, price } = body;

    await connectMongoDB();

    const data = await Product.create({
      imgSrc,
      fileKey,
      name,
      category,
      price,
    });
    return NextResponse.json({
      message: "A New Product Added Sucessfully",
      data,
    });
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
