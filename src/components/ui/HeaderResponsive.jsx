import { MenuButton } from "../icons";
import ButtonLayout from "../sidebar/ButtonLayout/ButtonLayout";

export default function HeaderResponsive() {
  return (
    <div className="flex flex-row items-center w-full lg:hidden gap-3">
      <ButtonLayout>
        <MenuButton />
      </ButtonLayout>
      <h1 className="text-2xl font-semibold pb-1 text-amber-50">Lybrarian</h1>
    </div>
  );
}
