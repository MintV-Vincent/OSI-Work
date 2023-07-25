import { Checkbox, Tabs } from "@mantine/core";
import { CheckTable } from "Compontents/Tables/CheckTable";
import { CustomCheckTable } from "Compontents/Tables/CustomCheckTable";
import { ProtoTable } from "Compontents/Tables/ProtoTable";
import {
  assyTotalAtom,
  processTotalAtom,
  qualityTotalAtom,
} from "DataBases/TotalDataBase";
import {
  AssyToolValues,
  processValues,
  qualityValues,
} from "Interface/CheckValues";
import {
  NRETitle,
  assyTooling,
  processTitle,
  qualityServiceTitle,
} from "Interface/Headers";
import { tabType } from "Interface/Types";
import { useAtom } from "jotai";
import React, { useState } from "react";
import TotalTab from "./SalesTables/TotalTab";

export default function Check({}) {
  const [, setAssy] = useAtom(assyTotalAtom);
  const [, setQual] = useAtom(qualityTotalAtom);
  const [, setProc] = useAtom(processTotalAtom);

  const tabs: tabType[] = [
    { title: "Total", table: <TotalTab /> },
    {
      title: "Proto Type",
      table: <ProtoTable />,
    },
    {
      title: "Assembly Tooling",
      table: (
        <CheckTable
          titles={assyTooling}
          values={AssyToolValues}
          setAtom={setAssy}
        />
      ),
    },
    {
      title: "Quality Service",
      table: (
        <CheckTable
          titles={qualityServiceTitle}
          values={qualityValues}
          setAtom={setQual}
        />
      ),
    },
    {
      title: "Processes",
      table: (
        <CheckTable
          titles={processTitle}
          values={processValues}
          setAtom={setProc}
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
      defaultValue={"Assembly Tooling"}
      orientation="vertical"
      color="yellow"
      variant="pills"
    >
      <Tabs.List className="bg-tab pt-6 w-40 h-screen fixed">
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
            {row.table}
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
