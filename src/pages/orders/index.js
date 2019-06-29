import React, { useState, useEffect } from "react";
import NavBar from "components/NavBar";
import api from "api";
// import pizza from 'images/Pizzas/1.png'
import moment from "moment"
import 'moment/locale/pt-br'

moment.locale('pt-br')

const Orders = ({ user, token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/orders').then(({data}) => {
      setOrders(data.sort((a, b) => moment(b.order_date) - moment(a.order_date)))
      setLoading(false)
    })
  }, [])

  console.log('orders', orders)
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="columns">
          <div className="column col-8 col-mx-auto p-2 mt-2">
            <strong>Últimos pedidos</strong>
            <br/>

            {loading && 'Carregando...'}

            {
              orders.map(order =>
              <div
                key={order.id}
                className="card mt-2"
                style={{
                  border: 0,
                  boxShadow: "0 0.25rem 1rem rgba(48,55,66,.15)"
                }}
              >
                <div className="card-header">
                  <div className="card-title h6">
                    Pedido <strong>#{order.id}</strong> - {order.user.name}
                  </div>
                  {/* há 2 segundos */}
                  <small className="card-subtitle text-gray">{moment(order.order_date).fromNow()}</small> <br />
                  <strong className="card-subtitle text-dark">R${order.total}</strong>
                </div>

                <div className="card-body">
                  <div className="divider"></div>
                  <div className="columns">
                    {
                      order.products.map(product =>
                      <div key={product.id} className="column col-6">
                        <div className="tile p-2" style={{ border: '1px solid #f1f2f6' }}>
                          <div className="tile-icon">
                            <div className="">
                              {/* <i className="icon icon-file centered" /> */}
                              <img className="centered" src={product.photo_url} alt={product.description} width={60} />
                            </div>
                          </div>
                          <div className="tile-content">
                            <div className="tile-title">{product.description}</div>
                            <small className="tile-subtitle">Tamanho: Média</small>
                          </div>
                        </div>
                      </div>
                      )
                    }
                  </div>

                  <div className="divider"></div>
                </div>

                <div className="card-footer">
                  <strong>Observações: </strong>
                  {order.observation}
                </div>
              </div>

              )
            }

          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
