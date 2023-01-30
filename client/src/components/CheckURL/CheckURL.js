import { useLocation } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useEffect, useState, memo } from 'react';
import reducers from '../../redux/reducer';

function CheckURL() {
    const [prevUrl, setPrevUrl]= useState(localStorage.getItem("prevUrl") ||  '/')

    const dispatch = useDispatch()

    const location = useLocation();
  
    useEffect(() => {
      // Hàm này sẽ được chạy mỗi khi pathname thay đổi và sẽ lưu pathname trước đó
      setPrevUrl(location.pathname)
      dispatch(reducers.actions.saveURL(prevUrl));

      // eslint-disable-next-line
    }, [location.pathname]);
  
    return (<></>);
}

export default memo(CheckURL);