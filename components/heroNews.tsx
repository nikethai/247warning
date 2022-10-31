import { Grid } from "@mantine/core";
import * as React from "react";

interface IProps{
    heroImg: string;
    heroText: string;
    heroStats: {
        date: string;
        views?: number;
    };
}
export default function HeroNews({ heroImg, heroText, heroStats }: IProps) {
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
                        <p>{heroStats.date}</p>
                        {/* <p>69420 xem</p> */}
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    )
}