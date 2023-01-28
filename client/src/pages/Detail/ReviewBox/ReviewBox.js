import styles from "./ReviewBox.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

const cx = classNames.bind(styles);

function ReviewBox({ data = [] }) {
  const [boxShow, setBoxShow] = useState("des");

  return (
    <div className={cx("wrapper")}>
        <div className={cx("action_nav_head")}>
            <div className={cx('nav-btn', { show: boxShow == 'rate' })} onClick={() => setBoxShow('rate')}>
                <h2>Rating</h2>
            </div>
            <div className={cx('nav-btn', { show: boxShow == 'des' })} onClick={() => setBoxShow('des')}>
                <h2>Description</h2>
            </div>
        </div>
        <div className={cx("action_nav_body")}>
            {boxShow === 'rate' ?  (
                <div className={cx("item_rating")}>
                  4.5 (overall)
                  Based on 2 Comments
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
