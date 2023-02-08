import styles from './PaginatedItems.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineLeft, AiOutlineRight } from '../../asset/icons';
import { setFilterSelected } from '../../redux/selectors';
import { useSelector } from 'react-redux';

import ReactPaginate from 'react-paginate';
import { useEffect, useState, memo } from 'react';
import Item from './Item';
import { useScroll } from '../../hooks';

const cx = classNames.bind(styles)

function PaginatedItems({ itemsPerPage, items = [] }) {
    const selected = useSelector(setFilterSelected)
    const [itemOffset, setItemOffset] = useState(0);

    //Filter by name
    if(selected.value === "NI" || selected.value === "default") items.sort((a, b) => a.name.localeCompare(b.name))
    if(selected.value === "ND") items.sort((a, b) => b.name.localeCompare(a.name))
    
    //Filter by price
    if(selected.value === "PI") {
        items.sort((a, b) => {
                let x = eval(a.createdAt.slice(11, 19).replaceAll(/:/g, "+"))
                let y = eval(b.createdAt.slice(11, 19).replaceAll(/:/g, "+"))
                
                return x-y
            }
        )
    }
    if(selected.value === "PD") {
        items.sort((a, b) => {
                let y = eval(a.createdAt.slice(11, 19).replaceAll(/:/g, "+"))
                let x = eval(b.createdAt.slice(11, 19).replaceAll(/:/g, "+"))
                console.log(x, y)
                return x-y
            }
        )
    }

    //Filter by date
    if(selected.value === "TI") items.sort((a, b) => a.price - b.price)
    if(selected.value === "TD") items.sort((a, b) => b.price - a.price)
    
    const endOffset = itemOffset + itemsPerPage;
    //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(items.length / itemsPerPage);
    
    useEffect(useScroll, [itemOffset])

    // Invoke when user click to request another page.
    //console.log("current:" ,currentItems)
    const handlePageClick = (event) => {
        
        const newOffset = (event.selected * itemsPerPage) % items.length;
        //console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        //);
        
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

export default memo(PaginatedItems);