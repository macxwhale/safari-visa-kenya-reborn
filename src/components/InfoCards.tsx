
import { Link } from "react-router-dom";
import { FileText, Globe, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const InfoCards = () => (
  <section className="bg-gray-50 lg:-mt-[100px] lg:pt-[60px] py-8">
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:py-12">
      <dl className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl ring-1 ring-border lg:grid-cols-3 shadow-sm">
        <div className="relative flex flex-col bg-white p-6 sm:p-8 h-full">
          <dd className="shrink-0 text-xl font-semibold tracking-tight text-gray-900 lg:text-2xl mb-4">
            How to apply
          </dd>
          <dt className="flex flex-col flex-1">
            <p className="text-base tracking-normal text-gray-500 leading-relaxed mb-6">
              Learn about the process and requirements for applying for Kenya&apos;s eTA
            </p>
            <div className="mb-8">
              <FileText className="w-16 h-16 text-brand-green" strokeWidth={1.5} />
            </div>
            <div className="mt-auto">
              <Link to="/how-to-apply">
                <Button variant="brand-outline" size="lg" className="w-full sm:w-auto touch-target">
                  View details
                </Button>
              </Link>
            </div>
          </dt>
        </div>
        <div className="relative flex flex-col bg-white p-6 sm:p-8 h-full border-l border-r border-border lg:border-l lg:border-r">
          <dd className="text-xl font-semibold tracking-tight text-gray-900 lg:text-2xl mb-4">
            General Information
          </dd>
          <dt className="flex flex-col flex-1">
            <p className="text-base tracking-normal text-gray-500 leading-relaxed mb-6">
              Learn more about eligibility, exemptions and application processing.
            </p>
            <div className="mb-8">
              <Globe className="w-16 h-16 text-brand-green" strokeWidth={1.5} />
            </div>
            <div className="mt-auto">
              <Link to="/general-information">
                <Button variant="brand-outline" size="lg" className="w-full sm:w-auto touch-target">
                  View details
                </Button>
              </Link>
            </div>
          </dt>
        </div>
        <div className="relative flex flex-col bg-white p-6 sm:p-8 h-full">
          <dd className="text-xl font-semibold tracking-tight text-gray-900 lg:text-2xl mb-4">
            FAQs
          </dd>
          <dt className="flex flex-col flex-1">
            <p className="text-base tracking-normal text-gray-500 leading-relaxed mb-6">
              Some of the frequently asked questions about eTA
            </p>
            <div className="mb-8">
              <MessageSquare className="w-16 h-16 text-brand-green" strokeWidth={1.5} />
            </div>
            <div className="mt-auto">
              <Link to="/faqs">
                <Button variant="brand-outline" size="lg" className="w-full sm:w-auto touch-target">
                  View details
                </Button>
              </Link>
            </div>
          </dt>
        </div>
      </dl>
    </div>
  </section>
);

export default InfoCards;
