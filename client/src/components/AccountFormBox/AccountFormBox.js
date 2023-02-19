import styles from './AccountFormBox.module.scss';
import classNames from 'classnames/bind';
import Button from "../Button";

import reducers from '../../redux/reducer';

import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles)
    
function AccountFormBox() {
    const dispatch = useDispatch()
    
    const openModal = (type) => {
        dispatch(reducers.actions.toggleModel({ bool: true, type}))
    }

    return (  
        <div className={cx("wrapper")}>
            <Button outline small onClick={() => openModal("login")}>SignIn</Button>   
            <Button small onClick={() => openModal("register")}>SignUp</Button>

        </div>
    );
}

export default AccountFormBox;