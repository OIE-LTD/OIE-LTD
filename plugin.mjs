const heroDirective = {
  name: `hero`,
  doc: `A directive for a hero section`,
  body: {
    type: "myst",
  },
  run(data) {
    const div = {
      type: "div",
      style: {
        fontWeight: "bold",
        fontSize: "4em",
        maxWidth: "50%",
        margin: ".2em auto",
        textAlign: "center",
        lineHeight: "normal",
      },
      children: data.body,
    };
    return [div];
  },
};

const sizes = {
  lg: "1.5em",
  sm: "0.5em",
};
const sizeRoles = Object.entries(sizes).map(([key, value]) => {
  return {
    name: key,
    doc: `A role for large text`,
    body: {
      type: "myst",
    },
    run(data) {
      const div = {
        type: "span",
        style: { fontSize: value },
        children: data.body,
      };
      return [div];
    },
  };
});

const colours = {
  primary: "#e07330",
};
const colourRoles = Object.entries(colours).map(([key, value]) => {
  return {
    name: `col-${key}`,
    doc: `A role for primary orange text`,
    body: {
      type: "myst",
    },
    run(data) {
      const div = {
        type: "span",
        style: { color: value },
        children: data.body,
      };
      return [div];
    },
  };
});

const classTransform = {
  name: "transform-hero",
  stage: "document",
  plugin: (_, utils) => (node) => {
    utils
      .selectAll("block", node)
      .filter((block) => block.data?.class?.includes?.("hero-centered"))
      .forEach((block) => {
        console.log(block);
        block.style = block.style ?? {};
        block.style.textAlign = "center";
      });
  },
};

const plugin = {
  name: "Landing page extensions",
  roles: [...sizeRoles, ...colourRoles],
  directives: [heroDirective],
  transforms: [classTransform],
};

export default plugin;
