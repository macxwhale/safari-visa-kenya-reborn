
import { Link } from "react-router-dom";

const InfoCards = () => (
  <section className="bg-[#F4F4F4] lg:-mt-[120px] lg:pt-[80px]">
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:py-12">
      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl ring-1 ring-gray-50 lg:grid-cols-3 border">
        <div className="relative flex flex-col bg-white p-4 sm:px-7">
          <dd className="shrink-0 text-lg font-semibold tracking-tight text-[#244FBB] lg:text-2xl">
            How to apply
          </dd>
          <dt className="mt-5 flex flex-col">
            <p className="text-base tracking-normal text-[#909090]">
              Learn about the process and requirements for applying for Kenya&apos;s eTA
            </p>
            <div className="mt-4">
              <svg className="w-10 h-10 sm:w-16 sm:h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 65 64">
                <circle cx="32.5" cy="32" r="32" fill="#14B04C" fillOpacity=".2"/>
                <rect x="22.5" y="20" width="20" height="24" rx="2" fill="#244FBB" />
              </svg>
            </div>
            <div className="mt-auto pt-5 sm:pt-10">
              <Link
                to="/how-to-apply"
                className="text-[#14B04C] border-[#14B04C] btn btn-outline rounded-full px-6 py-2 font-medium inline-flex items-center"
              >
                View details
              </Link>
            </div>
          </dt>
        </div>
        <div className="relative flex flex-col bg-white p-4 sm:px-7">
          <dd className="text-lg font-semibold tracking-tight text-[#244FBB] lg:text-2xl">
            General Information
          </dd>
          <dt className="mt-5 flex flex-1 flex-col justify-between">
            <p className="text-base tracking-normal text-[#909090]">
              Learn more about eligibility, exemptions and application processing.
            </p>
            <div className="mt-4">
              <svg className="w-10 h-10 sm:w-16 sm:h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 65 64">
                <circle cx="32.5" cy="32" r="32" fill="#244FBB" fillOpacity=".15"/>
                <rect x="24" y="24" width="16" height="16" rx="2" fill="#14B04C" />
              </svg>
            </div>
            <div className="mt-auto pt-5 sm:pt-10">
              <Link
                to="/general-information"
                className="text-[#14B04C] border-[#14B04C] btn btn-outline rounded-full px-6 py-2 font-medium inline-flex items-center"
              >
                View details
              </Link>
            </div>
          </dt>
        </div>
        <div className="relative flex flex-col bg-white p-4 sm:px-7">
          <dd className="text-lg font-semibold tracking-tight text-[#244FBB] lg:text-2xl">
            FAQs
          </dd>
          <dt className="mt-5 flex flex-1 flex-col">
            <p className="text-base tracking-normal text-[#909090]">
              Some of the frequently asked questions about eTA
            </p>
            <div className="mt-4">
              <svg className="w-10 h-10 sm:w-16 sm:h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 65 64">
                <circle cx="32.5" cy="32" r="32" fill="#244FBB" fillOpacity=".1"/>
                <rect x="27" y="20" width="11" height="24" rx="2" fill="#244FBB" />
              </svg>
            </div>
            <div className="mt-auto pt-5 sm:pt-10">
              <Link
                to="/faqs"
                className="text-[#14B04C] border-[#14B04C] btn btn-outline rounded-full px-6 py-2 font-medium inline-flex items-center"
              >
                View details
              </Link>
            </div>
          </dt>
        </div>
      </dl>
    </div>
  </section>
);

export default InfoCards;
