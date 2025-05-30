import Link from "next/link"

type PaginationProps = { 
    page: number
    totalPages: number
    baseUrl: string 
}

export default function Pagination({ page, totalPages, baseUrl }: PaginationProps) {

    const pages = Array.from({length: totalPages}, (_, i) => i + 1)

    return (
        <nav className="flex justify-center py-10">

            {page > 1 && (
                <Link
                    href={`${baseUrl}?page=${page - 1}`}
                    className="font-black bg-gray-200'} hover:bg-gray-200 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >
                    &laquo;
                </Link>
            )}

            {pages.map(currentPage => (
                <Link
                    href={`${baseUrl}?page=${currentPage}`}
                    key={currentPage}
                    className={`${page === currentPage && ' font-black bg-gray-200'} hover:bg-gray-200 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                >
                    {currentPage}
                </Link>
            ))}

            {page < totalPages && (
                <Link
                    href={`${baseUrl}?page=${page + 1}`}
                    className="font-black bg-gray-200'} hover:bg-gray-200 px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                >
                    &raquo;
                </Link>
            )}

        </nav>
    )
}
