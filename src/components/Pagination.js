import React, { useState, useEffect } from 'react';

const renderData = (data) => {
    return (
        <div>
            {data.map((comm, index) => {
                return (
                    <li className="comments" key={index}>{comm.body}</li>
                )
            })}
        </div>
    );
};

export default function Pagination() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleClick = (e) => {
        setCurrPage(Number(e.target.id));
    }

    const pages = [];
    for(let i=1; i <=Math.ceil(data.length/itemsPerPage); i++){
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map(number => {
    
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage == number ? 'active' : 'unActive'}
                >
                    {number}
                </li>
            )
        } else {
            return null;
        }
    })

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then((response) => response.json())
        .then ((json) => setData(json));
    }, []);

    const handleNextbtn = () => {
        setCurrPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    const handlePrevbtn = () => {
        setCurrPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    const handleLoadMore = () => {
        setItemsPerPage(itemsPerPage + 5);
    }

    return (
        <div>
            <h1>
                Comments
            </h1>
            <div className="commentSection">{renderData(currentItems)}</div>
            <div className="loadMore" onClick={handleLoadMore}>
                <button>
                    load more
                </button>
            </div>
            <ul className="pageNumbers">
                <button
                    className="buttonNav"
                    onClick={handlePrevbtn}
                    disabled={currentPage === pages[0] ? true : false}
                >
                    Prev
                </button>
                    {renderPageNumbers}
                <button className="buttonNav" onClick={handleNextbtn}>
                    Next
                </button>
            </ul>
        </div>
    )
}
