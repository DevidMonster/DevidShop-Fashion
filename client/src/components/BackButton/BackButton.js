import styles from './BackButton.module.scss';
import classNames from 'classnames/bind';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { prevUrlSelector } from '../../redux/selectors';
import { AiOutlineLeft, AiOutlineRight } from '../../asset/icons';
import Button from '../Button';

const cx = classNames.bind(styles)

function BackButton({ currentPage }) {
    const prevUrl = useSelector(prevUrlSelector)
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(`${prevUrl === '/cart' ? '/' : prevUrl}`)
    }
    return (  
        <div className={cx('top')}>
            <Button leftIcon={<AiOutlineLeft/>} text onClick={handleGoBack}>
                Go back
            </Button>
            <span className={cx('nav_prev')}>
                <p>{prevUrl === "/" || prevUrl === '/cart' ? "Home" :  prevUrl.includes("?") ? prevUrl.slice(1, prevUrl.indexOf("?")) : prevUrl.slice(1, prevUrl.length)} <AiOutlineRight/> {currentPage}</p>
            </span>
        </div>
    );
}

export default BackButton;