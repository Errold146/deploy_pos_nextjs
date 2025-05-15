"use client"

import { useStore } from "@/src/store"
import ShoppingCartItem from "./ShoppingCartItem"
import Amount from "./Amount"
import CouponForm from "./CouponForm"
import SubmitOrderForm from "./SubmitOrderForm"

export default function ShoppingCart() {

    const contents = useStore(state => state.contents)
    const total = useStore(state => state.total)
    const discount = useStore(state => state.discount)

    return (
        <>
            {contents.length ? (
                <>
                    <h2 className=" text-4xl font-bold text-gray-900">Resumen de venta: </h2> 
                    <ul 
                        role="list"
                        className=" mt-6 divide-y divide-gray-300 border-t border-gray-300 text-sm font-medium text-gray-600"
                    >
                        {contents.map(item => (
                            <ShoppingCartItem 
                                key={item.productId}
                                item={item}
                            />
                        ))}
                    </ul>

                    <dl className="space-y-6 border-t border-gray-300 py-6  font-medium text-gray-700">
                        {discount && (
                            <Amount 
                                label="Descuento:"
                                amount={discount}
                                discount={true}
                            />
                        )}

                        <Amount 
                            label="Total a Pagar:"
                            amount={total}
                        />
                    </dl>

                    <CouponForm />
                    <SubmitOrderForm />
                </>
            ) : (
                <h3 
                    className=" font-bold text-xl text-center text-gray-900"
                >
                    El carrito de ventas está vacío.
                </h3>
            )}
        </>
    )
}
