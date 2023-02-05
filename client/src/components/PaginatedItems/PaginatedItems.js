import styles from './PaginatedItems.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineLeft, AiOutlineRight } from '../../asset/icons';

import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import Item from './Item';
import { useScroll } from '../../hooks';

const cx = classNames.bind(styles)

function PaginatedItems({ itemsPerPage, items = [] }) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    useEffect(useScroll, [itemOffset])

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        
        setItemOffset(newOffset);

    };

    return (
        <div className={cx('wrapper')}>
            <Item currentItems={currentItems}/>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<AiOutlineRight/>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                activeClassName={cx("selected")}
                pageCount={pageCount}
                previousLabel={<AiOutlineLeft/>}
                renderOnZeroPageCount={null}
                disabledClassName={cx('disabled')}
            />
        </div>
    );
}

export default PaginatedItems;