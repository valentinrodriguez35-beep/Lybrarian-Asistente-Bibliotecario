import LogIn from "../../components/features/LogIn/LogIn";
import { BrandGitHub } from "../../components/icons";
import ViewLayout from "../../components/layouts/ViewLayout";

export default function AuthView() {
  return (
    <ViewLayout className="flex flex-col justify-center items-center w-full px-4 animate-fade-in">
      <footer className="flex py-4 md:py-6">
        <a className="inline-flex flex-row gap-2 cursor-pointer text-center items-center justify-center">
          <BrandGitHub />
          <span className="text-gray-100 font-semibold">GitHub</span>
          <span className="text-gray-100 font-semibold">|</span>
          <span className="text-gray-200">Para mayor información.</span>
        </a>
      </footer>
      <LogIn />
    </ViewLayout>
  );
}
