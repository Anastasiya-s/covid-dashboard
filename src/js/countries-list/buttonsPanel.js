const buttonsPanel = () => `
  <div>
    <div>
      <span>Total:</span>
      <ul class="data-panel">
        <li><button data-info="totalConfirmed">Confirmed</button></li>
        <li><button data-info="totalDeaths">Deaths</button></li>
        <li><button data-info="totalRecovered">Recovered</button></li>
      </ul>
    </div>
    <div>
    <span>Today:</span>
      <ul class="data-panel">
        <li><button data-info="newConfirmed">Confirmed</button></li>
        <li><button data-info="newDeaths">Deaths</button></li>
        <li><button data-info="newRecovered">Recovered</button></li>
      </ul>
    </div>
    <ul>
      <li><button data-stats="absolute">Total</button></li>
      <li><button data-stats="perThousand">per 100 000</button></li>
    </ul>
  </div>
`;

export default buttonsPanel;
