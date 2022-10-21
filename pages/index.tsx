import React from 'react';
import {
  Button,
  Container,
  Grid,
  Group,
  Pagination,
  Paper,
  Radio,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { AiOutlineRight } from "@react-icons/all-files/ai/AiOutlineRight";
import Autoplay from "embla-carousel-autoplay";

import MainLayout from '../components/layout'
import { NextPageWithLayout } from './_app'
import HeroNews from '../components/heroNews';
import { getAllPostsForHome } from '../lib/apiClient';
import { formatDateInVNHomePage } from '../lib/util';
import SideTabs from '../components/sideTabs';

const Home: NextPageWithLayout = ({ allPosts: { nodes } }: any) => {
  const autoplay = React.useRef(Autoplay({ delay: 6000 }));

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
                  <Carousel.Slide>
                    <HeroNews
                      heroImg="/images/n-a.jpeg"
                      heroText=" Nakiri Ayame (百鬼あやめ) is a female Japanese Virtual
                            YouTuber associated with hololive, debuting as part of
                            its second generation of VTubers alongside Minato
                            Aqua, Murasaki Shion, Yuzuki Choco and Oozora Subaru."
                      heroStat=""
                    />
                  </Carousel.Slide>
                  <Carousel.Slide>
                    <HeroNews
                      heroImg="/images/m-a.jpg"
                      heroText="Minato Aqua (湊あくあ) is a female Japanese Virtual YouTuber associated with hololive, debuting as part of its second generation of VTubers alongside Murasaki Shion, Nakiri Ayame, Yuzuki Choco and Oozora Subaru."
                      heroStat=""
                    />
                  </Carousel.Slide>
                  <Carousel.Slide>
                    <HeroNews
                      heroImg="/images/m-s.jpg"
                      heroText="Murasaki Shion (紫咲シオン) is a female Japanese Virtual YouTuber associated with hololive, debuting as part of its second generation of VTubers alongside Minato Aqua, Nakiri Ayame, Yuzuki Choco and Oozora Subaru."
                      heroStat=""
                    />
                  </Carousel.Slide>
                  <Carousel.Slide>
                    <HeroNews
                      heroImg="/images/gen2.jpg"
                      heroText="Hololive Gen 2 (ホロライブ第二期) is the second generation of VTubers associated with hololive, debuting on 2020-07-03. The group consists of Minato Aqua, Murasaki Shion, Nakiri Ayame, Yuzuki Choco and Oozora Subaru."
                      heroStat=""
                    />
                  </Carousel.Slide>
                </Carousel>
              </Grid.Col>
              <Grid.Col>
                <div className="article__col">
                  {nodes.map((post: any) => (
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
                            <div className="article__date">{formatDateInVNHomePage(post.date)}</div>
                          </div>
                          <div
                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                            className="article__text"
                          ></div>
                        </div>
                        <div className="article__see-more">
                          <a href={"post/" + post.slug} style={{ color: "#15AABF" }}>
                            Xem thêm <AiOutlineRight />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Grid.Col>
            </Grid>
            <Pagination
              sx={{ justifyContent: "flex-end", marginTop: 10 }}
              total={10}
            />
          </Grid.Col>
          <Grid.Col md={3}>
            <Group>
              <SideTabs/>
              <Paper
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
                    name="favMember"
                    orientation="vertical"
                    label="Who is your favorite hololive member?"
                  >
                    <Radio value="aqua" label="Minato Aqua" />
                    <Radio value="shion" label="Murasaki Shion" />
                    <Radio value="choco" label="Yuzuki Choco" />
                    <Radio value="subaru" label="Oozora Subaru" />
                    <Radio value="ayame" label="Nakiri Ayame" />
                  </Radio.Group>
                  <Button color="cyan">Submit</Button>
                </div>
              </Paper>
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
  )
}

Home.getLayout = (page) => {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}
export default Home

export const getStaticProps = async () => {
  const allPosts = await getAllPostsForHome();
  return {
    props: { allPosts },
    revalidate: 10,
  }
}