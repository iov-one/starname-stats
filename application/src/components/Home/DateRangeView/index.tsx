import { DatePicker } from "@mui/lab";
import { TextField, TextFieldProps } from "@mui/material";
import { Api, ApiClient } from "api";
import { Moment } from "moment";
import React from "react";
import { Chart } from "react-google-charts";
import { Entry } from "types/entry";

export const DateRangeView: React.FC = (): React.ReactElement => {
  const [entries, setEntries] = React.useState<ReadonlyArray<Entry>>([]);
  const [histogram, setHistogram] = React.useState<{ [key: string]: number }>(
    {},
  );
  const [from, setFrom] = React.useState<Date>(new Date());
  const [to, setTo] = React.useState<Date>(new Date());

  const api = React.useContext<ApiClient>(Api);

  React.useEffect((): void => {
    api.getByDateRange(from, to).then(setEntries).catch(console.warn);
    api.getHistogram(from, to).then(setHistogram).catch(console.warn);
  }, [api, from, to]);

  const onDateChange = (
    setter: (date: Date) => void,
  ): ((date: Moment | null) => void) => {
    return (value: Moment | null): void => {
      if (value !== null) {
        setter(value.toDate());
      }
    };
  };

  const renderInput = (props: TextFieldProps): JSX.Element => (
    <TextField variant={"outlined"} {...props} />
  );

  const data = React.useMemo((): ReadonlyArray<[string, number | string]> => {
    return [["Date", "Number of Starnames"], ...Object.entries(histogram)];
  }, [histogram]);

  // noinspection RequiredAttributes
  return (
    <div>
      <form>
        <DatePicker
          renderInput={renderInput}
          value={from}
          onChange={onDateChange(setFrom)}
        />
        <DatePicker
          renderInput={renderInput}
          value={to}
          onChange={onDateChange(setTo)}
        />
      </form>

      <div>
        Starnames registered in this period: <span>{entries.length}</span>
      </div>

      <Chart
        width={"500px"}
        height={"300px"}
        chartType={"Histogram"}
        data={data}
        options={{
          title: "Number of starnames registered per day",
          legend: { position: "none" },
        }}
      />
    </div>
  );
};
