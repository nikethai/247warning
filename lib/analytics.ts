import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { IMostViewData } from "../interface";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_id: process.env.GOOGLE_CLIENT_ID,
  },
});
const getReportByPageViews = async (): Promise<IMostViewData[]> => {
  const [resp] = await analyticsDataClient.runReport({
    property: "properties/338030743",
    dateRanges: [
      {
        startDate: "30daysAgo",
        endDate: "today",
      },
    ],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    limit: 5
  });

  return resp.rows
    .map((r) => {
      const pagePathStripped = r.dimensionValues[0].value.match(
        /(?:^|\W)\b(?!post\b)[^/]*/g
      );
      const pageView = r.metricValues[0];
      const pagePath = pagePathStripped ? pagePathStripped[0] : "/";
      return { pagePath: pagePath, pageView: pageView.value };
    })
    .filter((v) => v.pagePath != "/")
    .filter((v, i, a) => a.findIndex((v2) => v2.pagePath === v.pagePath) === i);
};

export { getReportByPageViews };
