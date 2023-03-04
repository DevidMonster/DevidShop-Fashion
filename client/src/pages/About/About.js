import styles from './About.module.scss';
import classNames from 'classnames/bind';
import Article from '../../components/Article/Article';
import * as request from '../../utils/httpRequest';
import Loading from '../../components/Loading';
import { useState, useEffect } from 'react'

const cx = classNames.bind(styles)

function About() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true)
            const res = await request.get('/profile/about')
            setLoading(false)
            setData(res)
        }
        fetchApi()
    }, [])
    return (  
        <div className={cx('wrapper')}>
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "30px 0"}}>
                    <Loading/>
                </div>
            ) : (
                <div className={cx('content')}>
                    {data?.map(article => (
                        <Article src={article.image} title={article.title}>
                            {article.content}
                        </Article>
                    ))}
                </div>
            )}
        </div>
    );
}

export default About;