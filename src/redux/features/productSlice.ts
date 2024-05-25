import { IProduct } from "@/app/admin/dashboard/page";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"



const initialState:IProduct = {
    _id: "",
    imgSrc: "",
    name: "",
    price: "",
    category: ""
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action:PayloadAction<IProduct>) => {
            return action.payload
        }
    },
})

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;