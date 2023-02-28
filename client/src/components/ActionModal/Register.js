import styles from './ActionModal.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button/Button';
import { AiOutlineEye, AiOutlineEyeInvisible } from '../../asset/icons';
import * as yup from 'yup'
import * as request from '../../utils/httpRequest';

import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import reducers from '../../redux/reducer';

const cx = classNames.bind(styles)

function Register() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [passWord, setPassWord] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})
    const [loading, setLoading] = useState(false)

    
    const dispatch = useDispatch()

    const inputPass = useRef()

    const signupSchema = yup.object().shape({
        name: yup.string().min(3).required(),
        email: yup.string().email().required(), 
        phoneNumber:  yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, {message: "phoneNumber is not valid number.", excludeEmptyString: false}).required(),
        password: yup.string()
        .min(8, 'passWord at least 8 chars')
        .matches(/[a-z]/, 'passWord at least one lowercase char')
        .matches(/[A-Z]/, 'passWord at least one uppercase char')
        .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'passWord at least 1 number or special char (@,!,#, etc).').required(),
    })

    const validateAll = async (formUpload) => {
        const msg = {}

        await signupSchema.validate(formUpload, {abortEarly: false})
            .then(() => {
                setErrorMessage({})
            })
            .catch(({errors}) => {
                console.log(errors);
                msg.name = ''
                msg.email = ''
                msg.phone = ''
                msg.pass = ``
                errors.map(err => {
                    if(err.startsWith('name')) {
                        msg.name = err
                    }

                    if(err.startsWith('email')) {
                        msg.email = err
                    }

                    if(err.startsWith('phoneNumber')) {
                        msg.phone = err
                    }

                    if(err.startsWith('password')) {
                        msg.pass = err
                    }
                })
                setErrorMessage(msg)
            })
        return Object.keys(msg).length > 0 ? false : true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formUpload = {
            name: userName,
            email,
            phoneNumber,
            password: passWord
        }

        const isValid = await validateAll(formUpload)
        if (!isValid) return

        signup(formUpload)
    }

    const signup = async (account) => {
        setLoading(true)
        const user = await request.post("/general/user/signup", {
            ...account
        })
        if(user) {
            dispatch(reducers.actions.notification({ content: "Signup Success", type: "success" }))
            dispatch(reducers.actions.currentUser(user))
            dispatch(reducers.actions.toggleModel(false))
        } else {
            setErrorMessage({ 
                userName: "create Account fail",
            })
        }
        setLoading(false)
    } 

    const handleShowPass = () => {
        setShowPass(prev => !prev)
        inputPass.current.type = showPass ? "password" : "text"
    }

    return (
        <div className={cx('form_wrapper')}>
            <h1>SignUp</h1>
            <form action="POST" onSubmit={handleSubmit}>
                <div className={cx('input_box')}>
                    <label htmlFor="name">User Name:</label>
                    <div className={cx('input_setup')}>
                        <input id="name" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter your name" />
                    </div>
                    <p>{errorMessage.name}</p>
                </div>
                <div className={cx('input_box')}>
                    <label htmlFor="email">Email:</label>
                    <div className={cx('input_setup')}>
                        <input type="email" id="email" autoComplete='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="your-email@gmail.com" />
                    </div>
                    <p>{errorMessage.email}</p>
                </div>
                <div className={cx('input_box')}>
                    <label htmlFor="phone">Phone Number:</label>
                    <div className={cx('input_setup')}>
                        <span>(+84)</span>
                        <input id="phone" type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter your Phone Number" />
                    </div>
                    <p>{errorMessage.phone}</p>
                </div>
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
                <div className={cx('btn_submit')}>
                <Button type={"submit"} fullWidth>
                        {loading ? 
                            <p className={cx('loader')}>
                                <span className={cx("dot-1")}></span>
                                <span className={cx("dot-2")}></span>
                                <span className={cx("dot-3")}></span>
                            </p>
                                :
                            "Sign Up"
                        }
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Register;