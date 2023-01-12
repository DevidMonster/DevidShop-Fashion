//routes
import config from "../config";

//Pages
import Home from "../pages/Home";
import Product from "../pages/Product";


const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.product, component: Product },
    { path: config.routes.detail, component: Product },
    { path: config.routes.about, component: Product },
    { path: config.routes.blog, component: Product },
    { path: config.routes.contact, component: Product },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
