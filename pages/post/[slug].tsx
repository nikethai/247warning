import {
  Anchor,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  Skeleton,
  Space,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { GetServerSideProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Fragment, useState } from "react";

import MainLayout from "../../components/layout";
import SideTabs from "../../components/sideTabs";
import {
  createComment,
  getAllPostsWithSlug,
  getPostDetail,
  getPostSummary,
} from "../../lib/apiClient";
import { formatDateInVN, fromDateToNow } from "../../lib/util";
import Loader from "../../components/loader";
import { IMostViewPost } from "../../interface";
import { getReportByPageViews } from "../../lib/analytics";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

//TODO: Add type for post
export default function BlogPost({ post, mostViewPosts }: any) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const items = post?.categories?.nodes.reverse().map((cat, idx, arr) => {
    return (
      <Anchor key={cat.id} href={cat.link}>
        {cat.name}
      </Anchor>
    );
  });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const form = useForm({
    initialValues: {
      authorName: "",
      content: "",
    },
  });

  const commentSubmit = async (values) => {
    setIsLoading(true);
    if (!values.authorName || !values.content) return;

    const resp = await createComment(
      post.databaseId,
      values.content,
      values.authorName
    );

    if (resp.createComment && resp.createComment.success) {
      showNotification({
        id: "create-cmt",
        title: "Đăng bình luận thành công",
        message: "Bình luận của bạn sẽ được quản trị viên phê duyệt",
        color: "teal",
      });
      setIsLoading(false);
    } else {
      showNotification({
        id: "create-cmt",
        title: "Đăng bình luận không thành công",
        message: resp.errors[0].message,
        color: "teal",
      });
      setIsLoading(false);
    }

    form.reset();
  };

  return (
    <MainLayout post={post}>
      <Container size="xl">
        <Grid>
          {router.isFallback ? (
            <Loader />
          ) : (
            <>
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
                  <form onSubmit={form.onSubmit(commentSubmit)}>
                    <TextInput
                      placeholder="Tên của bạn"
                      required
                      disabled={isLoading}
                      {...form.getInputProps("authorName")}
                    />
                    <Space h="sm" />
                    <Textarea
                      placeholder="Nhập ý kiến của bạn"
                      rows={5}
                      required
                      disabled={isLoading}
                      {...form.getInputProps("content")}
                    />
                    <Space h="sm" />
                    <Button
                      sx={{ float: "right" }}
                      type="submit"
                      color="cyan"
                      variant="light"
                      loading={isLoading}
                    >
                      Đăng bình luận
                    </Button>
                    <Space h="xl" />
                  </form>
                  <Space h="xl" />
                  {post.comments ? (
                    post.comments.nodes.map((cmt) => (
                      <Fragment key={cmt.id}>
                        <Paper
                          radius="md"
                          withBorder
                          sx={{ padding: "10px 15px" }}
                        >
                          <Group>
                            <Avatar
                              src={
                                cmt.author.node.avatar?.url ||
                                "/images/placeholder-avatar.webp"
                              }
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
                          <Text
                            sx={{ paddingLeft: 72 }}
                            size="sm"
                            dangerouslySetInnerHTML={{ __html: cmt.content }}
                          ></Text>
                        </Paper>
                        <Space h="md" />
                      </Fragment>
                    ))
                  ) : (
                    <></>
                  )}
                </Container>
                {/* <Divider sx={{ margin: "18px 0px" }} /> */}
              </Grid.Col>
              <Grid.Col md={3}>
                <Group sx={{ top: 0, position: "sticky" }}>
                  {/* <SideNews showtitle /> */}
                  <SideTabs
                    mostViewData={mostViewPosts}
                    secondTabsName="Tin liên quan"
                    sx={{ marginTop: 10 }}
                  />
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
            </>
          )}
        </Grid>
      </Container>
    </MainLayout>
  );
}

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  const data = await getPostDetail(params.slug as string);
  const mostViewSlug = await getReportByPageViews();
  const mostViewPosts: IMostViewPost[] = await Promise.all(
    mostViewSlug.map(async (info) => {
      const post = await getPostSummary(info.pagePath);
      return { postContent: post, postView: info.pageView };
    })
  );

  return {
    props: {
      post: data.post,
      mostViewPosts,
    },
    revalidate: 20,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts?.nodes.map((post) => `/post/${post.slug}`) || [],
    fallback: true,
  };
};
