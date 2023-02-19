import styles from './ActionModal.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button/Button';
import * as request from '../../utils/httpRequest';
import { AiOutlineEye, AiOutlineEyeInvisible } from '../../asset/icons';
import reducers from '../../redux/reducer';

import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';


const cx = classNames.bind(styles)

function Login() {
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [passWord, setPassWord] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [loginType, setLoginType] = useState("email")
    const [errorMessage, setErrorMessage] = useState({})
    const [loading, setLoading] = useState(false)
    
    const dispatch = useDispatch()

    const inputPass = useRef()

    const validateAll = () => {
        const msg = {}

        if (loginType === "email" && email === "") {
            msg.email = "Please enter your Email"
        }

        if (loginType === "phone" && phoneNumber === "") {
            msg.phone = "Please enter your PhoneNumber"
        }

        if (passWord === "") {
            msg.pass = "Please enter your Pass"
        }

        setErrorMessage(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    
    const login = async () => {
        setLoading(true)
        const checkUser = await request.post("/general/user/login", {
            userName: loginType === "email" ? email : phoneNumber,
            passWord: passWord
        })
        if(checkUser) {
            dispatch(reducers.actions.notification({ content: "Login Success", type: "success" }))
            dispatch(reducers.actions.currentUser(checkUser))
            dispatch(reducers.actions.toggleModel(false))
        } else {
            setErrorMessage({ 
                email: "email or passWord not match!!",
                phone: "phoneNumber or passWord not match!!"
            })
        }
        setLoading(false)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isValid = validateAll()
        if (!isValid) return false

        login()
        
    }

    const handleShowPass = () => {
        setShowPass(prev => !prev)
        inputPass.current.type = showPass ? "password" : "text"
    }

    return (
        <div className={cx('form_wrapper')}>
            <h1>Login</h1>
            <h3 onClick={() => setLoginType(loginType === "email" ? "phone" : "email")}>{loginType === "email" ? "use phoneNumber" : "use email"}</h3>
            <form action="POST" onSubmit={handleSubmit}>
                {loginType === "email" ? 
                    (
                        <div className={cx('input_box')}>
                            <label htmlFor="email">Email:</label>
                            <div className={cx('input_setup')}>
                                <input type="email" id="email" autoComplete='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="your-email@gmail.com" />
                            </div>
                            <p>{errorMessage.email}</p>
                        </div>
                    )
                        :
                    (
                        <div className={cx('input_box')}>
                            <label htmlFor="phone">Phone Number:</label>
                            <div className={cx('input_setup')}>
                                <span>(+84)</span>
                                <input id="phone" type={"tel"} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter your Phone Number" />
                            </div>
                            <p>{errorMessage.phone}</p>
                        </div>
                    )
                }
                <div className={cx('input_box')}>
                    <label htmlFor="pass">Your PassWord:</label>
                    <div className={cx('input_setup')}>
                        <input type="password" ref={inputPass} id="pass" autoComplete='current-password' value={passWord} onChange={e => setPassWord(e.target.value)} placeholder="***********" />
                        <span onClick={handleShowPass}>
                            {showPass ?
                                <AiOutlineEye />
                                :
                                <AiOutlineEyeInvisible />
                            }
                        </span>
                    </div>
                    <p>{errorMessage.pass}</p>
                </div>
                <p className={cx('forgot_pass')}>Forgot PassWord?</p>
                <div className={cx('btn_submit')}>
                    <Button type={"submit"} fullWidth>
                        {loading ? 
                            <p className={cx('loader')}>
                                <span className={cx("dot-1")}></span>
                                <span className={cx("dot-2")}></span>
                                <span className={cx("dot-3")}></span>
                            </p>
                                :
                            "Login"
                        }
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Login;