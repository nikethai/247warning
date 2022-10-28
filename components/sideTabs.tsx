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
const SideTabs: FC<ISideTabs> = ({ sx, secondTabs = true, secondTabsName = "Tin bình luận nhiều", mostViewData }) => {
  return (
    <Tabs sx={sx} defaultValue="mostView" variant="outline" radius="md">
      <Tabs.List>
        <Tabs.Tab value="mostView">Tin đọc nhiều</Tabs.Tab>
        {secondTabs && <Tabs.Tab value="mostX">{secondTabsName}</Tabs.Tab>}
      </Tabs.List>
      <Tabs.Panel value="mostView">
        <SideNews data={mostViewData} />
      </Tabs.Panel>
      <Tabs.Panel value="mostX">
        {/* //TODO: Add second tabs */}
        <Paper sx={{ backgroundColor: "#f1f1f1", maxHeight: "800px" }}>
          <div className="side-news">
            {false && <div className="side-news__header">Tin đọc nhiều</div>}
            <div className="side-news__item">
              <img
                className="side-news__img"
                src="/images/aqua.webp"
                alt="side-img"
              />
              <div className="side-news__content">
                <div className="side-news__viewstat">
                  <p>24.12.2022</p>
                  <p>69420 xem</p>
                </div>
                <div className="side-news__title">Minato Aqua (湊あくあ)</div>
              </div>
            </div>
            <div className="side-news__item">
              <img
                className="side-news__img"
                src="/images/shion.webp"
                alt="side-img"
              />
              <div className="side-news__content">
                <div className="side-news__viewstat">
                  <p>24.12.2022</p>
                  <p>69420 xem</p>
                </div>
                <div className="side-news__title">Murasaki Shion (紫咲シオン)</div>
              </div>
            </div>
            <div className="side-news__item">
              <img
                className="side-news__img"
                src="/images/choco.webp"
                alt="side-img"
              />
              <div className="side-news__content">
                <div className="side-news__viewstat">
                  <p>24.12.2022</p>
                  <p>69420 xem</p>
                </div>
                <div className="side-news__title">Yuzuki Choco (癒月ちょこ)</div>
              </div>
            </div>
            <div className="side-news__item">
              <img
                className="side-news__img"
                src="/images/chuba.webp"
                alt="side-img"
              />
              <div className="side-news__content">
                <div className="side-news__viewstat">
                  <p>24.12.2022</p>
                  <p>69420 xem</p>
                </div>
                <div className="side-news__title">Oozora Subaru (大空スバル)</div>
              </div>
            </div>
          </div>
        </Paper>
      </Tabs.Panel>
    </Tabs>
  );
};

export default SideTabs;
