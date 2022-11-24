import { createClient } from "next-sanity";

import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import Head from "next/head";
import Image from "next/image";
export default function Home({ posts }) {
  const client = createClient({
    projectId: "gs7n2rfb", //Project id is in the sanity.json
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
 
 
  return (
    <div>
      <Head>
        <title>VioEnd - Sports, Gaming and Tournament </title>
        <meta
          name="description"
          content="Vioend is a place where you can read gaming blogs and join esports tournament. Get the latest News on gaming and sports and products such as tshirts and toys."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet"/>
      </Head>
      <div className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-no-repeat bg-cover border-y border-black py-5 lg:py-10 my-10 mx-3 sm:mx-32">
        <div className="px-10 space-y-5">
          <div className="text-xl sm:text-4xl  max-w-2xl font-merri">
            <p>
              Vioend is a place where you can read Gaming Blogs and join gaming
              tournament.
            </p>
          </div>

          <span>
            Its easy and free to read blogs and join esports tournament{" "}
          </span>
        </div >
<div className="w-32">
        <Image
          className="hidden md:inline-flex  lg:h-28 "
          src="/join.png"
          alt="join"
          width={512}
          height={512}
          /></div>
      </div>

      <h2 className="text-[#000] text-5xl pt-4 text-center font-serif">
        Recent Blogs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 ">
        {posts.map((arg) => {
          return (
            <Link href={"/blogs/" + arg.slug.current} key={arg.slug}>
              <div className="group cursor-pointer shadow-md overflow-hidden">
                <Image
                  src={builder.image(arg.mainImage).url()}
                  alt="gaming"
                  width={417}
                  height={250}  
                  className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                />

                <div
                  className="flex justify-center
                  p-5 bg-white"
                >
                  <div>
                    <p className="text-2xl leading-6 tracking-tighter font-medium font-roboto hover:text-blue-900">{arg.title}</p>
                    <p className="text-sm py-2 font-roboto">{arg.metadesc} </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const client = createClient({
    projectId: "gs7n2rfb", //Project id is in the sanity.json
    dataset: "production",
    useCdn: false,
  });
  const posts = await client.fetch(`*[_type == "post"][0..3]{
    _id,
    title,
    author ->{
      name,
    },
    metadesc,
    mainImage,
    slug
    
  }`); //The post.js in backend and fetching the content from the post.js in backend. You need to rememeber the syntax how to use author and its value like name. Make sure in the time of publishing you should define your author otherwise it will give you an error : Can't define the properties of undefine

  return {
    props: {
      posts, //Return the fetch variable
    },
  };
}
