import { Grid } from "@mantine/core";
import * as React from "react";

// TODO: Change any to proper type
export default function HeroNews({ heroImg, heroText, heroStat }: any) {
    return (
        <div
            style={{ backgroundImage: `url(${heroImg})` }}
            className="hero"
        >
            <div className="hero__overlay" />
            <div className="hero__content">
                <Grid>
                    <Grid.Col md={9}>
                        <p className="hero__text">
                           {heroText}
                        </p>
                    </Grid.Col>
                    <Grid.Col className="hero__viewstat" md={3}>
                        <p>24.12.2022</p>
                        <p>69420 xem</p>
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    )
}