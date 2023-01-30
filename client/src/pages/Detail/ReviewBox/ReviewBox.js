import styles from "./ReviewBox.module.scss";
import classNames from "classnames/bind";
import { useState, memo } from "react";

import Comment from "./Comment";

const cx = classNames.bind(styles);

function ReviewBox({ item }) {
    const [boxShow, setBoxShow] = useState("rate");

    return (
        <div className={cx("wrapper")}>
            <div className={cx("action_nav_head")}>
                <div className={cx('nav-btn', { show: boxShow === 'rate' })} onClick={() => setBoxShow('rate')}>
                    <h2>Rating</h2>
                </div>
                <div className={cx('nav-btn', { show: boxShow === 'des' })} onClick={() => setBoxShow('des')}>
                    <h2>Description</h2>
                </div>
            </div>
            <div className={cx("action_nav_body")}>
                {boxShow === 'rate' ? (
                    <div className={cx("item_rating")}>
                        <Comment/>
                    </div>
                ) : (
                    <div className={cx("item_description")}>
                        <p>
                            {item.description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(ReviewBox);
