import { Sx, Tabs } from "@mantine/core";
import { FC } from "react";
import SideNews from "./sideNews";

interface ISideTabs {
  sx?: Sx | (Sx | undefined)[];
  secondTabs?: boolean;
  secondTabsName?: string;
  secondTabsData?: any;
}
const SideTabs: FC<ISideTabs> = ({ sx, secondTabs = true, secondTabsName = "Tin bình luận nhiều" }) => {
  return (
    <Tabs sx={sx} defaultValue="mostView" variant="outline" radius="md">
      <Tabs.List>
        <Tabs.Tab value="mostView">Tin đọc nhiều</Tabs.Tab>
        {secondTabs && <Tabs.Tab value="mostX">{secondTabsName}</Tabs.Tab>}
      </Tabs.List>
      <Tabs.Panel value="mostView">
        <SideNews />
      </Tabs.Panel>
      <Tabs.Panel value="mostX">
        <SideNews />
      </Tabs.Panel>
    </Tabs>
  );
};

export default SideTabs;
