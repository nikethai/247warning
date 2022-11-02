import { Paper } from "@mantine/core";
import { FC } from "react";

import { IMostComments, IMostViewPost } from "../interface";
import { formatDateInVNWithoutDay } from "../lib/util";

interface ISideNews {
  showtitle?: boolean;
  isMostView: boolean;
  data: IMostViewPost[] | IMostComments[];
}
const SideNews: FC<ISideNews> = ({ showtitle = false, isMostView, data }) => {
  return (
    <Paper sx={{ backgroundColor: "#f1f1f1", maxHeight: "800px" }}>
      <div className="side-news">
        {showtitle && <div className="side-news__header">Tin đọc nhiều</div>}
        {isMostView
          ? data.map((item) => (
              <div key={item.postContent.post.id} className="side-news__item">
                <img
                  className="side-news__img"
                  src={item.postContent.post.featuredImage.node.mediaItemUrl}
                  alt="side-img"
                />
                <div className="side-news__content">
                  <div className="side-news__viewstat">
                    <p>
                      {formatDateInVNWithoutDay(item.postContent.post.date)}
                    </p>
                    <p>{item.postView} lượt xem</p>
                  </div>
                  <div className="side-news__title">
                    {item.postContent.post.title}
                  </div>
                  <div
                    className="side-news__excerpt"
                    dangerouslySetInnerHTML={{
                      __html: item.postContent.post.excerpt,
                    }}
                  />
                </div>
              </div>
            ))
          : data.nodes.map((item) => (
              <div key={item.id} className="side-news__item">
                <img
                  className="side-news__img"
                  src={item.featuredImage.node.mediaItemUrl}
                  alt="side-img"
                />
                <div className="side-news__content">
                  <div className="side-news__viewstat">
                    <p>{formatDateInVNWithoutDay(item.date)}</p>
                    <p>{item.commentCount ?? 0} bình luận</p>
                  </div>
                  <div className="side-news__title">{item.title}</div>
                  <div
                    className="side-news__excerpt"
                    dangerouslySetInnerHTML={{
                      __html: item.excerpt,
                    }}
                  />
                </div>
              </div>
            ))}
      </div>
    </Paper>
  );
};

export default SideNews;
