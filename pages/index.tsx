import Head from "next/head";
import * as date from "date-fns";
import { GetServerSideProps } from "next";
import { getTeamReport, TeamReportItem } from "../data/harvest";
import TextMetric from "../components/TextMetric";
import ChartMetric from "../components/ChartMetric";

interface HomeProps {
  teamReport: Array<TeamReportItem>;
  fromDate: string;
  toDate: string;
}

function sumByKey<T>(arr: Array<T>, map: (T) => number) {
  return arr.map(map).reduce((a, b) => a + b, 0);
}

function formatNumber(value: number) {
  return Math.abs(value) > 999
    ? Math.sign(value) * (Math.round(Math.abs(value) / 100) / 10) + "K"
    : Math.sign(value) * Math.abs(value);
}

export default function Home(props: HomeProps) {
  const totalHours = sumByKey<TeamReportItem>(
    props.teamReport,
    (person) => person.total_hours
  );

  const billableAmount = sumByKey<TeamReportItem>(
    props.teamReport,
    (person) => person.billable_amount
  );

  const billableHours = sumByKey<TeamReportItem>(
    props.teamReport,
    (person) => person.billable_hours
  );

  const nonBillableHours = totalHours - billableHours;

  const billablePercentage = totalHours
    ? Math.round((billableHours / totalHours) * 100)
    : 0;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={{ width: 710 }}>
        <div className="flex space-x-2 items-center mb-6">
          <a href="https://sharpmind.harvestapp.com/reports" target="_blank">
            <img src="/harvest.png" width="20" height="20" />
          </a>
          <div>
            <span className="font-bold text-gray-900">This week:</span>{" "}
            <span className="text-gray-700">
              {props.fromDate} - {props.toDate}
            </span>
          </div>
        </div>

        <div className="flex space-x-12">
          <ChartMetric
            title="Billable Hours"
            firstData={{ title: "Billable", value: `${billableHours}h` }}
            secondData={{
              title: "Non-Billable",
              value: `${nonBillableHours}h`,
            }}
            percentage={billablePercentage}
          />
          <TextMetric
            title="Billable Amount"
            value={`${formatNumber(billableAmount)} SEK`}
          />
          <TextMetric title="Hours Tracked" value={`${totalHours}h`} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const today = new Date();
  const fromDate = date.startOfISOWeek(today);
  const toDate = date.endOfISOWeek(today);

  const teamReport = await getTeamReport(
    date.format(fromDate, "yyyy-MM-dd"),
    date.format(toDate, "yyyy-MM-dd")
  );

  return {
    props: {
      fromDate: date.format(fromDate, "dd MMM"),
      toDate: date.format(toDate, "dd MMM yyyy"),
      teamReport,
    },
  };
};
