
import Header from './components/Header'
import ListaCompras from './components/ListaCompras';

import './css/styles.css'


function App() {
  



  return (
    <div className="App">
      <Header data={"MerCarrinho"}></Header>

      <div className="body">
          <ListaCompras/>
      </div>
    </div>
  )
}

export default App
