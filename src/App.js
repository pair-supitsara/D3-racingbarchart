import * as d3 from 'd3';
import { useEffect, useState  } from 'react';
import classes from './App.module.css';
import regionColor from './region-color.json'
import PopulationGrowthChart from './components/PopulationGrowthChart';
import Controller from './components/Controller'
import PopulationGrowthChart2 from './components/PopulationGrowthChart2';
import { fetchdata } from './utils/api'; 
import { formatAmount } from './utils/format'

function App() {
  const [data, setData] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [index, setIndex] = useState(0)
  const [Region, setRegion] = useState(null)

  // FETCH DATA/GROUP ONLY FIRST TIME
  useEffect(() => {
    /*const dataPopulation = [
      { region: 'Asia', name: 'Japan', population: 126.3, year: 1950, imageUrl: 'http://localhost:3000/logo512.png'},
      { region: 'Asia', name: 'Japan', population: 140, year: 1951, imageUrl: 'http://localhost:3000/logo512.png'},
      { region: 'Asia', name: 'Japan', population: 160.3, year: 1952, imageUrl: 'http://localhost:3000/logo512.png' },
      { region: 'Europe', name: 'Germany', population: 83.2, year: 1950, imageUrl: 'http://localhost:3000/logo512.png' },
      { region: 'Europe', name: 'Germany', population: 89, year: 1951, imageUrl: 'http://localhost:3000/logo512.png'},
      { region: 'Europe', name: 'Germany', population: 140, year: 1952, imageUrl: 'http://localhost:3000/logo512.png'},
      { region: 'Asia', name: 'China', population: 1563.8, year: 1950, imageUrl: 'http://localhost:3000/logo512.png'},
      { region: 'Asia', name: 'China', population: 1893.8, year: 1951, imageUrl: 'http://localhost:3000/logo512.png'},
      { region: 'Asia', name: 'China', population: 2093.8, year: 1952, imageUrl: 'http://localhost:3000/logo512.png'},
      { region: 'Europe', name: 'France', population: 67.1, year: 1950, imageUrl: 'http://localhost:3000/logo512.png'},
      { region: 'Europe', name: 'France', population: 80.1, year: 1951, imageUrl: 'http://localhost:3000/logo512.png' },
      { region: 'Europe', name: 'France', population: 120, year: 1952, imageUrl: 'http://localhost:3000/logo512.png' },
      { region: 'Asia', name: 'India', population: 1380, year: 1950, imageUrl: 'http://localhost:3000/logo512.png' },
      { region: 'Asia', name: 'India', population: 1680, year: 1951, imageUrl: 'http://localhost:3000/logo512.png' },
      { region: 'Asia', name: 'India', population: 1980, year: 1952, imageUrl: 'http://localhost:3000/logo512.png' },
    ];*/
    async function fetchPopulationGrowth(){
      const dataPopulation = await fetchdata('/populationgrowth')
      const groupedData = d3.group(dataPopulation, d => d.year);
      const sortedGroupedData = Array.from(groupedData, ([year, countries]) => {
        let sortedCountries = countries.sort((a, b) => d3.descending(a.population, b.population))
        return [year, sortedCountries]
      });
      setData(sortedGroupedData)
    }
    fetchPopulationGrowth()
  }, []) 

  // setInterval
  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => {
        setIndex((i) => { 
          if (i === (data.length-1)) {
            setIsPlaying(false) // stop when reach last index
            return 0 // reset index
          } else {
            return +(i+1)
          }
        })
      }, 500);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isPlaying]) 

  function playVideo() {
    setIsPlaying((prev) => !prev)
  }

  function filterRegion(region) {
    setRegion(region)
  }

  function handleSlider(e) {
    setIndex(+e.target.value)
  }

  const currentYear = data && data[index] ? data[index][0] : null
  const totalPopulation = data && data[index] && data[index][1] ? data[index][1].reduce((acc, item) => acc + item.population, 0) : null
  let filteredData = data && data[index] ? data[index][1].filter((item) => { return Region ? item.region === Region : true }) : null
  filteredData = filteredData && filteredData.length > 0 ? filteredData.slice(0, 12) : null
  
  return (
    <div className="App">
      <div className={classes['container']}>
        {data.length === 0 && <p className={classes['text-loader']}>data is fetching...</p>}

        <div className={classes['header']}>
          { data && data.length > 0 && (<>
            <h1>Population growth per country, 1950 to 2021</h1>
            <p>Click on the legend below to filter by continent</p>
              <ul><b>Region</b>{
              Object.keys(regionColor).map((key) => 
                <li key={key} className={regionColor[key]} style={{ cursor: 'pointer' }}onClick={() => filterRegion(key)}>
                  <span className={`${classes['color-region']}`} style={{ backgroundColor: `${regionColor[key]}`}}></span>
                  { key }
                </li>)
              }</ul>
            </>)}
        </div>

        <div className={classes['chart-container']}>
          { currentYear && totalPopulation && 
            <div className={classes['chart-text']}>
              <h1>{ currentYear }</h1>
              <h2>Total: { formatAmount(totalPopulation) }</h2>
            </div>}
          { filteredData && <div className={classes.chart}>
            <PopulationGrowthChart2 data={filteredData} />
          </div>}
        </div>

        <Controller data={data} index={index} isPlaying={isPlaying} playVideo={playVideo} handleSlider={handleSlider} />
      </div>
    </div>
  );
}

export default App;
