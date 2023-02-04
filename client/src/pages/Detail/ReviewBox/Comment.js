import styles from "./ReviewBox.module.scss";
import classNames from "classnames/bind";

import Button from "../../../components/Button";
import ShowComment from "../../../components/ShowComment";

import { useEffect, useState } from "react";
import * as request from '../../../utils/httpRequest';

const cx = classNames.bind(styles);

function Comment({ id }) {
    const [nameValue, setNameValue] = useState("")
    const [emailValue, setEmailValue] = useState("")
    const [contentValue, setContentValue] = useState("")
    const [err, setErr] = useState({ errName: false, errEmail: false, errContent: false })
    const [reload, setReload] = useState(false)

    const handlePostData = () => {
        console.log(contentValue)
        if(nameValue !== "" && emailValue !== "" && contentValue !== "") {
           
            const object = {
                product_id: id,
                name: nameValue,
                email: emailValue,
                content: contentValue
            }
            const postData = async () => {
                const result = await request.post("/comment/create", {
                    ...object
                })
                console.log(result)
                setReload(prev => !prev)
                setErr({ errName: false, errEmail: false, errContent: false })
                setNameValue("")
                setEmailValue("")
                setContentValue("")
            }
            postData()
        } else {
            console.log("run else")
            if(nameValue === "") {
                setErr(prev => ({...prev, errName: true}))
            } else {
                setErr(prev => ({...prev, errName: false}))
            }
            if(emailValue === "") {
                setErr(prev => ({...prev, errEmail: true}))
            }else {
                setErr(prev => ({...prev, errEmail: false}))
            }
            if(contentValue === "") {
                setErr(prev => ({...prev, errContent: true}))
            }else {
                setErr(prev => ({...prev, errContent: false}))
            }
        }
    }
    
    return (
        <div className={cx('cmt_wrapper')}>
            <ShowComment reload={reload} id={id}/>
            <div className={cx("comment-form-wrap-box")}>
                <h3>ADD YOUR COMMENTS</h3>
                <form className={cx("comment-form-action")}>
                    <div className={cx("input-name-box", { input_box: err.errName })}>
                        <label htmlFor="name">Name:</label>
                        <input className={cx({error: err.errName})} type="text" value={nameValue} placeholder="Type your name" onChange={(e) => setNameValue(e.target.value)}/>
                    </div>
                    <div className={cx("input-email-box",{input_box: err.errEmail})}>
                        <label htmlFor="email">Email:</label>
                        <input className={cx({error: err.errEmail})} type="email" value={emailValue} placeholder="Type your email address" onChange={(e) => setEmailValue(e.target.value)}/>
                    </div>
                    <div className={cx("input-comment-box", {input_box: err.errContent})}>
                        <label htmlFor="comment">Your comment:</label>
                        <textarea className={cx({error: err.errContent})}  cols="30" rows="10" placeholder="White a comment" onChange={(e) => setContentValue(e.target.value)} value={contentValue}></textarea>
                    </div>
                    <div className={cx("input-btnsubmit-box")}>
                        <Button type={"button"} onClick={handlePostData}>Add Comment</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Comment;