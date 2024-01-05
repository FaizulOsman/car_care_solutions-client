import React from "react";
import { BsArrowRight } from "react-icons/bs";
import RootLayout from "../../layouts/RootLayout";
import SectionHeader from "../../components/UI/SectionHeader";
import Link from "next/link";
import { useRouter } from "next/router";

const SingleNews = () => {
  const { query } = useRouter();

  const newsData = [
    {
      id: 1,
      image:
        "https://di-uploads-pod5.s3.amazonaws.com/mccluskeychevy/uploads/2014/06/2013-Chevy-Volt.jpg",
      creator: "Roni chowdhury",
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
      creator: "Shuvo Khan",
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
      <div className="flex flex-col sm:flex-row justify-between gap-4 p-3">
        <div className="w-full sm:w-[50%] relative">
          <div className="w-full h-full">
            <img
              className="news-image w-full h-full"
              src={newsData[query?.newsId - 1]?.image}
              alt=""
            />
          </div>
          <div className="absolute bottom-0 right-0 flex text-white">
            <span className="bg-blue-500 py-1 px-2">
              {newsData[query?.newsId - 1]?.date?.slice(0, 2)}
            </span>
            <span className="bg-[#7a7a7a] py-1 px-2">
              {" "}
              {newsData[query?.newsId - 1]?.date?.slice(3, 6)}{" "}
              {newsData[query?.newsId - 1]?.date?.slice(7, 9)}
            </span>
          </div>
        </div>
        <div className="w-full sm:w-[50%] flex flex-col justify-between">
          <div>
            <SectionHeader
              title={newsData[query?.newsId - 1]?.title}
              styles="text-xl sm:text-2xl lg:text-3xl pb-5"
            />
            <p className="">{newsData[query?.newsId - 1]?.description}</p>
          </div>

          <div className="rounded-md flex justify-between items-center mt-3">
            <div className="flex items-center gap-4 pb-4">
              <img
                className="w-[60px] h-[60px] border-2 border-white"
                src={`https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(${
                  newsData[query?.newsId - 1]?.id + 1
                }).jpg`}
                alt="avatar"
              />
              <div>
                <p>by-</p>
                <h4 className="font-semibold">
                  {newsData[query?.newsId - 1]?.creator}
                </h4>
              </div>
            </div>
            <p className="text-sm">
              Command {newsData[query?.newsId - 1]?.commands?.length}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h5 className="text-gray-400 text-sm font-semibold">Recent Articles</h5>
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 border-b-2 pb-6">
          {newsData?.map((data, index) => (
            <Link
              href={`/latest-news/${data?.id}`}
              key={index}
              className="text-lg md:text-xl cursor-pointer hover:text-primary font-semibold text-gray-600"
            >
              {data?.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleNews;

SingleNews.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
