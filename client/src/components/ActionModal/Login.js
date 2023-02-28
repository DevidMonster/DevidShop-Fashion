import styles from './ActionModal.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button/Button';
import * as request from '../../utils/httpRequest';
import { AiOutlineEye, AiOutlineEyeInvisible } from '../../asset/icons';
import reducers from '../../redux/reducer';
import * as yup from 'yup'

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
    
    const loginSchema = yup.object().shape({
        userName: loginType === `email` ? yup.string().email().required() : yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, {message: "Please enter valid number.", excludeEmptyString: false}).required(), 
        password: yup.string()
        .min(8, 'passWord at least 8 chars')
        .matches(/[a-z]/, 'passWord at least one lowercase char')
        .matches(/[A-Z]/, 'passWord at least one uppercase char')
        .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'passWord at least 1 number or special char (@,!,#, etc).').required(),
    })

    const dispatch = useDispatch()

    const inputPass = useRef()

    const validateAll = async (formUpload) => {
        const msg = {}

        await loginSchema.validate(formUpload, {abortEarly: false})
            .then(() => {
                setErrorMessage({})
            })
            .catch(({errors}) => {
                console.log(errors);
                msg.userName = ''
                msg.pass = ``
                errors.foreach(err => {
                    if(!err.toLowerCase().startsWith('password')) {
                        msg.userName = err
                    }

                    if(err.toLowerCase().startsWith('password')) {
                        msg.pass = err
                    }
                })
                setErrorMessage(msg)
            })
        return Object.keys(msg).length > 0 ? false : true
    }

    
    const login = async (formUpload) => {
        setLoading(true)
        const checkUser = await request.post("/general/user/login", {
            ...formUpload
        })
        if(checkUser) {
            dispatch(reducers.actions.notification({ content: "Login Success", type: "success" }))
            dispatch(reducers.actions.currentUser(checkUser))
            dispatch(reducers.actions.toggleModel(false))
        } else {
            setErrorMessage({ 
                userName: "userName or passWord not match!!",
            })
        }
        setLoading(false)
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formUpload = {
            userName: loginType === "email" ? email : phoneNumber,
            password: passWord
        }
        console.log(formUpload)
        const isValid = await validateAll(formUpload)
        if (!isValid) return false

        login(formUpload)
        
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
                                <input  id="email" autoComplete='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="your-email@gmail.com" />
                            </div>
                            <p>{errorMessage.userName}</p>
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
                            <p>{errorMessage.userName}</p>
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