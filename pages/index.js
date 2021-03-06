import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Post from "../components/Post";
import sortByDate from "../utlis"
export async function getStaticProps() {
  //get files from post dir
  const files = fs.readdirSync(path.join("posts"));
  //get slug and frontmatter from posts
  const posts = files.map((filename) => {
    //createslug
    const slug = filename.replace(".md", "");
    //create frontmatter
    const markdownWithMatter = fs.readFileSync(
      path.join("posts", filename),
      "utf8"
    );
    const { data: frontmatter } = matter(markdownWithMatter);

    return {
      slug,
      frontmatter,
    };
  });
  return {
    props: {
      posts: posts.sort(sortByDate)
    },
  };
}

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Invincible</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/invincibleLogo.png" />
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <Post post={post} key={index}/>
        ))}
      </div>
    </div>
  );
}
