import React from "react";
import { Tabs, Select, NumberInput } from "@mantine/core";
import QuoteTable from "./SalesTables/QuoteTab";
import { useAtom, atom } from "jotai";
import { exchangeRateAtom, panelAtom } from "MainWebsite";
import { panelRow } from "Interface/SelectMap";
import TotalTab from "./SalesTables/TotalTab";
import { IconCurrencyDollar } from "@tabler/icons-react";
import FilmTable from "./SalesTables/ProcessTable";
import {
  coverTitle,
  filmTitle,
  laminateTitle,
  mechanicalTitle,
  stiffenerTitle,
  tapeTitle,
} from "Interface/Headers";
import { tabType } from "Interface/Types";

export const supplierAtom = atom(new Map<string, Map<string, string>>());

export default function Sales() {
  const [exchangeRate, setExchangeRate] = useAtom(exchangeRateAtom);
  const [panel, setPanel] = useAtom(panelAtom);

  const tabs: tabType[] = [
    { title: "Total", table: <TotalTab /> },
    {
      title: laminateTitle,
      table: <QuoteTable title={laminateTitle} code={"Code"} />,
    },
    {
      title: coverTitle,
      table: <QuoteTable title={coverTitle} code={"Code"} />,
    },
    {
      title: stiffenerTitle,
      table: <QuoteTable title={stiffenerTitle} code={"Thickness"} />,
    },
    {
      title: tapeTitle,
      table: <QuoteTable title={tapeTitle} code={"Model #"} />,
    },
    {
      title: filmTitle,
      table: <FilmTable custom={""} title={filmTitle} />,
    },
    {
      title: mechanicalTitle,
      table: <FilmTable custom={""} title={mechanicalTitle} />,
    },
  ];

  return (
    <Tabs defaultValue={"Total"} orientation="vertical" color="dark">
      <Tabs.List className="bg-tab w-40 pt-6 h-screen fixed">
        {tabs.map((row: tabType) => (
          <Tabs.Tab
            key={row.title + " header"}
            value={row.title}
            className="py-3.5"
          >
            {row.title === filmTitle ? (
              <label>
                Dry Film & <br />
                <span>Wet Process</span>
              </label>
            ) : (
              row.title
            )}
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
