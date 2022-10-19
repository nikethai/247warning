import { Anchor, Badge, Breadcrumbs, Container, Grid, Group, Paper } from "@mantine/core";
import dayjs from "dayjs";
import "dayjs/locale/vi";

import MainLayout from "../../components/layout";
import aqua from "../images/aqua.webp";
import shion from "../images/shion.webp";
import choco from "../images/choco.webp";
import shuba from "../images/chuba.webp";

//TODO: Add type for post
export default function BlogPost({ data, }: any) {
    dayjs.locale("vi");
    const post = data.allWpPost.nodes[0];

    const items = post.categories?.nodes.reverse().map((cat, idx, arr) => {
        return (
            <Anchor key={cat.id} href={cat.link}>
                {cat.name}
            </Anchor>
        );
    });

    const formatDateInVN = (date) => {
        return dayjs(date).format("dddd, D/MM/YYYY, H:mm") + " GMT+7";
    };

    return (
        <MainLayout post={post}>
            <Container size="xl">
                <Grid>
                    <Grid.Col md={9}>
                        <Container size="md">
                            <div className="contant__meta">
                                {/* <Breadcrumbs separator="|">{items}</Breadcrumbs> */}
                                {/* <p>{formatDateInVN(post.date)}</p> */}
                            </div>
                            <h1 style={{ marginTop: "0px" }}>{post.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </Container>
                    </Grid.Col>
                    <Grid.Col md={3}>
                        <Group>
                            <Paper sx={{ backgroundColor: "#f1f1f1", maxHeight: "800px" }}>
                                <div className="side-news">
                                    <div className="side-news__header">Tin đọc nhiều</div>
                                    <div className="side-news__item">
                                        <img className="side-news__img" src="./images/aqua.webp" alt="side-img" />
                                        <div className="side-news__content">
                                            <div className="side-news__viewstat">
                                                <p>24.12.2022</p>
                                                <p>69420 xem</p>
                                            </div>
                                            <div className="side-news__title">
                                                Minato Aqua (湊あくあ)
                                            </div>
                                        </div>
                                    </div>
                                    <div className="side-news__item">
                                        <img className="side-news__img" src="./images/shion.webp" alt="side-img" />
                                        <div className="side-news__content">
                                            <div className="side-news__viewstat">
                                                <p>24.12.2022</p>
                                                <p>69420 xem</p>
                                            </div>
                                            <div className="side-news__title">
                                                Murasaki Shion (紫咲シオン)
                                            </div>
                                        </div>
                                    </div>
                                    <div className="side-news__item">
                                        <img className="side-news__img" src="./images/choco.webp" alt="side-img" />
                                        <div className="side-news__content">
                                            <div className="side-news__viewstat">
                                                <p>24.12.2022</p>
                                                <p>69420 xem</p>
                                            </div>
                                            <div className="side-news__title">
                                                Yuzuki Choco (癒月ちょこ)
                                            </div>
                                        </div>
                                    </div>
                                    <div className="side-news__item">
                                        <img className="side-news__img" src="./images/chuba.webp" alt="side-img" />
                                        <div className="side-news__content">
                                            <div className="side-news__viewstat">
                                                <p>24.12.2022</p>
                                                <p>69420 xem</p>
                                            </div>
                                            <div className="side-news__title">
                                                Oozora Subaru (大空スバル)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                            <Paper sx={{ backgroundColor: "#f1f1f1", maxHeight: "800px", flex: 1 }}>
                                <div className="side-news">
                                    <div className="side-news__header">Thẻ bài viết</div>
                                    <Group sx={{ marginLeft: 10 }} spacing="xs">
                                        <Badge className="side-news__tags" radius="sm" color="cyan" variant="filled">Nga</Badge>
                                        <Badge className="side-news__tags" radius="sm" color="cyan" variant="filled">Ukraine</Badge>
                                        <Badge className="side-news__tags" radius="sm" color="cyan" variant="filled">Chiến sự</Badge>
                                    </Group>
                                </div>
                            </Paper>
                        </Group>
                    </Grid.Col>
                </Grid>
            </Container>
        </MainLayout >
    );
}