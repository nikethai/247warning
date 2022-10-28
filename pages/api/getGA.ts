// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {BetaAnalyticsDataClient} from "@google-analytics/data";


const analyticsDataClient = new BetaAnalyticsDataClient();

const getReportByPageViews = async () => {
    const [resp] = await analyticsDataClient.runReport({
        property: "properties/338030743",
        dateRanges: [
            {
                startDate: "30daysAgo",
                endDate: "today"
            }
        ],
        dimensions: [{"name": "pagePath"}],
        metrics: [{"name": "screenPageViews"}],
    });

    return resp.rows.map(r => {
        const pagePath = r.dimensionValues[0];
        const pageView = r.metricValues[0];
        return {pagePath: pagePath.value, pageView: pageView.value};
    }).filter(v => v.pagePath != "/");
}

const getRealTimeReportByPageViews = async () => {
    const [resp] = await analyticsDataClient.runRealtimeReport({
        property: "properties/338030743",
        dimensions: [{"name": "unifiedScreenName"}],
        metrics: [{"name": "screenPageViews"}],
    });

    console.log("Result: ")
    return resp.rows.map(r => {
        const pagePath = r.dimensionValues[0];
        const pageView = r.metricValues[0];
        return {pagePath: pagePath.value, pageView: pageView.value};
    }).filter(v => v.pagePath != "/");
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const report = await getReportByPageViews();
//     const rtRep = await getRealTimeReportByPageViews();
//     rtRep.forEach(r => {
//         console.log(r.pagePath,r.pageView);
//     })
    res.status(200).json({report})
}
