"use client";

import { useState } from "react";
import { deleteProduct } from "@/actions/delete-product-action";
import type { Product } from "@/src/schemas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteProductForm({ productId }: { productId: Product["id"] }) {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteProduct(productId);
            toast.success("Producto Eliminado Correctamente");
            setShowConfirm(false); // Ocultamos el modal tras la eliminación
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || "Hubo un problema al eliminar el producto");
            } else {
                toast.error("Hubo un problema al eliminar el producto");
            }
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowConfirm(true)}
                className="text-red-500 hover:text-red-800 font-semibold cursor-pointer"
            >
                Eliminar
            </button>

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p>¿Estás seguro de que quieres eliminar este producto?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Eliminar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}