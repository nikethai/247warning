import { Tabs } from "@mantine/core";
import { FC } from "react";
import SideNews from "./sideNews";

const SideTabs: FC = () => {
  return (
    <Tabs defaultValue="mostView" variant="outline" radius="md">
      <Tabs.List>
        <Tabs.Tab value="mostView">Tin đọc nhiều</Tabs.Tab>
        <Tabs.Tab value="mostCmt">Tin bình luận nhiều</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="mostView">
        <SideNews />
      </Tabs.Panel>
      <Tabs.Panel value="mostCmt">
        <SideNews />
      </Tabs.Panel>
    </Tabs>
  );
};

export default SideTabs;
