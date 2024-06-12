const dict = {
  hello: "hello {{ name }}, how are you?",
  goodbye: (name: string) => `goodbye ${name}`,
};

export { dict };
