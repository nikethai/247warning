import { Paper } from "@mantine/core";
import { FC } from "react";

import { IMostViewPost } from "../interface";
import { formatDateInVNWithoutDay } from "../lib/util";

interface ISideNews {
  showtitle?: boolean;
  data: IMostViewPost[];
}
const SideNews: FC<ISideNews> = ({ showtitle = false, data }) => {
  return (
    <Paper sx={{ backgroundColor: "#f1f1f1", maxHeight: "800px" }}>
      <div className="side-news">
        {showtitle && <div className="side-news__header">Tin đọc nhiều</div>}
        {data.map((item, index) => (
          <div key={item.postContent.post.id} className="side-news__item">
            <img
              className="side-news__img"
              src={item.postContent.post.featuredImage.node.mediaItemUrl}
              alt="side-img"
            />
            <div className="side-news__content">
              <div className="side-news__viewstat">
                <p>{formatDateInVNWithoutDay(item.postContent.post.date)}</p>
                <p>{item.postView} lượt xem</p>
              </div>
              <div className="side-news__title">{item.postContent.post.title}</div>
              <div className="side-news__excerpt" dangerouslySetInnerHTML={{ __html: item.postContent.post.excerpt }} />
            </div>
          </div>
        ))}

      </div>
    </Paper>
  );
};

export default SideNews;
