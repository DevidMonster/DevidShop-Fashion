//routes
import config from "../config";

//Pages
import Home from "../pages/Home";
import Product from "../pages/Product";
import Detail from "../pages/Detail";
import NoSideBar from "../layouts/NoSideBar";


const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.product, component: Product },
    { path: config.routes.detail, component: Detail, layout: NoSideBar },
    { path: config.routes.about, component: Product },
    { path: config.routes.blog, component: Product },
    { path: config.routes.contact, component: Product },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
