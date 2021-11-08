import { Icon } from "@chakra-ui/icons";
import { ReactComponent as TrunkIconOutline } from "../assets/trunk.svg";
import { ReactComponent as TrunkIconFill } from "../assets/trunk_fill.svg";

export default function TrunkIcon({ isInCart, ...props }) {
  return <Icon as={isInCart ? TrunkIconFill : TrunkIconOutline} {...props} />;
}
