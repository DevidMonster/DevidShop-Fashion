
import { Fragment } from 'react';
import { useSelector } from "react-redux";
import styles from "./App.module.scss"
import classNames from "classnames/bind";
import DefaultLayout from "./layouts/DefaultLayout";
import { publicRoutes } from "./routes";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
// import { saveURL } from './redux/actions';
import CheckURL from './components/CheckURL';

const cx = classNames.bind(styles)

function App() {
  
  let mode = useSelector(state => state.active) || false
  // let url = useSelector(state => state.currentURL)
  // console.log(url)
  if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;
  
  // const dispatch = useDispatch()

  // const location = useLocation();

  // useEffect(() => {
  //   // Hàm này sẽ được chạy mỗi khi pathname thay đổi
  //   dispatch(saveURL(location.pathname));
  // }, [location.pathname]);

  return (
    <Router>
      <div className={cx("app", { dark_mode: mode })}>
          <CheckURL />
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
