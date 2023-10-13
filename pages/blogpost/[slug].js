import { useRouter } from "next/router"
import styles from '@/styles/Blogpost.module.css'
import { useState } from 'react'
import fs from "fs"

const Slug = (props) => {
    
    const [ blog, setBlog ] = useState(props.myBlog)

    function createMarkup(content) {
        return {__html: content};
      }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h1>{blog && blog.title}</h1>
            </div>
            <div>
                <h3>
                    {blog && blog.subTitle}
                </h3>
                <h4>Author: {blog && blog.author}</h4>
            </div>
            <hr/>
            {blog &&
            <div 
                className={styles.content}
                dangerouslySetInnerHTML={createMarkup(blog.content)}
            ></div>}
        </div>
    )
}

export async function getStaticPaths() {

    let allB = await fs.promises.readdir("blogdata/")
    allB = allB.map((item) => {
        return { params: { slug: item.split(".")[0] }}
    })

    const paths = allB

    return { 
        paths, 
        fallback: true 
    }
  }

export async function getStaticProps(context) {
    const {slug} = context.params

    const myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8")

    return { props: { myBlog: JSON.parse(myBlog) } }
  }

export default Slug