import React from "react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    articlesPerPage: number;
    totalArticles: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, setCurrentPage, articlesPerPage, totalArticles }) => {
    if (totalArticles <= articlesPerPage) return null;

    const scrollToTop = () => {
        window.scrollTo({ top: 760, behavior: 'smooth' });
    };

    return (
        <div className="mt-6 flex justify-center gap-10 w-full px-4 md:px-8">
            <button
                onClick={() => {
                    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
                    scrollToTop()
                }}
                className="px-6 py-2 border border-gray-700 cursor-pointer text-gray-900 text-sm sm:text-md transition"
            >
                PREVIOUS
            </button>
            <button
                onClick={() => {
                    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
                    scrollToTop()
                }}
                className="px-6 py-2 bg-[#0E2455] cursor-pointer text-white text-sm sm:text-md transition"
            >
                NEXT
            </button>
        </div>
    );
};

export default Pagination;
