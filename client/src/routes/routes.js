//routes
import config from "../config";

//Pages
import Home from "../pages/Home";
import Product from "../pages/Product";
import Detail from "../pages/Detail";
import NoSideBar from "../layouts/NoSideBar";
import Favorite from "../pages/Favorite";
import Cart from "../pages/Cart";
import Account from "../pages/Account";
import About from "../pages/About/About";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import Sale from "../pages/Sale";


const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.product, component: Product },
    { path: config.routes.product_cate, component: Product },
    { path: config.routes.account, component: Account },
    { path: config.routes.detail, component: Detail, layout: NoSideBar },
    { path: config.routes.about, component: About },
    { path: config.routes.sale, component: Sale },
    { path: config.routes.cart, component: Cart, layout: NoSideBar },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.favorite, component: Favorite },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
