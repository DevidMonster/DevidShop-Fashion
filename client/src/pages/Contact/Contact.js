import styles from './Contact.module.scss';
import classNames from 'classnames/bind';
import Button from '../../components/Button';
import * as request from '../../utils/httpRequest';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useScroll } from '../../hooks';
import { useDispatch } from 'react-redux';
import reducers from '../../redux/reducer';

const cx = classNames.bind(styles)

function Contact() {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [err, setErr] = useState({})
    const [sending, setSending] = useState(false)

    const dispatch = useDispatch()

    const contactSchema = yup.object().shape({
        email: yup.string().email().required(),
        phoneNumber: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, { message: "phoneNumber is not valid number.", excludeEmptyString: false }).required(),
        subject: yup.string().required(),
        message: yup.string().required()
    })

    useEffect(useScroll,[])

    const sendMessage = async (e) => {
        e.preventDefault()
        const formMessage = {
            email: email,
            phoneNumber: phone,
            subject: subject,
            message: message
        }
        setSending(true)
        await contactSchema.validate(formMessage, { abortEarly: false })
            .then(async () => {
                await request.post("/contact/send", {
                    ...formMessage
                }).then(() => {
                    dispatch(reducers.actions.notification({ content: "Message send successfully", type: 'success' }))
                }).catch(() => {
                    dispatch(reducers.actions.notification({ content: "Message send failed", type: 'error' }))
                })
                setErr({})
                setSending(false)
            })
            .catch(({errors}) => {
                const msg = {}
                errors.map(error => {
                    if(error.startsWith("email")) {
                        msg.email = error
                    }

                    if(error.startsWith("phoneNumber")) {
                        msg.phoneNumber = error
                    }

                    if(error.startsWith("subject")) {
                        msg.subject = error
                    }

                    if(error.startsWith("message")) {
                        msg.message = error
                    }
                })
                setErr(msg)
                setSending(false)
            })


    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('contact_info')}>
                    <h1>Contact Us</h1>
                    <p>Địa chỉ: 46 Hàng Bồ, Hoàn Kiếm, Hà Nội, Việt Nam</p>
                    <p>Email: <a target="_blank" href="mailto: mrbat905@gmail.com">mrbat905@gmail.com</a></p>
                    <p>Tel: <a target="_blank" href="tel: 039-626-5650">039-626-5650</a></p>
                </div>
                <form onSubmit={sendMessage}>
                    <div className={cx('form_head')}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" placeholder="Enter your Email" value={email} onChange={e => setEmail(e.target.value)}/>
                            <span>{err.email}</span>
                        </div>
                        <div>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" name="phone" id="phone" placeholder="Enter your phone number" value={phone} onChange={e => setPhone(e.target.value)}/>
                            <span>{err.phoneNumber}</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject">Subject</label>
                        <input type="text" name="subject" id="subject" placeholder="Enter your Subject" value={subject} onChange={e => setSubject(e.target.value)}/>
                        <span>{err.subject}</span>
                    </div>
                    <div>
                        <label htmlFor="message">Message</label>
                        <textarea rows="10" ame="message" id="message" placeholder="Enter your Message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
                        <span>{err.message}</span>
                    </div>
                    <Button disibled={sending} fullWidth>Send</Button>
                </form>
            </div>
        </div>
    );
}

export default Contact;