import { connectMongoDB } from "@/lib/connectMongoDB";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";


export const dynamic = 'force-dynamic';
export async function DELETE(request: NextRequest, URLParams: any){
    try {
        const id = URLParams.params.id;

        await connectMongoDB();

        const data = await Product.findByIdAndDelete(id);
        return NextResponse.json({
            message: "Product Deleted Successfully",
            data,
        })
    } catch (error) {
        return NextResponse.json({
            error,
            message: "Some thing went wrong",
        },{status: 400})
    }
}