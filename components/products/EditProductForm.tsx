"use client"

import { updateProduct } from "@/actions/update-product-action"
import { useParams, useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function EditProductForm({ children }: { children: React.ReactNode }) {

    const router = useRouter()
    const { id } = useParams<{id: string}>()
    const updateProductWithId = updateProduct.bind( null, +id )
    const [ state, dispatch ] = useActionState(updateProductWithId, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(err => toast.error(err))
        }
        if (state.success) {
            toast.success(state.success)
            router.push('/admin/products?page=1')
        }
    }, [state, router])

    return (
        <form
            action={dispatch}
        >
            {children}

            <input
                type="submit"
                className=" rounded bg-green-400 hover:bg-green-500 py-2 w-full cursor-pointer mt-4 font-bold"
                value="Editar Producto"
            />
        </form>
    )
}

