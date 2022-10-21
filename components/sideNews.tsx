import { Paper } from "@mantine/core";
import { FC } from "react";

interface ISideNews {
  showtitle?: boolean;
}
const SideNews: FC<ISideNews> = ({ showtitle = false }) => {
  return (
    <Paper sx={{ backgroundColor: "#f1f1f1", maxHeight: "800px" }}>
      <div className="side-news">
        {showtitle && <div className="side-news__header">Tin đọc nhiều</div>}
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
  );
};

export default SideNews;
