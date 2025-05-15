"use server";

import type { Product } from "@/src/schemas";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: Product['id']) {
    const url = `${process.env.API_URL}/products/${productId}`;
    const req = await fetch(url, { method: "DELETE" });

    const json = await req.json();

    if (!req.ok) {
        throw new Error(json.message || "Error al eliminar el producto");
    }

    revalidatePath("/admin/products");
}