import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    type,
    to,
    href,
    children,
    primary = false,
    outline = false,
    small = false,
    large = false,
    normal = false,
    text = false,
    disibled = false,
    round = false,
    className,
    leftIcon,
    rightIcon,
    icon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (disibled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    let active = false
    if(icon) {
        active = true
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        isIcon: active,
        primary,
        outline,
        small,
        large,
        normal,
        text,
        disibled,
        round,
    });

    return (
        <Comp className={classes} type={type} {...props}>
            {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
            {icon ? (<span className={cx('icon')}>{icon}</span>) : (<span className={cx("title")}>{children}</span>)}
            {rightIcon && <span className={cx('right-icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
