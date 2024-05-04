// src/components/Pagination.tsx

import React, { useState } from 'react';

interface PaginationProps {
    itemsPerPage: number;
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, setItemsPerPage }) => {
    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
    };

    return (
        <div className="pagination-container">
            <div className="select-row">
                <label>Items per page: </label>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="select-items-per-page">
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                    <option value="10">10</option>
                    <option value="20">15</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;