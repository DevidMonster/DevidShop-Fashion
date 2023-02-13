import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { noticeSelector } from '../../redux/selectors';

function Toastify() {
    const contentNotice = useSelector(noticeSelector) 

    let type = toast.info 

    if(contentNotice.type === "success") {
        type = toast.success
    }

    if(contentNotice.type === "error") {
        type = toast.error
    }

    const notify = (content) => type(content, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    useEffect(() => {
        if(Object.keys(contentNotice).length > 0) notify(contentNotice.content)
    }, [contentNotice])

    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    )
}

export default Toastify;