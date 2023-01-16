
import { Fragment } from 'react';
import styles from "./App.module.scss"
import classNames from "classnames/bind";
import DefaultLayout from "./layouts/DefaultLayout";
import { publicRoutes } from "./routes";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "./redux/actions";
import ResizeDetector from 'react-resize-detector';
// import { saveURL } from './redux/actions';
import CheckURL from './components/CheckURL';

const cx = classNames.bind(styles)

function App() {
  
  let state = useSelector(state => state) || false
  let mode = state.active
  let toggle = state.toggle_mode || false
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
      dispatch(menuToggle(toggle))
    }
}


  return (
    <Router>
      <div className={cx("app", { dark_mode: mode })}>
          <CheckURL />
          <ResizeDetector handleWidth onResize={handleResize} />
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
      </div>
    </Router>
  );
}

export default App;
