
import { Fragment, useEffect, useState } from 'react';
import styles from "./App.module.scss"
import classNames from "classnames/bind";
import DefaultLayout from "./layouts/DefaultLayout";
import { publicRoutes } from "./routes";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

//import { menuToggle } from "./redux/actions";
// import { saveURL } from './redux/actions';
import ResizeDetector from 'react-resize-detector';
import CheckURL from './components/CheckURL';
import reducers from './redux/reducer';
import { screenModeSelector, toggleSideBarSelector } from './redux/selectors';
import Button from './components/Button';
import { RiArrowUpSLine } from './asset/icons';
import ActionModal from './components/ActionModal';

const cx = classNames.bind(styles)

function App() {
  const [scrollShow, setScrollShow] = useState(false)

  function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      setScrollShow(true)
    } else {
      setScrollShow(false)      
    }
  }
  
  useEffect(() => {
    window.onscroll = () => scrollFunction();
  },[])
  
  // When the user clicks on the button, scroll to the top of the document
  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
  let mode = useSelector(screenModeSelector)
  let toggle = useSelector(toggleSideBarSelector) || false
  // let url = useSelector(state => state.currentURL)
  if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;
  
  // const dispatch = useDispatch()

  // const location = useLocation();

  // useEffect(() => {
  //   // Hàm này sẽ được chạy mỗi khi pathname thay đổi
  //   dispatch(saveURL(location.pathname));
  // }, [location.pathname]);
  const dispatch = useDispatch()
  
  const handleResize = () => {
    if(toggle === false) {
      dispatch(reducers.actions.menuToggle(toggle))
    }
}


  return (
    <Router>
      <div className={cx("app", { dark_mode: mode })}>
          <CheckURL />
          <ResizeDetector handleWidth onResize={handleResize} />
          <ActionModal/>
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = DefaultLayout
              const Page = route.component

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                  Layout = Fragment;
              }

              return (
                <Route 
                  key={index}
                  path={route.path} 
                  element={
                    <Layout>
                      <Page/>
                    </Layout>
                }/>
              )

            })}
          </Routes>
          <Button className={cx('scroll_top', {scrollShow: scrollShow})}  icon={<RiArrowUpSLine/>} onClick={topFunction}/>
      </div>
    </Router>
  );
}

export default App;
