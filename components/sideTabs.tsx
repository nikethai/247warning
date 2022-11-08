import { Paper, Sx, Tabs } from "@mantine/core";
import { FC } from "react";
import { IMostViewPost } from "../interface";
import SideNews from "./sideNews";

interface ISideTabs {
  sx?: Sx | (Sx | undefined)[];
  mostViewData: IMostViewPost[];
  secondTabs?: boolean;
  secondTabsName?: string;
  secondTabsData?: any;
}
const SideTabs: FC<ISideTabs> = ({
  sx,
  secondTabs = true,
  secondTabsName = "Tin bình luận nhiều",
  secondTabsData,
  mostViewData,
}) => {
  return (
    <Tabs sx={sx} defaultValue="mostView" variant="outline" radius="md">
      <Tabs.List>
        <Tabs.Tab value="mostView">Tin đọc nhiều</Tabs.Tab>
        {secondTabs && <Tabs.Tab value="mostX">{secondTabsName}</Tabs.Tab>}
      </Tabs.List>
      <Tabs.Panel value="mostView">
        <SideNews data={mostViewData} isMostView={true} />
      </Tabs.Panel>
      <Tabs.Panel value="mostX">
        {false && <div className="side-news__header">Tin đọc nhiều</div>}
        {secondTabs && secondTabsData && (
          <SideNews isMostView={false} data={secondTabsData} />
        )}
      </Tabs.Panel>
    </Tabs>
  );
};

export default SideTabs;
