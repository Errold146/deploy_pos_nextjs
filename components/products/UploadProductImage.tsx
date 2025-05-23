"use client"

import { useCallback, useState } from "react"
import { uploadImage } from "@/actions/upload-image-action"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { getImagePath } from "@/src/utils"

export default function UploadProductImage({ currentImage }: { currentImage?: string }) {

    const [ image, setImage ] = useState('')

    const onDrop = useCallback( async (files: File[]) => {
        const formData = new FormData()
        files.forEach((file) => {
            formData.append('file', file)
        })
        const image = await uploadImage(formData)
        setImage(image)
    }, [])

    const { getInputProps, getRootProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
        },
        onDrop,
        maxFiles: 1,
    })

    return (
        <>
            <div className="space-y-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Imagen Producto
                </label>
                <div {...getRootProps({
                    className: `
                        py-20 border-2 border-dashed  text-center 
                        ${isDragActive ? 'border-gray-900 text-gray-900 bg-gray-200 ' : 'border-gray-400 text-gray-400 bg-white'} 
                        ${isDragReject ? 'border-none bg-white' : 'cursor-not-allowed'}
                    `})}>
                    <input {...getInputProps()} />
                    {isDragAccept && (<p className=" text-green-600">Suelta la Imagen</p>)}
                    {isDragReject && (<p className=" text-red-600">Archivo no válido</p>)}
                    {!isDragActive && (<p>Arrastra y suelta una imagen aquí</p>)}
                </div>
            </div>

            {image && (
                <div className=" py-5 space-y-3">
                    <p className=" font-bold">Imagen del producto:</p>
                    <div className="w-[250px] h-[370px] relative">
                        <Image 
                            src={getImagePath(image)}
                            alt="Imagen del producto"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            )}
            
            {currentImage && !image && (
                <div className=" py-5 space-y-3">
                    <p className=" font-bold">Imagen Actual:</p>
                    <div className="w-[300px] h-[420px] relative">
                        <Image 
                            src={getImagePath(currentImage)}
                            alt="Imagen del producto"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            )}

            <input type="hidden" name="image" defaultValue={image ? image : currentImage} />
        </>
    )
}
