import React from "react";
import {
  ActionIcon,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Radio,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { AiOutlineRight } from "@react-icons/all-files/ai/AiOutlineRight";
import { AiFillCaretLeft } from "@react-icons/all-files/ai/AiFillCaretLeft";
import { AiFillCaretRight } from "@react-icons/all-files/ai/AiFillCaretRight";
import Autoplay from "embla-carousel-autoplay";

import MainLayout from "../components/layout";
import { NextPageWithLayout } from "./_app";
import HeroNews from "../components/heroNews";
import {
  getAllFeaturePost,
  getAllPostsByComments,
  getAllPostsPagination,
  getPolls,
  getPostSummary,
} from "../lib/apiClient";
import { formatDateInVNHomePage, formatDateInVNWithoutDay } from "../lib/util";
import SideTabs from "../components/sideTabs";
import { TOTAL_POSTS_PER_PAGE } from "../lib/constant";
import { getReportByPageViews } from "../lib/analytics";
import { IMostViewPost, IPoll } from "../interface";

interface IProps {
  edges: any;
  featurePosts: any;
  pageInfo: any;
  mostViewPosts: IMostViewPost[];
  mostCommentsPosts: any;
  polls: IPoll[];
}
const Home: NextPageWithLayout<IProps> = ({
  edges,
  featurePosts,
  pageInfo,
  mostViewPosts,
  mostCommentsPosts: { posts },
  polls,
}) => {
  const [refEdges, setRefEdges] = React.useState(edges);
  const [refPageInfo, setRefPageInfo] = React.useState(pageInfo);

  const autoplay = React.useRef(Autoplay({ delay: 6000 }));

  const getNextPage = async () => {
    const nextPosts = await getAllPostsPagination(
      TOTAL_POSTS_PER_PAGE,
      null,
      refPageInfo.endCursor
    );
    setRefEdges(nextPosts.edges);
    setRefPageInfo(nextPosts.pageInfo);
  };

  const getPrevPage = async () => {
    const prevPosts = await getAllPostsPagination(
      null,
      TOTAL_POSTS_PER_PAGE,
      null,
      refPageInfo.startCursor
    );
    setRefEdges(prevPosts.edges);
    setRefPageInfo(prevPosts.pageInfo);
  };

  return (
    <>
      <Container size="xl">
        <Grid>
          <Grid.Col md={9}>
            <Grid gutter="md">
              <Grid.Col>
                <Carousel
                  loop
                  plugins={[autoplay.current]}
                  onMouseEnter={autoplay.current.stop}
                  onMouseLeave={autoplay.current.reset}
                >
                  {featurePosts.nodes.map((post: any) => (
                    <Carousel.Slide key={post.id}>
                      <HeroNews
                        heroImg={post.featuredImage?.node.mediaItemUrl ?? ""}
                        heroText={post.title}
                        heroStats={{
                          date: formatDateInVNWithoutDay(post.date),
                        }}
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              </Grid.Col>
              <Grid.Col>
                <div className="article__col">
                  {refEdges.map((n: any) => {
                    const post = n.node;
                    return (
                      <div key={post.id} className="article">
                        <div className="article__img_col">
                          <img
                            className="article__img"
                            src={post.featuredImage?.node.mediaItemUrl ?? ""}
                            alt=""
                          />
                        </div>
                        <div className="article__content_col">
                          <div className="article__content">
                            <h3 className="article__title">{post.title}</h3>
                            <div className="article__cat">
                              <div className="article__tag">
                                {post.categories &&
                                  post.categories.nodes.map((cat: any) => (
                                    <p key={cat.id}>{cat.name}</p>
                                  ))}
                              </div>
                              <div className="article__date">
                                {formatDateInVNHomePage(post.date)}
                              </div>
                            </div>
                            <div
                              dangerouslySetInnerHTML={{ __html: post.excerpt }}
                              className="article__text"
                            ></div>
                          </div>
                          <div className="article__see-more">
                            <a
                              href={"post/" + post.slug}
                              style={{ color: "#15AABF" }}
                            >
                              Xem thêm <AiOutlineRight />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Grid.Col>
            </Grid>
            <Group sx={{ justifyContent: "flex-end", marginTop: 10 }}>
              <ActionIcon
                onClick={getPrevPage}
                variant="outline"
                disabled={!refPageInfo.hasPreviousPage}
              >
                <AiFillCaretLeft />
              </ActionIcon>
              <ActionIcon
                onClick={getNextPage}
                variant="outline"
                disabled={!refPageInfo.hasNextPage}
              >
                <AiFillCaretRight />
              </ActionIcon>
            </Group>
          </Grid.Col>
          <Grid.Col md={3}>
            <Group>
              {/* WTF React */}
              <SideTabs secondTabsData={posts} mostViewData={mostViewPosts} />
              {polls.map((poll) => {
                return (
                  poll.open && (
                    <Paper
                      key={poll.id}
                      sx={{
                        backgroundColor: "#f1f1f1",
                        maxHeight: "800px",
                        minWidth: "100%",
                      }}
                    >
                      <div className="side-news">
                        <div className="side-news__header">Khảo sát</div>
                        <Radio.Group
                          sx={{ padding: 7 }}
                          name={poll.question}
                          orientation="vertical"
                          label={poll.question}
                        >
                          {poll.answers.map((answer) => (
                            <Radio
                              key={answer.id}
                              value={answer.id.toString()}
                              label={answer.description}
                            />
                          ))}
                        </Radio.Group>
                        <Button color="cyan">Submit</Button>
                      </div>
                    </Paper>
                  )
                );
              })}
            </Group>
          </Grid.Col>{" "}
        </Grid>
        <div className="video_article">
          <h2>Video</h2>
          <Grid gutter="sm">
            <Grid.Col md={8}>
              <div className="video_article__active">
                <iframe
                  width="100%"
                  height="352"
                  src="https://www.youtube.com/embed/c3BrQfO_EP8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p>
                  Nakiri Ayame and her friends sing わたしの一番かわいいところ
                </p>
              </div>
            </Grid.Col>
            <Grid.Col md={4}>
              <div className="video_article__list">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="video_article__item">
                    <video
                      src="http://techslides.com/demos/sample-videos/small.mp4"
                      className="video_article__item__video"
                    />
                    <div className="video_article__item__title">
                      Sample MP4 Video File
                    </div>
                  </div>
                ))}
              </div>
            </Grid.Col>
          </Grid>
        </div>
      </Container>
    </>
  );
};

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
export default Home;

export const getStaticProps = async () => {
  const ap = await getAllPostsPagination(TOTAL_POSTS_PER_PAGE);
  const featurePosts = await getAllFeaturePost();
  const mostCommentsPosts = await getAllPostsByComments();
  const mostViewSlug = await getReportByPageViews();
  const mostViewPosts: IMostViewPost[] = await Promise.all(
    mostViewSlug.map(async (info) => {
      const post = await getPostSummary(info.pagePath);
      return { postContent: post, postView: info.pageView };
    })
  );
  const pollsResp = await getPolls();
  const polls = pollsResp.polls;

  const { edges, pageInfo } = ap;

  return {
    props: {
      edges,
      featurePosts,
      pageInfo,
      mostViewPosts,
      mostCommentsPosts,
      polls,
    },
    revalidate: 10,
  };
};
