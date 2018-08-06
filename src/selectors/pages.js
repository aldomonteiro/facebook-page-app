// Get sorted, filtered available pages

export default (pages, { text }) => {
  return pages.filter((page) => {
    const textMatch = page.name.toLowerCase().includes(text.toLowerCase());
    return textMatch;
  }).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};
