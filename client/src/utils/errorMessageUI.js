export default (string) => {
  if (string.split(". ")[0] === "Duplicate field values found") {
    const errkeys = Object.keys(JSON.parse(string.split(". ")[1])).map(
      (key) => key.charAt(0).toUpperCase() + key.slice(1)
    );
    return `${errkeys.join(" or ")} already taken.`;
  } else return string;
};
