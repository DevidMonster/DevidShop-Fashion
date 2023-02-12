import styles from './ActionModal.module.scss';
import classNames from 'classnames/bind';

import "react-responsive-modal/styles.css"
import { Modal } from 'react-responsive-modal';

import reducers from '../../redux/reducer';
import { useSelector, useDispatch } from 'react-redux';

import { toggleModalSelector } from '../../redux/selectors';
import { memo, useLayoutEffect, useState } from 'react';
import Register from './Register';
import Login from './Login';

const cx = classNames.bind(styles)

function ActionModal() {
    const isModalOpen = useSelector(toggleModalSelector)

    const dispatch = useDispatch()

    const [formAction, setFormAction] = useState("login")

    const handleToggleModal = () => {
        dispatch(reducers.actions.toggleModel())
    }

    useLayoutEffect(() => {
        setFormAction(isModalOpen.type)
    }, [isModalOpen])

    return (
        <div className={cx('wrapper')}>
            {isModalOpen.bool && 
                <Modal
                    open={isModalOpen.bool}
                    center
                    onClose={handleToggleModal}
                >
                    {formAction === "login" ? 
                        (
                            <>
                                <Login/>
                                <p className={cx('text_bottom')}>You don't have Account? <span onClick={() => setFormAction("register")}>Create One</span></p> 
                            </>
                        ) 
                            : 
                        (
                            <>
                                <Register/>
                                <p className={cx('text_bottom')}>Early have Account? <span onClick={() => setFormAction("login")}>Login now</span></p> 
                            </>
                        )
                    }
                </Modal>
            }
        </div>
    );
}

export default memo(ActionModal);