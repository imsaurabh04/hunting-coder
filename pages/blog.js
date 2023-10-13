import styles from '@/styles/Blog.module.css'
import Link from "next/link"
import { useState } from 'react'
import fs from "fs"
import InfiniteScroll from 'react-infinite-scroll-component';

const Blog = (props) => {

    const [blogs, setBlogs] = useState(props.allBlogs)
    const [count, setCount] = useState(6)

    const fetchData = async () => {
        
        let d = await fetch(`api/blogs/?count=${count+2}`)
        let data = await d.json()
        setCount(count + 2)
        setBlogs(data)
        
      };

    return (
        <div className={styles.main}>
            <div className={styles.blogItem}>

                <InfiniteScroll
                    dataLength={blogs.length}
                    next={fetchData}
                    hasMore={props.allCount !== blogs.length}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                {blogs.map((blogItem, index) => {
                    return (
                        <div className={styles.blogContainer} key={index}>
                            <Link href={`blogpost/${blogItem.slug}`}>
                                <h2>
                                    {blogItem.title}
                                </h2>
                            </Link>
                            <p>
                                {blogItem.subTitle.substr(0, 140)}...
                                <Link className={styles.btn} href={`/blogpost/${blogItem.slug}`}> Read More</Link>
                            </p>
                        </div>
                        )
                    })
                }
                </InfiniteScroll>

            </div>
        </div>
    )

}

export async function getStaticProps() {

    let myfile;
    let allBlogs = [];

    let data = await fs.promises.readdir("blogdata/")
    let allCount = data.length

    for (let index = 0; index < 6; index++) {
        const item = data[index];
        myfile = await fs.promises.readFile(("blogdata/" + item), "utf-8")
        allBlogs.push(JSON.parse(myfile))
    }

    return { props: { allBlogs, allCount } }
}

export default Blog
