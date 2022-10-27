import {
  Anchor,
  Avatar,
  Badge,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  Space,
  Text,
  Textarea,
} from "@mantine/core";
import { GetServerSideProps, GetStaticPaths } from "next";
import { Fragment } from "react";

import MainLayout from "../../components/layout";
import SideNews from "../../components/sideNews";
import SideTabs from "../../components/sideTabs";
import { getAllPostsWithSlug, getPostDetail } from "../../lib/apiClient";
import { formatDateInVN, fromDateToNow } from "../../lib/util";

//TODO: Add type for post
export default function BlogPost({ post }: any) {
  const items = post?.categories?.nodes.reverse().map((cat, idx, arr) => {
    return (
      <Anchor key={cat.id} href={cat.link}>
        {cat.name}
      </Anchor>
    );
  });

  return (
    <MainLayout post={post}>
      <Container size="xl">
        <Grid>
          <Grid.Col md={9}>
            <Container size="md">
              <div className="contant__meta">
                <Breadcrumbs separator="|">{items}</Breadcrumbs>
                <p>{formatDateInVN(post.date)}</p>
              </div>
              <h1 style={{ marginTop: "0px" }}>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </Container>
            <Divider />
            <Container>
              <h3>Bình luận</h3>
              <Textarea
                placeholder="Nhập ý kiến của bạn"
                rows={5}
                required
              />
              <Space h="xl" />
              {post.comments ?
                post.comments.nodes.map((cmt) => (
                  <Fragment key={cmt.id}>
                    <Paper radius="md" withBorder sx={{ padding: "10px 15px" }}>
                      <Group>
                        <Avatar
                          src={cmt.author.node.avatar.url}
                          alt="avat"
                          radius="xl"
                          size="lg"
                        />
                        <div>
                          <Text size="sm" weight="bold">
                            {cmt.author.node.name}
                          </Text>
                          <Text size="xs" color="dimmed">
                            {fromDateToNow(cmt.date)}
                          </Text>
                        </div>
                      </Group>
                      <Text sx={{ paddingLeft: 72 }} size="sm" dangerouslySetInnerHTML={{ __html: cmt.content }}>
                      </Text>
                    </Paper>
                    <Space h="md" />
                  </Fragment>))
                :
                <></>}
            </Container>
            {/* <Divider sx={{ margin: "18px 0px" }} /> */}
          </Grid.Col>
          <Grid.Col md={3}>
            <Group sx={{ top: 0, position: "sticky" }}>
              {/* <SideNews showtitle /> */}
              <SideTabs secondTabsName="Tin liên quan" sx={{ marginTop: 10 }} />
              <Paper
                sx={{
                  backgroundColor: "#f1f1f1",
                  maxHeight: "800px",
                  flex: "1 !important",
                }}
              >
                <div className="side-news">
                  <div className="side-news__header">Thẻ bài viết</div>
                  <Group sx={{ marginLeft: 10 }} spacing="xs">
                    <Badge
                      className="side-news__tags"
                      radius="sm"
                      color="cyan"
                      variant="filled"
                    >
                      Nga
                    </Badge>
                    <Badge
                      className="side-news__tags"
                      radius="sm"
                      color="cyan"
                      variant="filled"
                    >
                      Ukraine
                    </Badge>
                    <Badge
                      className="side-news__tags"
                      radius="sm"
                      color="cyan"
                      variant="filled"
                    >
                      Chiến sự
                    </Badge>
                  </Group>
                </div>
              </Paper>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  const data = await getPostDetail(params.slug as string);

  return {
    props: {
      post: data.post,
      //   posts: data.posts,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts?.nodes.map((post) => `/post/${post.slug}`) || [],
    fallback: false,
  };
};
