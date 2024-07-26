import { connectMongoDB } from "@/lib/connectMongoDB";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";


export const dynamic = 'force-dynamic';
export async function PUT(request: NextRequest, URLParams: any){
    try {
        const body = await request.json();
        const id = URLParams.params.id;
        const { name, category, price } = body;


        await connectMongoDB();

        const data = await Product.findByIdAndUpdate(id, {
            name,
            category,
            price
        });
        return NextResponse.json({
            message: "Product Updated Successfully",
            data,
        })
    } catch (error) {
        return NextResponse.json({
            error,
            message: "Internal Server Error",
        },{status: 500})
    }
}