
interface Cat {
  _type: "Cat";
  legs: number;
  hasTail: boolean;
  name: string;
}


interface Dog {
  _type: "Dog";
  legs: number;
  hasTail: boolean;
  name: string;
}

const typecheckMe = (input: Cat): Dog => {
}
