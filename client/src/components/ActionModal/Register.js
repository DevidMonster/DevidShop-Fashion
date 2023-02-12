import styles from './ActionModal.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button/Button';
import { AiOutlineEye, AiOutlineEyeInvisible } from '../../asset/icons';

import { useRef, useState } from 'react';

const cx = classNames.bind(styles)

function Register() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [passWord, setPassWord] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})

    const inputPass = useRef()

    const validateAll = () => {
        const msg = {}
        if (userName === "") {
            msg.name = "Please enter your Name"
        }

        if (email === "") {
            msg.email = "Please enter your Email"
        }

        if (phoneNumber === "") {
            msg.phone = "Please enter your PhoneNumber"
        }

        if (passWord === "") {
            msg.pass = "Please enter your Pass"
        }

        setErrorMessage(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isValid = validateAll()
        if (!isValid) return
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
                        <input id="phone" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter your Phone Number" />
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
                    <Button type={"submit"} fullWidth>Sign Up</Button>
                </div>
            </form>
        </div>
    );
}

export default Register;