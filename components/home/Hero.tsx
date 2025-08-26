import { styles } from "@/lib/styles";

export default function Hero() {
  return (
    <section className="bg-gray-50 dark:bg-bgMain text-gray-900 dark:text-textMain py-24 px-6 md:px-20">
      <div className={`max-w-7xl mx-auto ${styles.textCenter} space-y-6`}>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-textMain">
          Create Cinematic AI Videos from Just a Prompt
        </h1>
        <p className="text-lg text-gray-600 dark:text-textSubtle max-w-2xl mx-auto">
          Generate high-quality videos using only text or image inputs. No sign-up required. No hassle.
        </p>

        <div className={`${styles.flexCenter} gap-4 pt-6`}>
          <button className="bg-primaryBlue hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-medium shadow-md transition duration-200">
             Try Veo 3 Now
          </button>
          <button className="border border-gray-300 dark:border-borderSubtle bg-white dark:bg-transparent px-6 py-3 rounded-xl text-gray-700 dark:text-textSubtle hover:bg-gray-100 dark:hover:bg-bgCard transition duration-200">
             View More Examples
          </button>
        </div>

        <div className="pt-12 relative">
          <div className="relative mx-auto max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden">
            {/* YouTube iframe embed */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0&showinfo=0&modestbranding=1"
                title="Google Veo 3 AI Video Examples"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Overlay with text */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <div className="text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-2">See Real Veo 3 Creations</h3>
                <p className="text-sm md:text-base text-gray-200">
                  Watch incredible AI-generated videos that are breaking the internet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
