"use client"

import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { format } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import Spinner from "../ui/Spinner"
import TransactionSummary from "./TransactionSummary"
import { getSalesByDate } from "@/src/api"
import { formatCurrency } from "@/src/utils"

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function TransactionFilter() {

    const [date, setDate] = useState<Value>(new Date())
    const formattedDate = format(date instanceof Date ? date : new Date(), 'yyyy-MM-dd')
    const { data, isLoading } = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    const total = data?.reduce((total, trans) => total + +trans.total, 0) ?? 0

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 relative items-start">
            
            <div className=" lg:sticky lg:top-10">
                <Calendar
                    value={date}
                    onChange={setDate}
                    locale="es"
                />
            </div>

            <div className="flex flex-col items-center justify-center h-full min-h-[200px] w-full gap-4">
                {isLoading ? (
                    <Spinner />
                ) : (
                    data?.length ? (
                        data.map(trans => (
                            <TransactionSummary 
                                key={trans.id} 
                                trans={trans}
                            />
                        ))
                    ) : <p className="text-lg text-center">No hay ventas en esta fecha</p>
                )}

                <p className=" my-5 text-lg font-bold">
                    Total del dia: {' '} <span className=" font-normal">{formatCurrency(total)}</span>
                </p>
            </div>
        </div>
    )
}