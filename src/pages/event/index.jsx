import Image from "next/image";
import React from "react";
import SectionHeader from "../../components/UI/SectionHeader";
import RootLayout from "../../layouts/RootLayout";

const Event = () => {
  return (
    <div className="w-11/12 max-w-[1200px] mx-auto mb-20">
      <SectionHeader
        title="Event"
        styles="text-2xl sm:text-3xl lg:text-4xl text-center pb-10"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6 md:gap-10">
        <div>
          <Image
            src="https://i.ibb.co/VHSBpMm/event.jpg"
            className="w-full"
            width={1000}
            height={400}
            alt="event"
          />
        </div>
        <div>
          <h4 className="text-xl md:text-2xl lg:text-4xl font-semibold">
            Car Show Extravaganza
          </h4>
          <h4 className="py-2">
            <strong>Date: </strong> 16, December 2023
          </h4>
          <h4>
            <strong>Time: </strong> 10:00 AM - 4:00 PM
          </h4>
          <h4 className="py-2">
            <strong>Location: </strong> Chattogram, Bangladesh
          </h4>
          <p>
            Prepare for a spectacular showcase at our Car Show Extravaganza.
            Join us for a thrilling day filled with the latest automotive
            marvels, vintage classics, and custom masterpieces. Located at
            [Venue Name], this event promises not only a visual feast for car
            enthusiasts but also a fun-filled experience for all. In addition to
            the stunning cars, you can enjoy delicious food, live music, and
            connect with fellow automotive enthusiasts. Get ready for an
            unforgettable day at our Car Show Extravaganza, where the world of
            automobiles comes to life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Event;

Event.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
