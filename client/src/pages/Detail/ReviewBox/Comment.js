import styles from "./ReviewBox.module.scss";
import classNames from "classnames/bind";
import Button from "../../../components/Button";

const cx = classNames.bind(styles);

function Comment() {
    return (
        <div className={cx('cmt_wrapper')}>
            <div className={cx("product-avg-ratting")}>
                <h4>4.5 <span>(overall)</span></h4>
                <span>Based on 9 Comments</span>
            </div>
            <div className={cx("product-comment-box")}>
                <div className={cx("product-comment-view")}>
                    <div className={cx("product-comment-view-info")}>
                        <div className={cx("product-comment-author")}>
                            <span>Nguyễn Quang Đăng</span>
                        </div>
                        <div className={cx("product-comment-time")}>
                            <span>12:24</span>
                            <span>5 March 2016</span>
                        </div>
                    </div>
                    <p className={cx("product-comment-view-title")}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nost rud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nost.
                    </p>
                </div>
            </div>
            <div className={cx("comment-form-wrap-box")}>
                <h3>ADD YOUR COMMENTS</h3>
                <form action="#" className={cx("comment-form-action")}>
                    <div className={cx("input-name-box")}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" value="" placeholder="Type your name" />
                    </div>
                    <div className={cx("input-email-box")}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" value="" placeholder="Type your email address" />
                    </div>
                    <div className={cx("input-comment-box")}>
                        <label htmlFor="comment">Your comment:</label>
                        <textarea name="" id="" cols="30" rows="10" placeholder="White a comment"></textarea>
                    </div>
                    <div className={cx("input-btnsubmit-box")}>
                        <Button type={"submit"}>Add Comment</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Comment;