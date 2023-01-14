import { createClient } from "next-sanity";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import Head from "next/head";
import Image from "next/image";
export default function Home({ posts }) {
  const client = createClient({
    projectId: "gs7n2rfb", //Project id is in the sanity.json
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
 
  const [text] = useTypewriter({
    words: ['Get Gaming News and updates ', 'Buy Gaming Products','Join Esports Tournament'],
    delaySpeed: 2000,

    loop: Infinity,
   
  })
  return (
    <div className="">
      <Head>
        <title>Vioend - Sports, Gaming and Tournament </title>
        
        <meta
          name="description"
          content="Vioend is a place where you can read gaming blogs and join esports tournament. Get the latest News on gaming and sports and products such as tshirts and toys."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      </Head>

      <div className="flex flex-col justify-center text-center item-center h-[100vh] snap-center bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 ">
          <h2 className="text-4xl md:text-6xl font-semibold font-serif b">Welcome to Vioend</h2>
    <p className='text-2xl md:text-3xl font-serif my-16'>
    
        <span>{text}</span>
      <Cursor cursorColor='white' />
      </p>
      
      <div className="Downward absolute bottom-0 right-[40%] md:hidden cursor-pointer">
      <p className="bottom-0 ">Swipe Down </p>
      <Link href={'#blog'}><ExpandMoreIcon fontSize="large"  /></Link>
      </div>
    </div>
     
     <div id="blog" className="blog snap-center">
      <h2 className="text-[#000] text-5xl text-center font-serif my-16">
        Recent Blogs
      </h2>

      <div className="
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 m-7 md:p-6 ">
        {posts.map((arg) => {
          return (
            <Link href={"/blogs/" + arg.slug.current} key={arg.slug}>
              <div className="group cursor-pointer shadow-md overflow-hidden my-2">
                <Image
                  src={builder.image(arg.mainImage).url()}
                  alt="gaming"
                  width={700}
                  height={400}  
                  className="h-60 w-full object-cover transition-transform duration-200 ease-in-out center group-hover:scale-105"
                />

                <div
                  className="flex justify-center
                  p-5 bg-white"
                >
                  <div>
                    <p className="text-2xl leading-7 tracking-tight font-medium  hover:text-blue-900">{arg.title}</p>
                    <p className="text-sm py-2 tracking-wider">{arg.metadesc} </p>
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
  const posts = await client.fetch(`*[_type == "post"][0..2]{
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
