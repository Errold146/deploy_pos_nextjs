import { CategoriesResponseSchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";

async function getCategories() {
    const url = `${process.env.API_URL}/categories`;
    const req = await fetch(url)
    const json = await req.json()
    const categories = CategoriesResponseSchema.parse(json)
    return categories
}

export default async function MainNav() {

    const categories = await getCategories()

    return (
        <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
            <div className="flex justify-center">
                <Logo />
            </div>

            <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/${category.id}`}
                        className="rounded text-white hover:bg-green-500 hover:text-gray-900 font-bold p-2"
                    >
                        {category.name}
                    </Link>
                ))}

                <Link
                    href={'/admin/sales'}
                    className=" rounded text-white hover:bg-green-500 hover:text-gray-900 font-bold p-2"
                >
                    Panel de  administración
                </Link>
            </nav>
        </header>
    )
}