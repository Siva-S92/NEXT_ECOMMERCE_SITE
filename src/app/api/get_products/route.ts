import { connectMongoDB } from "@/lib/connectMongoDB";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(){
    try {
        await connectMongoDB();

        const data = await Product.find();
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({
            error,
            message: "Internal Server Error",
        },{status: 500})
    }
}