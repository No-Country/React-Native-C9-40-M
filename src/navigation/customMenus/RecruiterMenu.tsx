import { useNavigation } from "@react-navigation/native";
import { COLORS, ROUTES } from "../../constants";
import { MenuButtonItem } from "./MenuButtonItem";

type Props = {};

export const RecruiterMenu = (props: Props) => {
  const navigation = useNavigation();

  return (
    <>
      <MenuButtonItem
        text={ROUTES.HOME_RECRUITER}
        onPress={() => navigation.navigate(ROUTES.HOME_RECRUITER_DRAWER)}
        icon="home-outline"
        color={COLORS.dark}
      />
      <MenuButtonItem
        text={ROUTES.JOBSPOST}
        onPress={() => navigation.navigate(ROUTES.JOBSPOST_DRAWER)}
        icon="reader-outline"
        color={COLORS.dark}
      />
      <MenuButtonItem
        text={ROUTES.JOBSEEKERLIST}
        onPress={() => navigation.navigate(ROUTES.JOBSEEKERLIST_DRAWER)}
        icon="reader-outline"
        color={COLORS.dark}
      />
      <MenuButtonItem
        text={"Cerrar Sesión"}
        onPress={() => navigation.navigate(ROUTES.LANDING_DRAWER)}
        icon="exit-outline"
        color={COLORS.dark}
      />
    </>
  );
};
