import { Sx, Tabs } from "@mantine/core";
import { FC } from "react";
import SideNews from "./sideNews";

interface ISideTabs{
  sx?: Sx | (Sx | undefined)[];
}
const SideTabs: FC<ISideTabs> = (props) => {
  return (
    <Tabs sx={props.sx} defaultValue="mostView" variant="outline" radius="md">
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
