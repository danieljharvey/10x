import { VersionedType, ConversionFunction } from "../types/types";

const dog: VersionedType = {
  name: "Dog",
  typeInfo: `
interface Dog {
  _type: "Dog";
  legs: number;
  hasTail: boolean;
  name: string;
}
`
};

const cat: VersionedType = {
  name: "Cat",
  typeInfo: `
interface Cat {
  _type: "Cat";
  legs: number;
  hasTail: boolean;
  name: string;
}
`
};

export const catToDog: ConversionFunction = {
  from: cat,
  to: dog,
  functionBody: ""
};
