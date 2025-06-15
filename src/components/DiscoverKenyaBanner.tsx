
const discoverImg =
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=900&q=80";

const DiscoverKenyaBanner = () => (
  <section className="relative before:content-[''] before:absolute before:bg-[#F4F4F4] before:inset-0 before:h-1/2 before:w-full">
    <div className="mx-auto my-8 w-full max-w-screen-2xl px-4">
      <div className="relative grid grid-cols-2 gap-0 overflow-hidden rounded-xl bg-[#984701]">
        <div className="col-span-2 flex flex-col items-start justify-center px-8 py-4 lg:col-span-1 lg:px-16">
          <p className="mb-8 text-2xl !leading-tight font-medium text-white lg:text-4xl xl:text-6xl font-sans">
            Astride the equator, Kenya is home to intimate, awe-inspiring, and magical travel experiences
          </p>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <img
            alt="Discover Kenya"
            className="max-h-[180px] w-full object-cover lg:max-h-full"
            src={discoverImg}
          />
        </div>
        <img
          alt=""
          className="absolute right-0 h-full w-6 lg:w-14 object-cover"
          src={discoverImg}
          style={{ opacity: 0.12, pointerEvents: "none" }}
        />
      </div>
    </div>
  </section>
);

export default DiscoverKenyaBanner;
