/* eslint-disable @next/next/no-html-link-for-pages */
import { Card, Metric, Text } from "@tremor/react";
import { type NextPage } from "next";
import AssetsSection from "~/components/AssetsSection";
import Headline from "~/components/Headline";
import LiabilitiesSection from "~/components/LiabilitiesSection";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Index: NextPage = () => {
  return (
    <>
      <main className="w-full h-full text-white">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-6 sm:gap-y-0 sm:flex-row sm:gap-x-6">
            <Card decoration="top" decorationColor="green">
              <Text>Total Savings</Text>
              <Metric>£44,000</Metric>
            </Card>
            <Card decoration="top" decorationColor="red">
              <Text>Total Debt</Text>
              <Metric>£12,000</Metric>
            </Card>
            <Card decoration="top" decorationColor="green">
              <Text>Net Worth</Text>
              <Metric>£32,000</Metric>
            </Card>
          </div>
          <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 h-full">
            <AssetsSection />
            <LiabilitiesSection />
          </div>
        </div>
      </main>
    </>
  )
}

export default Index;
