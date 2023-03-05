import styles from './OrderForm.module.scss';
import className from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux';
import { paymentMethodSelector, shippingSelector, userSelector } from '../../../redux/selectors';
import { useEffect } from 'react';
import cart from '../../../redux/cart';
import Button from '../../../components/Button';
import reducers from '../../../redux/reducer';

const cx = className.bind(styles);

function OrderForm({ subTotal }) {
    const user = useSelector(userSelector) || {
        name: '',
        email: '',
        phoneNumber: '',
        address: ''
    }
    const shipping = useSelector(shippingSelector)
    const paymentMethod = useSelector(paymentMethodSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(cart.actions.addName(user.name))
        dispatch(cart.actions.addCusId(user._id))
        dispatch(cart.actions.addEmail(user.email))
        dispatch(cart.actions.addPhoneNumber(user.phoneNumber))
        dispatch(cart.actions.addAddress(user.address))
        dispatch(cart.actions.addTotal((subTotal + shipping)))
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(reducers.actions.notification({ content: "In Progressing", type: "info" }))
    }

    return (  
        <div className={cx("wrapper")}>
            <form onSubmit={handleSubmit}>
                <div className={cx("form_head")}>
                    <div>
                        <label htmlFor='Name'>Customer Name</label>
                        <input type='text' value={user.name} name='Name' id='Name' placeholder='Your Full Name' onChange={e => dispatch(cart.actions.addName(e.target.value))}/>
                        <span></span>
                    </div>
                    <div>
                        <label htmlFor='Phone'>Phone Number</label>
                        <input type='tel' value={user.phoneNumber} name='Phone' id='NaPhoneme' placeholder='Your Phone Number' onChange={e => dispatch(cart.actions.addPhoneNumber(e.target.value))}/>
                        <span></span>
                    </div>
                </div>
                <div>
                    <label htmlFor='Address'>Your Address</label>
                    <input type='text' value={user.address || ""} name='Address' id='Address' placeholder='Your Address' onChange={e => dispatch(cart.actions.addAddress(e.target.value))}/>
                    <span></span>
                </div>
                <div className={cx('payment_type')}>
                    <label htmlFor='paymentType'>Payment method</label>
                    <input type="radio" checked={paymentMethod === "cash"} name="paymentType" id="paymentType" value="cash" onChange={e => dispatch(cart.actions.addPaymentMethod(e.target.value))}/><span>Cash</span>
                    <input type="radio" checked={paymentMethod === "card"} name="paymentType" id="paymentType" value="card" onChange={e => dispatch(cart.actions.addPaymentMethod(e.target.value))}/><span>Card</span>
                    <span></span>
                </div>
                <div>
                    <table>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th scope='col'>SubTotal:</th>
                                <td>{subTotal}K VNĐ</td>
                            </tr>
                            <tr>
                                <th scope='col'>Shipping:</th>
                                <td>{shipping}K VNĐ</td>
                            </tr>
                            <tr>
                                <th scope='col'>Total:</th>
                                <td>{subTotal + shipping}K VNĐ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Button fullWidth>CheckOut Now</Button>
            </form>
        </div>
    );
}

export default OrderForm;