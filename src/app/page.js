import AvailableStudyRooms from "@/components/AvailableStudyRooms";
import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Banner />
      <AvailableStudyRooms />
      <WhyChooseUs />
      <HowItWorks />
    </>
  );
}
