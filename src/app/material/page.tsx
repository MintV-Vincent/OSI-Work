"use client";
import React from "react";
import { Tabs, Select, NumberInput } from "@mantine/core";
import QuoteTable from "app/Tabs/SalesTables/QuoteTab";
import { useAtom, atom } from "jotai";
import { exchangeRateAtom, panelAtom } from "app/MainWebsite";
import { panelRow } from "Interface/SelectMap";
import TotalTab from "app/Tabs/SalesTables/TotalTab";
import { IconCurrencyDollar } from "@tabler/icons-react";
import {
  materialsTitle,
  NRETitle,
  checkTableTitle,
  processFilmTitle,
} from "Interface/Headers";
import { tabType } from "Interface/Types";
import { CheckTable } from "app/Compontents/Tables/CheckTable";
import { qualityTotalAtom } from "DataBases/TotalDataBase";
import { checkValuesTable } from "Interface/CheckValues";
import { ProtoTable } from "app/Compontents/Tables/ProtoTable";
import { CustomCheckTable } from "app/Compontents/Tables/CustomCheckTable";
import ProcessTab from "app/Tabs/SalesTables/ProcessTable";

export const supplierAtom = atom(new Map<string, Map<string, string>>());

export default function Sales() {
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);
  const [panel, setPanel] = useAtom(panelAtom);
  const [, setQual] = useAtom(qualityTotalAtom);

  const tabs: tabType[] = [
    { title: "Total", table: <TotalTab /> },
    {
      title: materialsTitle,
      table: <QuoteTable title={materialsTitle} code={"Code"} />,
    },
    {
      title: processFilmTitle,
      table: <ProcessTab custom={""} title={processFilmTitle} />,
    },
    {
      title: "Proto Type",
      table: <ProtoTable />,
    },
    {
      title: "Quality Service",
      table: (
        <CheckTable
          titles={checkTableTitle}
          values={checkValuesTable}
          setAtom={setQual}
        />
      ),
    },
    {
      title: "NRE",
      table: <CustomCheckTable titles={NRETitle} />,
    },
  ];

  return (
    <Tabs
      defaultValue={"Total"}
      orientation="vertical"
      color="yellow"
      variant="pills"
    >
      <Tabs.List className="bg-tab w-40 pt-6 h-screen fixed">
        {tabs.map((row: tabType) => (
          <Tabs.Tab
            key={row.title + " header"}
            value={row.title}
            className="py-3.5"
            style={{
              color: "#22223B",
            }}
          >
            {row.title}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map((row: tabType) => (
        <Tabs.Panel
          className="py-0 ml-40"
          key={row.title + " tab"}
          value={row.title}
        >
          <div className="mx-8">
            <h1 className="text-primary text-center">{row.title}</h1>
            <div className="flex justify-between">
              <label className="text-xl w-1/4 text-left">
                USD Exchange Rate
              </label>
              <label className="text-xl w-1/4 text-left">Panel Size</label>
            </div>
            <div className="flex justify-between">
              <NumberInput
                className="w-1/4 pb-3"
                hideControls
                precision={2}
                value={exchangeRate}
                onChange={(event: number | "") => {
                  setExchangeRate(event);
                }}
                rightSection={
                  <IconCurrencyDollar
                    size={"1.25rem"}
                    style={{ display: "block", opacity: 0.5 }}
                  />
                }
                rightSectionWidth={36}
              />
              <Select
                className="w-1/4 pb-3"
                defaultValue={"1.5"}
                value={panel}
                onChange={setPanel as any}
                data={panelRow}
                title={"Panel Size"}
              />
            </div>
            <div>{row.table}</div>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
