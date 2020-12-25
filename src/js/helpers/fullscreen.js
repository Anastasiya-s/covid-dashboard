const resize = (e) => {
  const el = e.target;
  const container = el.parentNode.parentNode;
  container.requestFullscreen();
};

export default resize;
