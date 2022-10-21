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
} from "@mantine/core";
import { GetServerSideProps, GetStaticPaths } from "next";

import MainLayout from "../../components/layout";
import SideNews from "../../components/sideNews";
import { getAllPostsWithSlug, getPostDetail } from "../../lib/apiClient";
import { formatDateInVN } from "../../lib/util";

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
              <Paper radius="md" withBorder sx={{ padding: "10px 15px" }}>
                <Group>
                  <Avatar
                    src="/images/choco.webp"
                    alt="avat"
                    radius="xl"
                    size="lg"
                  />
                  <div>
                    <Text size="sm" weight="bold">
                      Choco-sen
                    </Text>
                    <Text size="xs" color="dimmed">
                      1000 years ago
                    </Text>
                  </div>
                </Group>
                <Text sx={{ paddingLeft: 72 }} size="sm">
                  Ara ara
                </Text>
              </Paper>
              <Space h="xl"/>
              <Paper radius="md" withBorder sx={{ padding: "10px 15px" }}>
                <Group>
                  <Avatar
                    src="/images/shion.webp"
                    alt="avat"
                    radius="xl"
                    size="lg"
                  />
                  <div>
                    <Text size="sm" weight="bold">
                      Shion
                    </Text>
                    <Text size="xs" color="dimmed">
                      1000 years ago
                    </Text>
                  </div>
                </Group>
                <Text sx={{ paddingLeft: 72 }} size="sm">
                  NEEEEEEEEEE!
                </Text>
              </Paper>
            </Container>
            {/* <Divider sx={{ margin: "18px 0px" }} /> */}
          </Grid.Col>
          <Grid.Col md={3}>
            <Group sx={{top: 0, position: "sticky"}}>
              <SideNews showtitle />
              <Paper
                sx={{ backgroundColor: "#f1f1f1", maxHeight: "800px", flex: "1 !important" }}
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
    fallback: true,
  };
};
