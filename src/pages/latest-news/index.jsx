import React from "react";
import { BsArrowRight } from "react-icons/bs";
import RootLayout from "../../layouts/RootLayout";
import SectionHeader from "../../components/UI/SectionHeader";
import Link from "next/link";
import { useRouter } from "next/router";
import SectionTopHeader from "../../components/UI/SectionTopHeader";

const LatestNewsPage = () => {
  const { route } = useRouter();

  const newsData = [
    {
      id: 1,
      image:
        "https://di-uploads-pod5.s3.amazonaws.com/mccluskeychevy/uploads/2014/06/2013-Chevy-Volt.jpg",
      creator: "Alan Walker",
      creatorImg: `https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(${1}).jpg`,
      title: "Finding the Best Value for Your Car",
      description:
        "Embark on a journey to optimize your car's value with our latest blog at Car care solutions. From decoding market trends to highlighting the impact of regular maintenance on resale value, we guide you through essential steps. Explore the importance of comprehensive documentation, the transformative potential of cosmetic enhancements, and the latest tech features that can enhance your car's overall worth. At Car care solutions, we're dedicated to providing insights that extend beyond routine service, empowering you to make informed choices about your vehicle's lasting value.        ",
      date: "12-Dec-23",
      commands: ["Thanks for the information", "Thanks"],
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzR874OEF2PMj9bPjgvrVESO0Z3blT6f-mwT3DFLa704ixSdFzbL8c421oj8IoRhBqnhI&usqp=CAU",
      creator: "John Doe",
      creatorImg: `https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(${1}).jpg`,
      title: "How to Assess the Value of your Car",
      description:
        "Dive into our latest blog post, 'How to Assess the Value of Your Car,' and unlock the secrets to understanding your vehicle's true worth. We guide you through a step-by-step process, from evaluating market trends to scrutinizing the impact of mileage and maintenance history. Learn the significance of factors like vehicle condition, features, and upgrades that contribute to your car's overall appraisal. At Car care solutions, we empower you with the knowledge to confidently assess your car's value, ensuring you make informed decisions in the ever-evolving automotive landscape.",
      date: "16-Dec-23",
      commands: [
        "Thanks for the information",
        "I appreciate the information",
        "Wow!",
      ],
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1506610654-064fbba4780c?w=420&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MTA3NTQ0MDR8fGVufDB8fHx8fA%3D%3D",
      creator: "Amin Khan",
      creatorImg: `https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(${1}).jpg`,
      title: "Why EVs Could Cost Less in the Long Run",
      description:
        "Explore the intriguing world of electric vehicles in our latest blog, 'Why EVs Could Cost Less in the Long Run.' Delve into the economic benefits of making the switch, as we dissect factors such as reduced maintenance, government incentives, and the evolving landscape of renewable energy. Uncover how the lower operational costs, fewer moving parts, and extended lifespan of EVs contribute to a more cost-effective and sustainable driving experience. At [Your Company Name], we shed light on the long-term financial advantages of embracing electric mobility, helping you make informed choices for a greener and economically efficient future.",
      date: "18-Dec-23",
      commands: ["Thanks for the information"],
    },
    {
      id: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs3usDcFrjfL-pd5QXtUJH2PZ9Y2DFOSCAMh_3RMEhpoartrPlNmMzQgAZZ0BU9bijPqY&usqp=CAU",
      creator: "Kahaf Khan",
      creatorImg: `https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(${1}).jpg`,
      title: "CAR SERVICING TIPS",
      description:
        "In our latest blog post, 'Car Servicing Tips,' we share valuable insights to keep your vehicle running smoothly and efficiently. Explore expert advice on timely maintenance schedules, essential fluid checks, and the significance of routine inspections. Learn about DIY tips for minor repairs and how proactive care can prevent costly issues down the road. At [Your Company Name], we're dedicated to empowering car owners with practical tips for maintaining their vehicles, ensuring a reliable and enjoyable driving experience.",
      date: "22-Dec-23",
      commands: ["Thanks for the information", "Good information"],
    },
  ];

  return (
    <div className="w-11/12 max-w-[1200px] mx-auto mb-20">
      <div className="flex items-center justify-center flex-col">
        <SectionTopHeader
          title="NEWS & UPDATES"
          styles="text-md sm:text-lg lg:text-xl text-center text-[#EB3300] pb-3"
        />
        <SectionHeader
          title="Latest News"
          styles="text-2xl sm:text-3xl lg:text-4xl text-center pb-5"
        />
        <p className="max-w-[500px] mx-auto mb-5 leading-relaxed text-gray-600 text-center pb-5">
          The sorts of machines, processes, and materials that are used in
          industry, transport, and communication{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {newsData?.map((news, index) => (
          <div
            key={index}
            className="single-news bg- shadow-md border rounded-md flex flex-col sm:flex-row justify-between gap-4 p-3 hover:shadow-lg hover:scale-105 duration-200"
          >
            <div className="w-full sm:w-[50%] relative">
              <div className="w-full h-full">
                <img
                  className="news-image w-full h-full"
                  src={news?.image}
                  alt=""
                />
              </div>
              <div className="absolute bottom-0 right-0 flex text-white">
                <span className="bg-[#EB3300] py-1 px-2">
                  {news?.date?.slice(0, 2)}
                </span>
                <span className="bg-[#7a7a7a] py-1 px-2">
                  {" "}
                  {news?.date?.slice(3, 6)} {news?.date?.slice(7, 9)}
                </span>
              </div>
            </div>
            <div className="w-full sm:w-[50%] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 pb-4">
                  <img
                    className="w-[60px] h-[60px] border-2 border-white"
                    src={`https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(${
                      index + 1
                    }).jpg`}
                    alt="avatar"
                  />
                  <div>
                    <p>By-</p>
                    <h4 className="font-semibold">{news?.creator}</h4>
                  </div>
                </div>
                <h5 className="font-semibold pb-2">{news?.title}</h5>
                <p className="">{news?.description?.slice(0, 100)}...</p>
              </div>
              <div className="read-more rounded-md flex justify-between items-center mt-3">
                <div className="next-button">
                  <div className="link_wrapper">
                    <Link
                      href={`/latest-news/${news?.id}`}
                      className="bg-[#EB3300] border-[3px] border-[#EB3300] text-white hover:border-[3px] hover:text-[#EB3300]"
                    >
                      Read More
                    </Link>
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 268.832 268.832"
                        className="fill-[#EB3300]"
                      >
                        <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-sm command pr-2 hover:hidden">
                  Command {news?.commands?.length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h5 className="text-gray-400 text-sm font-semibold">Recent Articles</h5>
        <div
          className={`px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 pb-6 ${
            route === "/latest-news" || "border-b-2"
          }`}
        >
          {newsData?.map((data, index) => (
            <h4
              key={index}
              className="text-xl cursor-pointer hover:text-[#EB3300] font-semibold text-gray-600"
            >
              {data?.title}
            </h4>
          ))}
        </div>
        {route === "/latest-news" || (
          <div className="mt-4 text-center">
            <div className="text-[#EB3300] font-bold cursor-pointer">
              <Link
                href="/latest-news"
                className="flex gap-4 items-center justify-center"
              >
                <span className="mr-2 hover:tracking-wider duration-300">
                  Read More Articles
                </span>
                <BsArrowRight />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestNewsPage;

LatestNewsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
