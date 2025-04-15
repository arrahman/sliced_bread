import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div className="flex justify-center">
          <Image
            src="/img/summer_splash.jpg"
            alt="Solar Splash Drink"
            width={400}
            height={500}
            className="rounded-xl shadow-2xl object-cover"
          />
        </div>

        {/* Right: Description */}
        <div>
          <h1 className="text-4xl font-bold text-orange-900 mb-4">
            Meet Solar Splash 🌞
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Solar Splash is the ultimate tropical fusion of sun-kissed citrus,
            sparkling energy, and just a hint of natural sweetness. Packed with
            vitamin C and energizing botanicals, it's your perfect companion for
            sunny days, workout boosts, or anytime you need a splash of sunshine
            in your life.
          </p>
          <Link href="/order">
            <span className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full shadow hover:bg-orange-600 transition duration-300 cursor-pointer">
              Get Splash
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
