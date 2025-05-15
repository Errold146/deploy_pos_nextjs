import { CategoriesResponseSchema, type Product } from "@/src/schemas"
import UploadProductImage from "./UploadProductImage"

async function getCategories() {
    const url = `${process.env.API_URL}/categories`
    const req = await fetch(url)
    const json = await req.json()
    const categories = CategoriesResponseSchema.parse(json)
    return categories
}

export default async function ProductForm({product}: {product?: Product}) {

    const categories = await getCategories()

    return (
        <>
            <div className="space-y-2 mb-4 ">
                <label
                    htmlFor="name"
                    className="block"
                >Nombre Producto</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre Producto"
                    className="border border-gray-300 w-full p-2 rounded"
                    name="name"
                    defaultValue={product?.name}
                />
            </div>

            <div className="space-y-2 mb-4">
                <label
                    htmlFor="price"
                    className="block"
                >Precio</label>
                <input
                    id="price"
                    type="number"
                    placeholder="Precio Producto"
                    className="border border-gray-300 w-full p-2 rounded"
                    name="price"
                    min={0}
                    defaultValue={product?.price}
                />
            </div>

            <div className="space-y-2 mb-4">
                <label
                    htmlFor="inventory"
                    className="block"
                >Inventario</label>
                <input
                    id="inventory"
                    type="number"
                    placeholder="Cantidad Disponible"
                    className="border border-gray-300 w-full p-2 rounded"
                    name="inventory"
                    min={0}
                    defaultValue={product?.inventory}
                />
            </div>

            <div className="space-y-2 mb-4">
                <label
                    htmlFor="categoryId"
                    className="block"
                >Categoría</label>
                <select
                    id="categoryId"
                    className="border border-gray-300 w-full p-2 bg-white rounded"
                    name="categoryId"
                    defaultValue={product?.categoryId}
                >
                    <option value="">Seleccionar Categoría</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}

                </select>
            </div>

            <UploadProductImage 
                currentImage={product?.image}
            />

        </>
    )
}