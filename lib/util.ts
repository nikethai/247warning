import dayjs from "dayjs";
import "dayjs/locale/vi";

export const formatDateInVN = (date) => {
  dayjs.locale("vi");
  return dayjs(date).format("dddd, D/MM/YYYY, H:mm") + " GMT+7";
};

export const formatDateInVNHomePage = (date) => {
  dayjs.locale("vi");
  return dayjs(date).format("dddd, D/MM/YYYY");
};
