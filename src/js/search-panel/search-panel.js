const handleSearch = () => {
  const input = document.querySelector('.search-input');
  const searchQuery = input.value.toLowerCase();
  const options = document.querySelectorAll('.countries-item');
  options.forEach((option) => {
    const item = option;
    if (option.dataset.country.toLowerCase().indexOf(searchQuery) > -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

export default handleSearch;
