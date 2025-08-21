<template>
  <div class="component">
    <!-- Line selector -->
    <span class="label label-center">Find from line</span>
    <div class="customSelector">
      <div class="customSelectList">
        <div
          v-for="line in lines"
          :key="line.id"
          class="customSelectOption"
          :class="{ selected: line.id === selectedLine }"
          @click="selectLine(line)"
        >
          <img :src="`resources/img/lineIcons/${line.id}.svg`" />
          <span>{{ line.name }}</span>
        </div>
      </div>
    </div>

    <!-- Station selector -->
    <div class="customSelector">
      <div v-if="!selectedLine" class="placeholder">Select a line to search stations</div>
      <div v-else>
        <input
          type="search"
          v-model="stationSearch"
          placeholder="Search stations..."
        />
        <div class="customSelectList">
          <div
            v-for="station in filteredStations"
            :key="station.id"
            class="customSelectOption"
            :class="{ selected: station.id === selectedStation }"
            @click="selectStation(station)"
          >
            {{ station.name }} ({{ station.lines.map(l => l.short_name).join('/') }})
          </div>
        </div>
      </div>
    </div>

    <!-- Train selection -->
    <div v-if="selectedStation" class="component">
        <div class="component-inline">
            <span class="label">Select Trains</span>
            <div class="trainsSelectionContainer">
            <label v-for="line in stationLines" :key="line.id">
            <input
                type="checkbox"
                :value="line.id"
                v-model="selectedTrains"
                @change="emitData()"
            />
            <span class="circle">
                <img :src="`resources/img/lineIcons/${line.id}.svg`" />
            </span>
            </label>
        </div>
      </div>
    </div>

    <!-- Direction selection -->
    <div v-if="selectedStation" class="component">
      <div class="component-inline">
        <span class="label">Select Direction</span>
        <div class="direction-container">
          <div v-if="selectedStationData?.direction_N" class="direction-option" :class="{ 'option-focused': direction === 'N' }" @click="setDirection('N')">
            {{ selectedStationData?.direction_N }}
          </div>
          <div class="direction-arrow" :class="{ 'down' : direction === 'S' }" @click="toggleDirection">↑</div>
          <div v-if="selectedStationData?.direction_S" class="direction-option" :class="{ 'option-focused': direction === 'S' }" @click="setDirection('S')">
            {{ selectedStationData?.direction_S }}
          </div>
        </div>
      </div>
    </div>

    <!-- Result -->
    <div v-if="selectedStation" class="component">
      <span>Selection:</span><br />
      <span><i>{{ selectedStationName }}</i> towards <i>{{ selectedDirectionName }}</i></span><br />
      <span v-if="selectedTrains.length" class="trains-result">
        <span>{{ selectedTrains.length > 1 ? 'Trains:' : 'Train:' }}</span>
        <img v-for="train in sortedTrains" :key="train" :src="`resources/img/lineIcons/${train}.svg`" />
      </span>
      <span v-else class="trains-result">Select trains.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComponentStationPicker",
  props: ['id'],
  data() {
    return {
      lines: [],
      stations: [],
      selectedLine: null,
      selectedStation: null,
      selectedTrains: [],
      direction: "N",
      stationSearch: ""
    };
  },
  computed: {
    filteredStations() {
      if (!this.selectedLine) return [];
      return this.stations
        .filter(s => s.lines.some(l => l.id === this.selectedLine))
        .filter(s => s.name.toLowerCase().includes(this.stationSearch.toLowerCase()));
    },
    selectedStationData() {
      return this.stations.find(s => s.id === this.selectedStation);
    },
    stationLines() {
      return this.selectedStationData?.lines || [];
    },
    selectedStationName() {
      return this.selectedStationData?.name || "";
    },
    sortedTrains() {
      return [...this.selectedTrains].sort();
    },
    selectedDirectionName() {
      return this.direction === "N"
        ? this.selectedStationData?.direction_N
        : this.selectedStationData?.direction_S;
    }
  },
  methods: {
    async fetchCSV(url) {
      const response = await fetch(url);
      const text = await response.text();
      return text.split("\n").slice(1).map(row => row.split(","));
    },
    async loadData() {
      const rawLines = await this.fetchCSV("data/lines.csv");
      const rawStops = await this.fetchCSV("data/stations.csv");

      this.lines = rawLines.map(row => ({
        id: row[1],
        name: row[3],
        short_name: row[2],
        direction_N: row[5],
        direction_S: row[6],
      }));

      this.stations = rawStops.map(row => ({
        id: row[0],
        name: row[5],
        lines: row[8] ? row[8].split(" ").map(line => ({ id: line })) : [],
        direction_N: row[12],
        direction_S: row[13],
        geo_lat: row[10],
        geo_long: row[11],
      }));

      // associate station lines to full line data 
      this.stations = this.stations.map(station => {
        return {
          ...station,
          lines: station.lines.map(line => {
            const fullLine = this.lines.find(l => l.id === line.id);
            return fullLine ? { id: fullLine.id, short_name: fullLine.short_name } : line;
          })
        };
      });
    },
    selectLine(line) {
      this.selectedLine = line.id;
      this.selectedStation = null;
      this.selectedTrains = [];
      // this.emitData();
    },
    selectStation(station) {
      this.selectedStation = station.id;
      this.selectedTrains = [this.selectedLine];
      if (!station.direction_N) this.direction = 'S';
      if (!station.direction_S) this.direction = 'N';
      this.emitData();
    },
    setDirection(dir) {
      this.direction = dir;
      this.emitData();
    },
    toggleDirection() {
      if (!this.selectedStationData.direction_N) this.direction = 'S';
      else if (!this.selectedStationData.direction_S) this.direction = 'N';
      else this.direction = this.direction === "N" ? "S" : "N";
      this.emitData();
    },
    emitData(){
      this.$emit('selection-changed', {
        id: this.id,
        selectedLine: this.selectedLine,
        selectedStation: this.selectedStation,
        selectedTrains: this.sortedTrains,
        direction: this.direction,
      });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
    .component-inline {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 0.25rem 0;
    }
    .label {
      display: flex;
    }
    .label-center {
      justify-content: center;
      margin-bottom: 0.25rem;
    }
    .component-inline .label {
      max-width: 100%;
    }
    h6 {
      color: #a4a4a4;
    }
    select, input { margin: 5px 0; width: 300px; }

    input[type="checkbox"] {
      -webkit-appearance: none;
      appearance: none; 
      width: auto !important;
    }
    .customSelector {
      border: #767676 1px solid;
      border-radius: 2px;
      padding: 0 0 0 0.5rem;
      padding-bottom: 0;
      background: white;
      min-height: 1rem;
      margin-bottom: 0.5rem;
    }
    .placeholder {
      width: 100%;
      text-align: center;
      color: #a4a4a4;
      font-size: 0.75rem;
      padding: 0.2rem 0;
      position: relative;
      top: 2px;
    }
    input[type="search"]{
      font: inherit;
      box-sizing: border-box;
      width: calc(100% - 24px);
      height: 2rem;
      margin: 0;
      border: 0;
      border-bottom: 2px #414141 solid;
      margin-right: 24px;
      margin-left: 3px;
      padding-top: 0.5rem;
    }
    input[type="search"]:focus{
      outline: 0;
      border-bottom: 2px #ff4700 solid;
    }
    .customSelectList {
      padding: 0.5rem 1px 2px 4px; /* take accnt of 11px of scrollbar to the right*/
      height: 7em;
      width: 100%;
      width: calc(100% - 5px); 
      overflow: scroll;
      color: black;
    }
    .customSelectOption {
      padding: 1px;
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }
    .customSelectOption.selected {
      background-color: #b3d7ff;
    }
    .customSelectOption img {
      margin-right: 0.5rem;
    }
    .customSelectOption span {
      position: relative;
      top: 2px;
    }
    .customSelectList::-webkit-scrollbar {
        -webkit-appearance: none;
    }

    .customSelectList::-webkit-scrollbar:vertical {
        width: 16px;
    }

    .customSelectList::-webkit-scrollbar:horizontal {
        height: 0px;
    }

    .customSelectList::-webkit-scrollbar-thumb {
        border-radius: 8px;
        border: 2px solid white; /* should match background, can't be transparent */
        background-color: rgba(0, 0, 0, .5);
    }

    .trainsSelectionContainer {
      display: flex;
      height: 35px;
      justify-content: center;
      /* overflow: hidden; */
    }
    .trainsSelectionContainer .circle { 
      display: block;
      width: 35px;
      height: 35px;
      margin-right: 10px;
      transition: transform 100ms ease-in-out;
    }
    input[type="checkbox"]:checked + .circle {
      transform: scale(1.2);
    }
    label .circle {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      transition: border 100ms ease-in-out;
    }
    label .circle::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 0px solid black;
      box-shadow: inset 0 0 0px black;
      pointer-events: none; 
      z-index: 1;
      transition: border 100ms ease-in-out;
    }
    input[type="checkbox"]:checked + .circle {
      border: 3px solid #ff4700;
    }
    input[type="checkbox"]:checked + .circle::before {
      border: 1.5px solid #414141;
    }
    label img { 
      width: 100%;
      height: 100%;
      transition: transform 100ms ease-in-out;
    }
    input[type="checkbox"]:checked + label .circle img {
      transform: scale(1.1);
    }

    .direction-container {
      min-width: 40%;
      display: flex;
      flex-direction: column;
      align-items: center;
      user-select: none;
    }
    .direction-arrow {
      font-size: 3rem;
      cursor: pointer;
      transition: transform 100ms ease-in-out;
    }
    .direction-arrow.down {
      transform: rotate(180deg);
    }
    .option-focused {
      font-weight: bold;
      font-size: 1.1rem;
      text-decoration: underline;
    }

    .trains-result {
      display: flex;
      align-items: center;
      min-height: 24px;
    }

    .trains-result span {
      margin-right: 0.5rem;
    }

    .hidden { display: none !important; }
</style>
