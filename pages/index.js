import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import fs from "fs"
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {

  const [ blogs, setBlogs ] = useState(props.allBlogs)

  return (
    <>
      <Head>
        <title>Hunting Coder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
         
        <div className={styles.center}>
          {/* <Image
            className={styles.logo}
            src="/hunting-coder-logo.png"
            alt="hunting coder"
            width={450}                   
            height={300}
            priority
          /> */}
          <img 
            className={styles.img} 
            src="hunting-coder.jpg" 
            alt="hunting coder" 
            width={320}                   
            height={180}
          />
          <h1 className={styles.name}>&lt;hunting coder /&gt;</h1>
          <h2 className={styles.intro}>A blog for hunting coders by a <span>hunting coder</span></h2>
        </div>

        <h3 className={styles.cat_heading}>Popular Blogs</h3>

        <div className={styles.grid}>
        {blogs.map((blogItem, index) => { 
          return (
            <div key={index}>
              <a
                href={`blogpost/${blogItem.slug}`}
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2>
                  {blogItem.title}<span>-&gt;</span>
                </h2>
                <p>
                  {blogItem.subTitle.substr(0, 100)}...
                  </p>
              </a>
            </div>
          )
        })}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {

  let myfile;
  let allBlogs = [];

  let data = await fs.promises.readdir("blogdata/")
  data = data.slice(0, 3)

  for (let index = 0; index < data.length; index++) {
      const item = data[index];
      myfile = await fs.promises.readFile(("blogdata/" + item), "utf-8")
      allBlogs.push(JSON.parse(myfile))   
  }

  return { props: { allBlogs } }
}