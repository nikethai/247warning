import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativetime from "dayjs/plugin/relativeTime";

export const formatDateInVN = (date) => {
  dayjs.locale("vi");
  return dayjs(date).format("dddd, D/MM/YYYY, H:mm") + " GMT+7";
};

export const formatDateInVNHomePage = (date) => {
  dayjs.locale("vi");
  return dayjs(date).format("dddd, D/MM/YYYY");
};

export const fromDateToNow = (date) => {
  dayjs.locale("vi");
  dayjs.extend(relativetime);
  return dayjs(date).toNow(true);
}