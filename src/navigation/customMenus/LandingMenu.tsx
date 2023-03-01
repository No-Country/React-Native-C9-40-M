import { useNavigation } from "@react-navigation/native";
import { COLORS, ROUTES } from "../../constants";
import { MenuButtonItem } from "./MenuButtonItem";

type Props = {};

export const LandingMenu = (props: Props) => {
  const navigation = useNavigation();

  return (
    <>
      <MenuButtonItem
        text={ROUTES.LANDING}
        onPress={() => navigation.navigate(ROUTES.LANDING_DRAWER)}
        icon="home-outline"
        color={COLORS.dark}
      />
      <MenuButtonItem
        text={ROUTES.LOGIN}
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
        icon="log-in-outline"
        color={COLORS.dark}
      />
      <MenuButtonItem
        text={ROUTES.REGISTER}
        onPress={() => navigation.navigate(ROUTES.REGISTER)}
        icon="person-add-outline"
        color={COLORS.dark}
      />
    </>
  );
};
