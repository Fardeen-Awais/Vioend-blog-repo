import { useRouter } from "next/router";
import { createClient } from "next-sanity";
import PortableText from "react-portable-text";
import imageUrlBuilder from "@sanity/image-url";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
const Post = ({ blog }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [state, setstate] = useState(false);
  const client = createClient({
    projectId: "gs7n2rfb", //Project id is in the sanity.json
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setstate(true);
      })
      .catch((errors) => {
        console.log(errors);
        setstate(false);
      });
  };

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.metadesc} />
        <meta name="author" content={blog.author.name} />
      </Head>
      <div className=" mx-auto p-10 max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-5xl  font-roboto m-[90px] mt-6 ">
        <h1 className="sm:text-4xl font-semibold text-3xl mb-4 ">
              {blog.title}
            </h1>
      <article>
            
            
              <PortableText
                content={blog.body}
                projectId="gs7n2rfb"
                dataset="production"

                serializers={{
                  h2: (props) => <h2 className="sm:text-4xl text-3xl font-bold  " {...props} />,
                  h3: (props) => <h3 className="sm:text-3xl text-2xl font-bold  " {...props} />,
                  highlight: (props) => <highlight className="bg-[#ffff86]" {...props} />,
                  summery: ({children}) =>( 
                    <summery className="w-fit sm:w-full mx-auto flex items-start my-4 p-10 bg-yellow-100 text-lg">
                     
                      {children}
                    </summery>
                  ),
                  code: (props) => <code className="bg-yellow-100 my-8 " {...props} />,
                  ul: (props) => <ul className="list-disc m-5 text-lg marker:text-cyan-600 list-outside" {...props} />,
                  code: (props) => <code className="bg-yellow-100 my-8 " {...props} />,
                  ol: (props) => <ul className="list-decimal m-5 text-lg" {...props} />,
                  normal: ({children}) => <p className="text-xl ">{children}<br/></p>  ,
                  link: ({ children }) => (
                    <a href={children} className=" text-cyan-600 hover:text-pink-600 py-3 cursor-pointer underline ">{children} </a>
                  ),
                  
                  
                }}
              />
           
            </article>
            </div>
          {/* Commments */}
          <div className="flex flex-col p-10 my-10 ">
            <hr className="py-3 mt-2" />
            <h4 className="text-2xl sm:text-4xl font-semibold mx-auto p-5">
              Commment Section
            </h4>
            {blog.comments.map((comment) => (
              <div key={comment._id} className="flex justify-center">
                <span className="text-yellow-500 font-bold px-1">
                  {comment.name}:
                </span>
                <p>{comment.comment}</p>
              </div>
            ))}
          </div>
        
        {state ? (
          <div className="flex flex-col p-14 my-10 bg-black max-w-2xl mx-auto text-white">
            <h3 className="text-2xl">Thanks for your feedback!</h3>
            <p>Once it has been Approved, it will appear below</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col max-w-2xl mx-auto mb-10 "
          >
            <hr className="py-3 mt-2" />
            <h4 className="text-3xl font-bold py-3 mx-auto">Post a Comment</h4>
            <input
              {...register("_id")}
              type="hidden"
              name="_id"
              value={blog._id}
            />
            <label className="block mb-5 px-4">
              <span className="px-2 text-gray-700">Name</span>
              <input
                {...register("name", { required: true })}
                type="text"
                className="shadow border rounded mx-1 py-2 px-3 form-input mt-1 block w-[90vw] sm:w-full ring-yellow-500 outline-none focus:ring"
                placeholder="Joe Root"
              />
            </label>
            <label className="block mb-5 px-4">
              <span className="px-2 text-gray-700">Email</span>
              <input
                {...register("email", { required: true })}
                type="email"
                className="shadow border rounded mx-1 py-2 px-3 form-input mt-1 block  ring-yellow-500  outline-none focus:ring w-[90vw] sm:w-full"
                placeholder="@youremail.com"
              />
            </label>
            <label className="block mb-5 px-4">
              <span className="px-2 text-gray-700">Comment</span>
              <textarea
                {...register("comment", { required: true })}
                className="shadow border rounded mx-1 py-2 px-3 form-input mt-1 block w-[90vw] sm:w-full  ring-yellow-500 outline-none focus:ring"
                placeholder="Express YourSelf"
                rows={8}
              />
            </label>

            <div className="flex flex-col p-5">
              {errors.name && (
                <span className="text-red-500">The name field is required</span>
              )}
              {errors.email && (
                <span className="text-red-500">
                  The email field is required
                </span>
              )}
              {errors.comment && (
                <span className="text-red-500">
                  The comment field is required
                </span>
              )}
            </div>
            <input
              type="submit"
              className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 mx-auto rounded cursor-pointer w-[20vw]"
            />
          </form>
        )}
      
    </>
  );
};

export default Post;
export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  const client = createClient({
    projectId: "gs7n2rfb", //Project id is in the sanity.json
    dataset: "production",
    useCdn: false,
  });
  const query = `*[_type == "post" && slug.current == '${slug}'][0]{
    _id,
    _createdAt,
    title,
    mainImage,
    metadesc,
    author->{
      name
    },
    'comments':*[
      _type=="comment" &&
      post._ref == ^._id &&
      approved == true
    ],
    slug,
    body

  }`; //The post.js in backend and fetching the content from the post.js in backend
  const blog = await client.fetch(query);

  return {
    props: {
      blog, //Return the fetch variable
    },
  };
};
