import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import * as request from '../../../../utils/httpRequest';
import { useDebounce } from '../../../../hooks';
import SearchResult from './SearchResult';

import { AiOutlineLoading3Quarters} from "react-icons/ai"
import {MdOutlineCancel} from 'react-icons/md'
import { BsSearch } from "react-icons/bs"
import { Wrapper as PopperWrapper } from "../../../../components/popper"

import { useEffect, useState, useRef, memo } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchHistory from './SearchHistory';

const cx = classNames.bind(styles)

function Search() {
    let state = useSelector(state => state) || false
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [searchData, setSearchData] = useState(JSON.parse(localStorage.getItem("searchHistory")) || [])
    const resultValue = useDebounce(searchValue, 500);
    
    const navigate = useNavigate()


    useEffect(()=> {
        if(!!state.data) {
            setSearchData(state.data)
        }
    }, [state.data])

    useEffect( () => {
        if (!resultValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchAPI = async () => {
            setShowSpinner(true);
            const dataResult = await request.get("/item", {
                params: {
                    name: resultValue
                },
            })
            setSearchResult(dataResult)
            
            setShowSpinner(false);
        }
        fetchAPI()
    }, [resultValue])

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        let searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    
    const handleNavigate = () => {
        if(searchValue !== "") {
            let searchHistory = []
            searchHistory = [searchValue]
            if(!!searchData) {
                searchHistory = [searchValue, ...searchData]
            }
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
            setSearchData(searchHistory)
            setSearchValue("")
            setShowResult(false)
            navigate(`/product/${searchValue}`)
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter' && searchValue !== "") {
            inputRef.current.blur()
            handleNavigate()
        } 
    }

    const inputRef = useRef();
    
    return ( 
        <div className={cx("wrapper")}>
            <HeadlessTippy
                interactive
                theme={state.active ? 'light' : 'material'}
                // eslint-disable-next-line
                visible={showResult && searchResult.length > 0 || showResult && searchData.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx("result-item")}>
                            { searchData.length > 0 && (
                                <div className={cx('search-box_less')}>
                                    <h4 className={cx('search-title')}>History</h4>
                                    <SearchHistory historyData={searchData}/>
                                </div>
                            )}
                            { searchResult.length > 0 && (
                                <div className={cx('search-box_less')}>
                                    <h4 className={cx('search-title')}>Items</h4>
                                    <SearchResult  value={searchResult} />
                                </div>
                            )}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={() => setShowResult(false)}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search item ..."
                        spellCheck={false}
                        onChange={handleChange}
                        onKeyDown={e => handleKeyDown(e)}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    />
                    {!!searchValue && !showSpinner && (
                        <button className={cx('clear-btn')} onClick={handleClear}>
                            <MdOutlineCancel />
                        </button>
                    )}
                    {showSpinner && <AiOutlineLoading3Quarters className={cx('loading')}/>}
                    <button className={cx('search-btn')} onClick={() => handleNavigate()}>
                        <BsSearch />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default memo(Search);