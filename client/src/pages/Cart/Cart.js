import styles from './Cart.module.scss';
import classNames from 'classnames/bind';

import BackButton from '../../components/BackButton';
import { useEffect, useState } from 'react';

import Button from '../../components/Button';
import { cartsStateSelector } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import detail from '../../redux/detail';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { TbTrashX } from 'react-icons/tb';

const cx = classNames.bind(styles)

function Cart() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem("carts")) || [])
    const reload = useSelector(cartsStateSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("gege")
        setData(JSON.parse(localStorage.getItem('carts')) || [])
    }, [reload])


    const handleChangeQuantity = (index, currentQuantity, act) => {
        if(act === 'desc' && data[index].quantity >= 1) {
            data[index].quantity = currentQuantity - 1
        } else if (act === 'incs' && data[index].quantity < data[index].maxQuantity){
            data[index].quantity = currentQuantity + 1
        }

        if(data[index].quantity === 0) {
            data.splice(index, 1)
        }

        localStorage.setItem("carts", JSON.stringify([...data]))
        dispatch(detail.actions.reloadCart())
    }

    const handleDelete = (index) => {
        data.splice(index, 1)
        localStorage.setItem("carts", JSON.stringify([...data]))
        dispatch(detail.actions.reloadCart())
    }

    return (  
        <div className={cx('wrapper')}>
            <BackButton currentPage={"Cart Page"}/>
            <div className={cx('container')}>
                {data.length === 0 ? (
                    <h1 className={cx('title')}>Nothing in your cart</h1>
                ) : (
                    <table border={1} className={cx('result')}>
                        <thead>
                            <tr>
                                <td>id</td>
                                <td>image</td>
                                <td>detail</td>
                                <td>cost</td>
                                <td>quantity</td>
                                <td>total</td>
                                <td>action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item,index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td><img src={item.image} alt={item.name}/></td>
                                    <td>
                                        <h1>{item.name}</h1>
                                        <p>
                                            color: <span style={{ display: 'inline-block', background: `#${item.color.hex_code}`, width: '20px', height: '20px', borderRadius: '10px' }}></span>
                                            <br/>
                                            size: <span>{item.size.size}</span>
                                        </p>
                                    </td>
                                    <td>{item.price} VNĐ</td>
                                    <td>
                                        <Button onClick={() => handleChangeQuantity(index, item.quantity,'incs')} round small><RiArrowUpSLine/></Button>
                                        <input type="number" readOnly value={item.quantity} min="0"/>
                                        <Button onClick={() => handleChangeQuantity(index, item.quantity, 'desc')} round small><RiArrowDownSLine/></Button>
                                    </td>
                                    <td>{item.price * item.quantity} VNĐ</td>
                                    <td>
                                        <Button icon={<TbTrashX/>} onClick={() => handleDelete(index)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Cart;