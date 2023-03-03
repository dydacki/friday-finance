import { parse, Options, ColumnOption } from 'csv-parse/sync';
import * as fs  from 'fs';

export function parseFromFile<T>(filePath: string, headers: ColumnOption[]): Array<T> {
  const parseOptions: Options = {
    delimiter: ',',
    columns: headers,
    encoding: 'utf-8'
  };

  const fileContent = fs.readFileSync(filePath);
  try {
  const parsedArray = parse(fileContent, parseOptions);
  return parsedArray as T[];
  } catch (error) {
    console.error(error);
    return [];
  }
}