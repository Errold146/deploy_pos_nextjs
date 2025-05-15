import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-center text-gray-900">
            <Heading>404 | Producto No Encontrado</Heading>

            <Link
                href='/admin/products?page=1'
                className="rounded bg-green-400 hover:bg-green-500 py-2 px-10 font-bold"
            >
                Regresar
            </Link>
        </div>
    )
}
