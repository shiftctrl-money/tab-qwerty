"use client";
import Link from "next/link";
import { Tabs } from "flowbite-react";
import { customTabTheme } from "@/theme/CustomTabTheme";
import { AllTabs } from "./helpers/tabs/AllTabs";
import { AfricanTabs } from "./helpers/tabs/AfricanTabs";
import { AsianTabs } from "./helpers/tabs/AsianTabs";
import { OceaniaTabs } from "./helpers/tabs/OceaniaTabs";
import { NorthAmericanTabs } from "./helpers/tabs/NorthAmericanTabs";
import { SouthAmericanTabs } from "./helpers/tabs/SouthAmericanTabs";
import { EuropeanTabs } from "./helpers/tabs/EuropeanTabs";
import { AllTabsTableContent } from "@/components/AllTabsContent";
import ConnectButtonWrapper from "@/components/ConnectButtonWrapper";
import { PopularTabs } from "@/components/PopularTabs";

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="h-screen p-8 flex justify-center items-center"
      >
        <div className="h-full bg-hero-img bg-cover bg-no-repeat bg-center w-full flex items-center rounded-xl">
          <div className="container mx-auto">
            <div className="mx-auto max-w-[780px] text-center text-white">
              <h1 className="mb-6 text-3xl font-bold leading-snug sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]">
                Your gateway to self sovereign money
              </h1>
              <p className="mx-auto mb-9 max-w-[600px] text-base font-medium sm:text-lg sm:leading-[1.44]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                convallis ante eros.
              </p>

              <ConnectButtonWrapper />
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 bg-[#F2F2F2] rounded-3xl mx-8">
        <h1 className="text-center text-2xl">Popular tab currencies</h1>
        <PopularTabs />
      </section>
      <section className="p-12 mx-8">
        <Tabs theme={customTabTheme} aria-label="Pills" style="pills">
          <Tabs.Item active title="All Tabs">
            <AllTabsTableContent tabs={AllTabs} />
          </Tabs.Item>
          <Tabs.Item title="Africa">
            <AllTabsTableContent tabs={AfricanTabs} />
          </Tabs.Item>
          <Tabs.Item title="Asia">
            <AllTabsTableContent tabs={AsianTabs} />
          </Tabs.Item>
          <Tabs.Item title="Oceania">
            <AllTabsTableContent tabs={OceaniaTabs} />
          </Tabs.Item>
          <Tabs.Item title="North America">
            <AllTabsTableContent tabs={NorthAmericanTabs} />
          </Tabs.Item>
          <Tabs.Item title="South America">
            <AllTabsTableContent tabs={SouthAmericanTabs} />
          </Tabs.Item>
          <Tabs.Item title="Other">
            <AllTabsTableContent tabs={EuropeanTabs} />
          </Tabs.Item>
        </Tabs>
      </section>
    </>
  );
}
