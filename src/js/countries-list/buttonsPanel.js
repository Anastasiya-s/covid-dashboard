const buttonsPanel = () => `
  <div class="countries-nav">
    <div class="panel-wrapper">
      <span class="panel-label">All time:</span>
      <ul class="data-panel">
        <li><button data-info="cases">Confirmed</button></li>
        <li><button data-info="deaths">Deaths</button></li>
        <li><button data-info="recovered">Recovered</button></li>
      </ul>
    </div>
    <div class="panel-wrapper">
    <span class="panel-label">Today:</span>
      <ul class="data-panel">
        <li><button data-info="todayCases">Confirmed</button></li>
        <li><button data-info="todayDeaths">Deaths</button></li>
        <li><button data-info="todayRecovered">Recovered</button></li>
      </ul>
    </div>
    <ul class="data-panel">
      <li><button class="absolute">Total</button></li>
      <li><button class="relative">per 100 000</button></li>
    </ul>
  </div>
`;

export default buttonsPanel;
