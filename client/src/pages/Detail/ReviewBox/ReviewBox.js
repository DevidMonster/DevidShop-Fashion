import styles from "./ReviewBox.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

const cx = classNames.bind(styles);

function ReviewBox({ data = [] }) {
  const [boxShow, setBoxShow] = useState("des");

  return (
    <div className={cx("wrapper")}>
        <div className={cx("action_nav_head")}>
            <div className={cx('nav-btn')} onClick={() => setBoxShow('rate')}>
                <h3>Rating</h3>
            </div>
            <div className={cx('nav-btn')} onClick={() => setBoxShow('des')}>
                <h3>Description</h3>
            </div>
        </div>
        <div className={cx("action_nav_body")}>
            {boxShow === 'rate' ?  (
                <div className={cx("item_rating")}>
                  
                </div>
            ) : (
                <div className={cx("item_description")}>
                  Des
                </div>
              )}
        </div>
    </div>
  );
}

export default ReviewBox;
