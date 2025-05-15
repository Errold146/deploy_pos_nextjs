"use server"

import { ErrorSchema, ProductFormSchema, type Product } from "@/src/schemas"

type ActionSateType = {
    errors: string[]
    success: string
}

export async function updateProduct(productId: Product['id'], prevState: ActionSateType, formData: FormData) {
    
    // Obtener el valor de los campos
    const product = ProductFormSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        image: formData.get('image'),
        inventory: formData.get('inventory'),
        categoryId: formData.get('categoryId'),
    })

    // Revisar que los datos sean correctos o que hayan errores
    if ( !product.success ) {
        return {
            errors: product.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    // Comunicar con la API
    const url = `${process.env.API_URL}/products/${productId}`
    const req = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product.data)
    })
    const json = await req.json()

    if ( !req.ok ) {
        const errors = ErrorSchema.parse(json)
        return {
            errors: errors.message.map(issue => issue),
            success: ''
        }
    }

    return {
        errors: [],
        success: 'Producto Actualizado Correctamente'
    }
}