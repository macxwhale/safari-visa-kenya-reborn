
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Flag } from "lucide-react";

const HOWTO = [
  {
    step: 1,
    title: "Start Application",
    desc: "Begin a new application and fill in your personal details.",
  },
  {
    step: 2,
    title: "Upload Required Documents",
    desc: "Provide a scan/photo of your passport and necessary documents.",
  },
  {
    step: 3,
    title: "Submit & Track",
    desc: "Submit the form, pay securely, and track your status online.",
  },
];

export default function Index() {
  return (
    <div className="bg-[#e6f6f3] min-h-screen w-full">
      <Navbar />
      <main className="max-w-6xl mx-auto p-8 pt-24">
        <section className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 text-[#19a594] mb-3">
                <Flag />
                <span className="uppercase font-semibold text-sm tracking-wider">Apply for Kenya eTA</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-800 animate-fade-in">Simple, Secure, and Fast Online Visa Application</h1>
              <div className="text-lg text-gray-700 max-w-xl animate-fade-in">
                Easily apply for your Kenya Electronic Travel Authorization online in just a few steps. Track your application status, update your info, and receive timely updates.
              </div>
            </div>
            <div>
              <Link to="/apply">
                <Button className="bg-[#19a594] px-8 py-3 text-lg text-white font-semibold rounded hover:brightness-95 animate-scale-in">
                  Start Application
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="hidden md:block max-w-xs w-full">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/2560px-Flag_of_Kenya.svg.png"
                alt="Kenya Flag"
                className="rounded-md shadow-lg border border-gray-200 w-full h-56 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>
        <section className="mt-24">
          <h2 className="text-2xl font-bold mb-6 animate-fade-in">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-7 animate-fade-in">
            {HOWTO.map((s) => (
              <div key={s.step} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow flex flex-col items-start">
                <div className="text-3xl font-extrabold mb-2 text-[#19a594]">{s.step}</div>
                <div className="font-semibold text-md mb-1">{s.title}</div>
                <div className="text-sm text-gray-600">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
