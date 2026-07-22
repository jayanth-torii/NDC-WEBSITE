import React from "react";
import Button from "@/components/ui/Button";

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
        <div className="mt-6 flex justify-center gap-6 sm:gap-10 w-full px-4 md:px-8">
            <Button
                variant="ghost"
                type="button"
                onClick={() => {
                    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
                    scrollToTop()
                }}
            >
                PREVIOUS
            </Button>
            <Button
                variant="primary"
                type="button"
                onClick={() => {
                    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
                    scrollToTop()
                }}
            >
                NEXT
            </Button>
        </div>
    );
};

export default Pagination;
