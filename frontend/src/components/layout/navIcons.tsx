import type { SvgIconComponent } from "@mui/icons-material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import ChurchRoundedIcon from "@mui/icons-material/ChurchRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import type { NavIcon } from "@/data/navigation";

export const navIcons: Record<NavIcon, SvgIconComponent> = {
  founder: AutoStoriesRoundedIcon,
  history: HistoryEduRoundedIcon,
  mission: PublicRoundedIcon,
  vision: FlagRoundedIcon,
  profile: InfoRoundedIcon,
  presence: TravelExploreRoundedIcon,
  formation: GroupsRoundedIcon,
  education: SchoolRoundedIcon,
  health: LocalHospitalRoundedIcon,
  social: VolunteerActivismRoundedIcon,
  pastoral: ChurchRoundedIcon,
  eco: SpaRoundedIcon,
  leadership: AccountBalanceRoundedIcon,
  team: BadgeRoundedIcon,
  commissions: ChecklistRoundedIcon,
  institutions: ApartmentRoundedIcon,
  school: SchoolRoundedIcon,
  hospital: LocalHospitalRoundedIcon,
  profiles: DescriptionRoundedIcon,
  gallery: PhotoLibraryRoundedIcon,
  publications: PictureAsPdfRoundedIcon,
  news: CampaignRoundedIcon,
  contact: MailRoundedIcon,
  directory: HomeWorkRoundedIcon,
};
