import LogIn from "./log-in/log_in";
import BrandGitHub from "../../assets/icons/BrandGitHub";

export default function AuthView() {
  return (
    <section className="flex flex-col min-h-screen w-full justify-center-safe items-center-safe">
      <div className="flex flex-1 w-full justify-center-safe items-center-safe">
        <LogIn />
      </div>
      <footer className="py-4! md:py-6!">
        <a className="flex flex-row gap-2 cursor-pointer text-center">
          <BrandGitHub />
          <span className="text-gray-100 font-semibold">GitHub</span>
          <span className="text-gray-100 font-semibold">|</span>
          <span className="text-gray-200">Para mayor información.</span>
        </a>
      </footer>
    </section>
  );
}
