
import './App.css';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://tomaszx.pl/materialy/dane-imdb.json';

fetch(proxyUrl + apiUrl, {
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Błąd pobierania danych:', error);
  });


function App() {
  
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
