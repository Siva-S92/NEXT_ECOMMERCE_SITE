import { IProduct } from "@/app/admin/dashboard/page";
import { setLoading } from "@/redux/features/loadingSlice";
import { setProduct } from "@/redux/features/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

interface PropsType {
  srNo: number;
  setOpenPopup: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
}

const Productrow = ({
  srNo,
  setOpenPopup,
  setUpdateTable,
  product,
}: PropsType) => {
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(setProduct(product));
    setOpenPopup(true);
  };

  const onDlelete = () => {
    dispatch(setLoading(true));

    const payload = {
      fileKey: product.fileKey,
    };

    axios
      .delete(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/uploadthing`, {
        data: payload,
      })
      .then((res) => {
        console.log(res.data);

        axios
          .delete(
            `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/delete_product/${product._id}`
          )
          .then((res) => {
            console.log(res.data);
            makeToast("The Product deleted Successfully");
            setUpdateTable((prevState) => !prevState);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            dispatch(setLoading(false));
          });
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <tr>
      <td>
        <div>{srNo}</div>
      </td>
      <td>
        <div>{product.name}</div>
      </td>
      <td>
        <div>$ {product.price}</div>
      </td>
      <td className="py-2">
        <Image src={product.imgSrc} alt={product.name} width={40} height={40} />
      </td>
      <td>
        <div className="text-2xl flex items-center gap-2 text-gray-600">
          <CiEdit
            className="cursor-pointer hover:text-black"
            onClick={onEdit}
          />
          <RiDeleteBin5Line
            className="text-[20px] cursor-pointer hover:text-red-600"
            onClick={onDlelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default Productrow;
