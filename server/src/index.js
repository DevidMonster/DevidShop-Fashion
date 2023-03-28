const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
// const mysql = require('mysql2');
// const connection = require('./config/db');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;
var whitelist = ['https://www.quangdang.ml', 'http://localhost:8000']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));
mongoose.set('strictQuery', false)

const User = require('./app/models/user');
const Banner = require('./app/models/banner');
const Product = require('./app/models/Item');
const data = require('./data');

// database init
// function mysqlConnect() {
//     global.connection = mysql.createConnection(connection);

//     global.connection.connect(function (err) {
//         if (err) {
//             console.log('error when connecting to db');
//             setTimeout(mysqlConnect, 2000);
//         }
//         console.log('connected to database');
//     });
//     global.connection.on('error', function (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             mysqlConnect();
//         } else {
//             throw err;
//         }
//     });
// }

// mysqlConnect();



//Use static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

//Routes
const generalRoutes = require('./routes/general');
const categoryRoutes = require('./routes/category');
const itemRoutes = require('./routes/Item');
const bannerRoutes = require('./routes/banner');
const commentRoutes = require('./routes/comment');
const profileRoutes = require('./routes/profile');
const contactRoutes = require('./routes/contact');

app.use('/general', generalRoutes);
app.use('/category', categoryRoutes);
app.use('/item', itemRoutes);
app.use('/banner', bannerRoutes);
app.use('/comment', commentRoutes);
app.use('/profile', profileRoutes);
app.use('/contact', contactRoutes);

//connect database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(port, () => {
        console.log(`Bạn đang chạy ở cổng: http://localhost:${port}`);
    });

    /*ONLY ADD DATA ONE TIME*/
    // About.insertMany([
    //     { image: "https://bizflyportal.mediacdn.vn/bizflyportal/1370/2428/2021/04/19/16/07/kin16188016359650.jpg", title: "About Us", content: "At DevidShop, we believe that fashion should be accessible and affordable to everyone. Our mission is to provide high-quality clothing at reasonable prices, without sacrificing style or comfort."},
    //     { image: "", title: "Our Story", content: "DevidShop was founded in 2015 by David Nguyen, a fashion enthusiast who wanted to create a brand that would cater to people of all ages and backgrounds. Starting out as a small online store, DevidShop quickly grew in popularity, thanks to our commitment to quality, affordability, and customer service.</p><p>Over the years, we've expanded our product line to include a wide variety of clothing and accessories, from casual wear to formal attire. We pride ourselves on staying up-to-date with the latest trends and styles, while also offering classic pieces that never go out of fashion."},
    //     { image: "", title: "Meet Our Team", content: "We offer a wide range of clothing and accessories for men and women, including:</p><ul><li>Tops and T-Shirts</li><li>Dresses and Skirts</li><li>Pants and Jeans</li><li>Outerwear and Jackets</li><li>Shoes and Accessories</li></ul><p>All of our products are made with high-quality materials and are designed to last. We also offer a range of sizes to ensure that everyone can find the perfect fit."},
    //     { image: "", title: "Contact Us", content: "If you have any questions or concerns, please don't hesitate to <a href='/contact'>contact us</a>. We're always here to help and are committed to providing the best possible customer service."}
    // ])
    //Banner.insertMany(data.banners)
    //Product.insertMany([{"cate_id":"63c3a0f94c7f28ee52a8feb8","name":"Blue t-shirt","description":"Shirt made of soft and durable material","price":220.5,"view_total": 0,"sale_off": 0,"images":["https://lh3.googleusercontent.com/CX1Hg1a3Set1C1V1-zcioxVWYVyUQQKrOV2eZr6JUfpM1zmlZp8HOyH_PNpEDJQORLMnfz924JL7_tbuGdw5z9vFkG2EkBJRwoS1BxoEKCktIlXpHcHW-dinZlRDa_8brYVZzVC3", "https://bucket.nhanh.vn/store/25618/artCT/87003/ao_thun_dep_1.jpg"],"colors":[{"color":"blue","hex_code":"0000FF"}, {"color":"white","hex_code":"fff"}],"sizes":[{"size":"Medium","size_code":"M"},{"size":"Large","size_code":"L"}],"quantity":10},
    //{"cate_id":"63c3a0f94c7f28ee52a8feb8","name":"Sundree t-shirt","description":"The shirt is made of durable materials, the design is modern and cool","price":300,"view_total": 0,"sale_off": 0,"images":["https://bucket.nhanh.vn/store/25618/artCT/87003/ao_thun_dep_1.jpg"],"colors":[{"color":"blue","hex_code":"0000FF"}, {"color":"white","hex_code":"fff"}],"sizes":[{"size":"Medium","size_code":"M"},{"size":"Large","size_code":"L"},{"size":"Super Large","size_code":"XL"}],"quantity":0}])
}).catch((error) => console.log(`${error} did not connect`))

