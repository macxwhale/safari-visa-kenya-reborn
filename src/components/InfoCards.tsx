
import { Link } from "react-router-dom";

const InfoCards = () => (
  <section className="bg-[#F4F4F4] lg:-mt-[100px] lg:pt-[60px] py-8">
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:py-12">
      <dl className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl ring-1 ring-gray-200 lg:grid-cols-3 shadow-sm">
        <div className="relative flex flex-col bg-white p-6 sm:p-8 h-full">
          <dd className="shrink-0 text-xl font-semibold tracking-tight text-[#244FBB] lg:text-2xl mb-4">
            How to apply
          </dd>
          <dt className="flex flex-col flex-1">
            <p className="text-base tracking-normal text-[#909090] leading-relaxed mb-6">
              Learn about the process and requirements for applying for Kenya&apos;s eTA
            </p>
            <div className="mb-8">
              <svg className="w-12 h-12 sm:w-16 sm:h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 65 64">
                <circle cx="32.5" cy="32" r="32" fill="#14B04C" fillOpacity=".2"/>
                <rect x="22.5" y="20" width="20" height="24" rx="2" fill="#244FBB" />
              </svg>
            </div>
            <div className="mt-auto">
              <Link
                to="/how-to-apply"
                className="inline-flex items-center px-6 py-3 text-[#14B04C] border-2 border-[#14B04C] rounded-full font-medium transition-colors duration-200 hover:bg-[#14B04C] hover:text-white"
              >
                View details
              </Link>
            </div>
          </dt>
        </div>
        <div className="relative flex flex-col bg-white p-6 sm:p-8 h-full border-l border-r border-gray-200 lg:border-l lg:border-r">
          <dd className="text-xl font-semibold tracking-tight text-[#244FBB] lg:text-2xl mb-4">
            General Information
          </dd>
          <dt className="flex flex-col flex-1">
            <p className="text-base tracking-normal text-[#909090] leading-relaxed mb-6">
              Learn more about eligibility, exemptions and application processing.
            </p>
            <div className="mb-8">
              <svg className="w-12 h-12 sm:w-16 sm:h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 65 64">
                <circle cx="32.5" cy="32" r="32" fill="#244FBB" fillOpacity=".15"/>
                <rect x="24" y="24" width="16" height="16" rx="2" fill="#14B04C" />
              </svg>
            </div>
            <div className="mt-auto">
              <Link
                to="/general-information"
                className="inline-flex items-center px-6 py-3 text-[#14B04C] border-2 border-[#14B04C] rounded-full font-medium transition-colors duration-200 hover:bg-[#14B04C] hover:text-white"
              >
                View details
              </Link>
            </div>
          </dt>
        </div>
        <div className="relative flex flex-col bg-white p-6 sm:p-8 h-full">
          <dd className="text-xl font-semibold tracking-tight text-[#244FBB] lg:text-2xl mb-4">
            FAQs
          </dd>
          <dt className="flex flex-col flex-1">
            <p className="text-base tracking-normal text-[#909090] leading-relaxed mb-6">
              Some of the frequently asked questions about eTA
            </p>
            <div className="mb-8">
              <svg className="w-12 h-12 sm:w-16 sm:h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 65 64">
                <circle cx="32.5" cy="32" r="32" fill="#244FBB" fillOpacity=".1"/>
                <rect x="27" y="20" width="11" height="24" rx="2" fill="#244FBB" />
              </svg>
            </div>
            <div className="mt-auto">
              <Link
                to="/faqs"
                className="inline-flex items-center px-6 py-3 text-[#14B04C] border-2 border-[#14B04C] rounded-full font-medium transition-colors duration-200 hover:bg-[#14B04C] hover:text-white"
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
