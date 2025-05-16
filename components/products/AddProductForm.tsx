"use client"

import { addProduct } from "@/actions/add-product-action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function AddProductForm({children}: {children: React.ReactNode}) {

    const router = useRouter()

    const [state, dispatch] = useActionState(addProduct, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if ( state.errors ) {
            state.errors.forEach(err => toast.error(err))
        }
        if ( state.success ) {
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
                value="Agregar Producto" 
            />
        </form>
    )
}
