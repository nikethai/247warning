import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { IMostViewData } from "../interface";

const analyticsDataClient = new BetaAnalyticsDataClient();
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
  });

  return resp.rows
    .map((r) => {
      const pagePath = r.dimensionValues[0];
      const pageView = r.metricValues[0];
      return { pagePath: pagePath.value, pageView: pageView.value };
    })
    .filter((v) => v.pagePath != "/");
};

export { getReportByPageViews };
