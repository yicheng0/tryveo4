import Image from "next/image";
import { styles } from "@/lib/styles";

export default function Hero() {
  return (
    <section className="bg-gray-50 dark:bg-bgMain text-gray-900 dark:text-textMain py-24 px-6 md:px-20">
      <div className={`max-w-6xl mx-auto ${styles.textCenter} space-y-6`}>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-textMain">
          Create Cinematic AI Videos from Just a Prompt
        </h1>
        <p className="text-lg text-gray-600 dark:text-textSubtle max-w-2xl mx-auto">
          Generate high-quality videos using only text or image inputs. No sign-up required. No hassle.
        </p>

        <div className={`${styles.flexCenter} gap-4 pt-6`}>
          <button className="bg-primaryBlue hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-medium shadow-md transition duration-200">
            🚀 Try for Free
          </button>
          <button className="border border-gray-300 dark:border-borderSubtle bg-white dark:bg-transparent px-6 py-3 rounded-xl text-gray-700 dark:text-textSubtle hover:bg-gray-100 dark:hover:bg-bgCard transition duration-200">
            ▶️ Watch Demo
          </button>
        </div>

        <div className="pt-12">
          <Image 
            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=75"
            alt="AI Video Generation Demo"
            width={1200}
            height={675}
            priority
            className="mx-auto max-w-4xl w-full rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
