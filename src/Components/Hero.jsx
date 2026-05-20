import bannerImg from "../assets/banner.png";

const Hero = () => {
  return (
    <section
      className="h-150 bg-cover bg-center flex items-center justify-center px-6 my-5"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Take Control of Your Money. Build Your Future.
        </h1>

        <p className="mt-6 text-lg text-white/80">
          Track your expenses, manage your budget, and grow your savings.
        </p>
      </div>
    </section>
  );
};

export default Hero;
