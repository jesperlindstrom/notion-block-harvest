import axios, { AxiosResponse } from "axios";

export type TeamReportItem = {
  user_id: number;
  user_name: string;
  is_contractor: boolean;
  total_hours: number;
  billable_hours: number;
  currency: string;
  billable_amount: number;
};

interface TeamReport {
  results: Array<TeamReportItem>;
}

export async function getTeamReport(from, to): Promise<Array<TeamReportItem>> {
  const url = `https://api.harvestapp.com/v2/reports/time/team?from=${from}&to=${to}`;

  try {
    const result: AxiosResponse<TeamReport> = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.HARVEST_ACCESS_TOKEN}`,
        "Harvest-Account-Id": process.env.HARVEST_ACCOUNT_ID,
        "User-Agent": "Notion Dashboard (jesper.lindstrom@sharpmind.se)",
      },
    });

    return result.data.results;
  } catch (e) {
    console.error(e);
  }
}
