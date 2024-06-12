const dict = {
  hello: "hallo {{ name }}, wie geht es dir?",
  goodbye: (name: string) => `goodbye ${name}`,
};

export { dict };
