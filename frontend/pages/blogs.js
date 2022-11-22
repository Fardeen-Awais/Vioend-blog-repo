import React from "react";

import Link from "next/link";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url"

function Blogs({ posts }) {
    const client = createClient({
        projectId: "gs7n2rfb", //Project id is in the sanity.json
        dataset: "production",
        useCdn: false,
      });
      const builder = imageUrlBuilder(client);
  return (
    <div>
       <div className='bg-white'>
   
     
          <h2 className="text-[#000] text-5xl pt-4 text-center font-serif"> Blog Section</h2>


          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 '>
          {posts.map((arg) => {
            return (
          
                <Link href={"/blogs/" + arg.slug.current} key={arg.slug}>
                  <div className="group cursor-pointer shadow-md overflow-hidden">
                    <img
                      src={builder.image(arg.mainImage).width(700).url()}
                      alt="gaming"
                      className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
                      
                    />
                  
                  <div className="flex justify-center
                  p-5 bg-white">
                    <div>
                    <p className="text-2xl">{arg.title}</p>
                    <p>{arg.metadesc} </p>
                  </div>
                  </div>
                  </div>
                </Link>
          
            );
          })}
        </div>
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
export default Blogs;