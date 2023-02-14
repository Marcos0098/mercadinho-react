import React from 'react'
import Modal from 'react-modal'
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai'
import mercearia from "./images/mercearia.jpg"
import hortifruti from "./images/hortifruti.jpg"
import bazar from './images/bazar.jpg'
import acougue from './images/açougue.jpg'
import frios from './images/frios.jpg'

const progressBar = {
  height: '10px',
  border: '2px solid #eee',
  marginBottom: '10px',
  borderRadius: '10px'
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};



Modal.setAppElement(document.getElementById('root'));

const ModalProduto = () => {

  const [carrinho, setCarrinho] = useState([])
  const [cupom, setCupom] = useState()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [cupomActive, setCupomActive] = useState(false)

  const [count, setCount] = useState(0)
  const [valorTotal, setValorTotal] = useState(0)
  const [data, setData] = useState({
    produto: '',
    quantidade: '',
    preco: '',
    tipoDoProduto: ''
  })
  const images = {
    mercearia: mercearia,
    hortifruti: hortifruti,
    bazar: bazar,
    acougue: acougue,
    frios: frios
  }

  let validatedInputs = 0;

  const openModal = () => {
    setModalIsOpen(true);
  }
    
  const closeModal = () => {
    setModalIsOpen(false);
  }
  const handleData = (e) => {
    const {name, value} = e.target

    setData((prev) => {
    const newArr = {...prev, [name]: value}

    return newArr;
    })
    
  }
    
  const handleAdd = () => {

    const newArr = [...carrinho, {
      produto: data.produto,
      quantidade: data.quantidade,
      preco: data.preco,
      tipoDoProduto: data.tipoDoProduto
    }];

    setCount(count + 1);
    setCarrinho(newArr);
    setValorTotal(valorTotal + parseInt(data.preco * data.quantidade))
    closeModal();
    setData({
      produto: '',
      quantidade: '',
      preco: '',
      tipoDoProduto: ''
      });
  }
  
  const cupomSave = (e) => {
    const value = e.target.value

    setCupom(value)
  }

  const validateCupom = (e) => {
    const promocao = 'MerCarrinho10'

    if (promocao === cupom){
      e.preventDefault();
      alert("Cupom Adicionado com Sucesso!")
      setValorTotal(valorTotal*0.9)
      setCupomActive(true)
    }
    else{
      e.preventDefault();
      alert("Cupom Invalido")
      alert("Dica: o cupom de 10% é o Nome do site mais o desconto. :)")
    }
  }

  const finalizarCompra = () => {
    alert("Obrigado por utilizar o Site!!!")
    location.reload();
  }

  const handleDelete = (index, preco, quantidade) => {
    const totalItem = parseInt(preco * quantidade)
    const newArr = Array.from(carrinho)

    newArr.splice(index, 1)

    setCarrinho(newArr)
    setValorTotal(valorTotal - totalItem);
    setCount(count - 1)
  }

  const carregarBarra = () => {
    
    const totalPercent = 100;
    const totalProperties = Object.keys(data).length;

    
    let porcentagem = (totalPercent * validatedInputs) / totalProperties;
   
    if(data.produto){
      validatedInputs += 1
    }
    if(data.quantidade){
      validatedInputs += 1
    }

    if(data.preco){
      validatedInputs += 1
    }

    if(data.tipoDoProduto){
      validatedInputs += 1
    }

    console.log("porcentagem:",porcentagem)
    console.log("inputs preenchidos: ",validatedInputs)

    return porcentagem
  }

  carregarBarra();
  
  console.log()
  return (
      <div className="body">
        <div className="body-carrinho">
          <h2>Seu carrinho</h2>
          <table>
            <thead>
              <tr>
                <th>Setor</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Un.</th>
                <th>Preço Total</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              {carrinho.map((item, index) => {
                
                return(
                  <tr key={item.produto}>
                    <th><img className='product-image' src={item.tipoDoProduto}/></th>
                    <th><p className='th-produto'>{item.produto}</p></th>
                    <th>{item.quantidade}</th>
                    <th>R$ {item.preco}</th>
                    <th>R$ {item.preco * item.quantidade}</th>
                    <th>
                        <button onClick={() => handleDelete(index, item.preco, item.quantidade)}><AiFillCloseCircle/></button>
                    </th>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="body-right">
          <button onClick={openModal}>Add to cart</button>
          <div className="body-right-info">
              <h3>Informações do Carrinho</h3>
              <p>Produtos no carrinho: <span>{count}</span></p>
              <form onSubmit={validateCupom}>
                <p>Possui um cupom de desconto?</p>
                <input type="text" placeholder='Cupom' value={cupom} onChange={cupomSave} />
                <input type="submit" value="Validar Cupom" disabled={cupomActive === true}/>
              </form>

              <div className="valor-total"><p>Valor total da Compra: <span>R$ {valorTotal.toFixed(2)}</span></p></div>
              <div className='finalizar'> <button onClick={finalizarCompra}>Finalizar Carrinho</button> </div>
          </div>
        </div>
        
          <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Adicionar Produto"
          >
            <h2>Adicione o seu produto!</h2>
            <div style={progressBar} className="progress-bar">
              <div style={{maxWidth: `${carregarBarra()}%`, height: '8px', backgroundColor: 'green', transition: ".3s ease", borderRadius: '10px'}} className="green-bar"></div>
            </div>
            <form onSubmit={handleAdd}>
            <input type="text" name='produto' placeholder='Nome do produto' value={data.produto} onChange={handleData} />
            <input type="number" name='quantidade' placeholder='Quantidade' value={data.quantidade} onChange={handleData} min='0' />
            <input type="number" name='preco' placeholder='Valor do Produto' value={data.preco} onChange={handleData} min='0' />
            <div className="radios-container">
              <span>
                <input type="radio" name='tipoDoProduto' value={images.mercearia} onChange={handleData} checked={data.tipoDoProduto === images.mercearia} />Mercearia
              </span>
              <span>
                <input type="radio" name='tipoDoProduto' value={images.hortifruti} onChange={handleData} checked={data.tipoDoProduto === images.hortifruti} />Horti-Fruti
              </span>
              <span>
                <input type="radio" name='tipoDoProduto' value={images.bazar} onChange={handleData} checked={data.tipoDoProduto === images.bazar} />Bazar
              </span>
              <span>
                <input type="radio" name='tipoDoProduto' value={images.acougue} onChange={handleData} checked={data.tipoDoProduto === images.acougue} />Açougue
              </span>
              <span>
                <input type="radio" name='tipoDoProduto' value={images.frios} onChange={handleData} checked={data.tipoDoProduto === images.frios} />Frios
              </span>
            </div>
            <div className="button-salvar">
              <input type="submit" value='Salvar' disabled={carregarBarra() !== 200} />
            </div>
            
            </form>
          </Modal>

      </div>
  )
}

export default ModalProduto