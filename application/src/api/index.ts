import React from "react";
import { Entry } from "types/entry";

export class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getAll(): Promise<ReadonlyArray<Entry>> {
    const response: Response = await fetch(`${this.baseUrl}/get-all`);

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  }

  public async getByDateRange(
    from: Date,
    to: Date,
  ): Promise<ReadonlyArray<Entry>> {
    const response: Response = await fetch(
      `${this.baseUrl}/by-date-range?from=${from.getTime()}&to=${to.getTime()}`,
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  }

  public async getHistogram(
    from: Date,
    to: Date,
  ): Promise<{ [key: string]: number }> {
    const response: Response = await fetch(
      `${this.baseUrl}/histogram?from=${from.getTime()}&to=${to.getTime()}`,
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  }
}

export const Api = React.createContext<ApiClient>(new ApiClient(""));
