import { faker } from "@faker-js/faker";
import { STATUS_OPTIONS, STOCK_TICKERS } from "./constants";

export type Status =
  | "New"
  | "Filled"
  | "Partially Filled"
  | "Cancelled"
  | "Rejected";

export interface Trade {
  id: string;
  time: Date;
  stock_symbol: string;
  stock_name: string;
  quantity: number;
  price: number;
  status: Status;
}

// utility function to select a random element from an array
function selectRandomFrom<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

// utility function to generate a random price for a stock
function generateRandomPrice() {
  return 100 + Math.random() * 200;
}

// utility function to generate a random quantity for a trade
function generateRandomQuantity() {
  // generate a random quantity between 1 and 100
  return faker.number.int({ min: 100, max: 500 });
}

// default number of trades to generate
const DEFAULT_TRADE_COUNT = 10000;

export default function generateTrades(
  count: number = DEFAULT_TRADE_COUNT,
): Trade[] {
  const data = Array.from({ length: count }, () => {
    // select a random stock
    const stock = selectRandomFrom(STOCK_TICKERS);

    // select a random status
    const status = selectRandomFrom(STATUS_OPTIONS);

    // create a trade object
    const trade: Trade = {
      id: faker.string.uuid(),
      time: faker.date.recent({ days: 30 }),
      stock_symbol: stock.symbol,
      stock_name: stock.name,
      quantity: generateRandomQuantity(),
      price: parseFloat(generateRandomPrice().toFixed(2)),
      status: status as Status,
    };

    return trade;
  });

  return data;
}
