import React from 'react'



const Header = ({data}) => {
  return (

    <div className="header">
        <h1>{data}</h1>
        <h4>Seu melhor carrinho de compras da internet</h4>
    </div>

  )
}

export default Header