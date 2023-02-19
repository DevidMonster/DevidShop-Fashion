import { useLocation } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useEffect, useState, memo } from 'react';
import reducers from '../../redux/reducer';

function CheckURL() {
    const [prevUrl, setPrevUrl]= useState(localStorage.getItem("prevUrl") ||  '/')

    const dispatch = useDispatch()

    const location = useLocation();
  
    useEffect(() => {
      console.log(prevUrl.slice(0, prevUrl.indexOf("?")), location.pathname)
      if(prevUrl.slice(0, prevUrl.indexOf("?")) !== location.pathname) {
        const url = `${location.pathname}${location.search.replace(/"?"/g, '?=')}`
        // Hàm này sẽ được chạy mỗi khi pathname thay đổi và sẽ lưu pathname trước đó
        setPrevUrl(url)
        dispatch(reducers.actions.saveURL(prevUrl));
      }
      // eslint-disable-next-line
    }, [location.pathname, location.search]);
  
    return (<></>);
}

export default memo(CheckURL);