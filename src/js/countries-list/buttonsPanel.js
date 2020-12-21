const buttonsPanel = () => `
  <div>
    <div>
      <span>Total:</span>
      <ul class="data-panel">
        <li><button data-info="cases">Confirmed</button></li>
        <li><button data-info="deaths">Deaths</button></li>
        <li><button data-info="recovered">Recovered</button></li>
      </ul>
    </div>
    <div>
    <span>Today:</span>
      <ul class="data-panel">
        <li><button data-info="todayCases">Confirmed</button></li>
        <li><button data-info="todayDeaths">Deaths</button></li>
        <li><button data-info="todayRecovered">Recovered</button></li>
      </ul>
    </div>
    <ul>
      <li><button class="absolute">Total</button></li>
      <li><button class="relative">per 100 000</button></li>
    </ul>
  </div>
`;

export default buttonsPanel;
