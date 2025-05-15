"use client";


import { deleteProduct } from "@/actions/delete-product-action";
import type { Product } from "@/src/schemas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteProductForm({ productId }: { productId: Product['id'] }) {
    const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
        if (!confirmDelete) return;

        try {
            await deleteProduct(productId);
            toast.success("Producto Eliminado Correctamente");
        } catch (error: any) {
            toast.error(error.message || "Hubo un problema al eliminar el producto");
        }
    };

    return (
        <form action={handleDelete}>
            <input
                type="submit"
                value="Eliminar"
                className="text-red-500 hover:text-red-800 font-semibold cursor-pointer"
            />
        </form>
    );
}