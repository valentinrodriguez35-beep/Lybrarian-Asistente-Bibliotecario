import { HomeButton, MenuButton } from "../icons";
import ButtonLayout from "../sidebar/ButtonLayout/ButtonLayout";

export default function HeaderResponsive({ children }) {
  return (
    <div className="lg:hidden flex flex-row justify-between items-center w-full px-2">
      <ButtonLayout>
        <MenuButton fill_col="fill-(--sb-button-iddle)" />
      </ButtonLayout>
      {children}
    </div>
  );
}
