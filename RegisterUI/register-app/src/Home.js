import React, { Component, useState, useEffect } from 'react';
import Header from './header';
import axios from 'axios'
import './home.css'
class TableRegists extends Component{
    constructor(props) {
        super(props);
        this.state = {
          regists: [[]],
        }
    }

    async componentWillMount() {
        let url="http://127.0.0.1:8000/register"
        let payload = await new Promise((resolve,reject)=>{
            axios.get(url)
            .then(response=>{resolve({success:"yes",data:response['data']})})
            .catch(error=>{reject({success:"no",error:error})});
        })

        this.setState({regists:payload.data})
        console.log(payload.data)

    }

    async delete(id){
        let text;
        if (window.confirm("Deseja eliminar o registo?") === true) {
            let url=`http://127.0.0.1:8000/register/${id}`
            let payload = await new Promise((resolve,reject)=>{
                axios.delete(url)
                .then(response=>{resolve({success:"yes",data:response['data']})})
                .catch(error=>{reject({success:"no",error:error})});
            })
            
    
            url="http://127.0.0.1:8000/register"
            payload = await new Promise((resolve,reject)=>{
                axios.get(url)
                .then(response=>{resolve({success:"yes",data:response['data']})})
                .catch(error=>{reject({success:"no",error:error})});
            })

            let regists_data = payload.data
            regists_data.map(item => {
                item.RegisterObservations=item.RegisterObservations.replace('\n','<br>');
            });

            this.setState({regists:regists_data})
            console.log(payload.data)
        }
    }

    async edit(id){
        console.log("EDIT REGISTRY");
    }

    async refresh(){
        let url="http://127.0.0.1:8000/register"
        let payload = await new Promise((resolve,reject)=>{
            axios.get(url)
            .then(response=>{resolve({success:"yes",data:response['data']})})
            .catch(error=>{reject({success:"no",error:error})});
        })

        this.setState({regists:payload.data})
        console.log(payload.data)
    }

    async adicionar_pedido(){
        
    }


    

    render(){
        return<>

        <div className='buttons-menu'>
        <button><a href='/add-registo'>Adicionar Registo</a></button>
        <button onClick={()=>this.refresh()}>Refresh</button>
        </div>

        <div className='table-content'>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Backup?</th>
                    <th>Observações</th>
                    <th>Editar</th>
                    <th>Delete</th>
                    <th>Imprimir</th>

                </tr>
                {
                    this.state.regists.map(item=>(
                        <tr>
                            <td>{item.RegisterId}</td>
                            <td>{item.RegisterDate}</td>
                            {!item.RegisterBackup && <td>❌</td>}
                            {item.RegisterBackup && <td>✅</td>}
                            <td>{item.RegisterObservations}</td>
                            <td><button onClick={() => window.location.href=`/edit-registo/${item.RegisterId}`}>✏️</button></td>
                            <td><button onClick={() => this.delete(item.RegisterId)}>❌</button></td>
                            <td><button onClick={() => window.open.href=`http://127.0.0.1:8000/register/print/${item.RegisterId}`}>🖨️</button></td>

                        </tr>
                    ))
                }
                </table>
            </div>
        </>
    }
}


class Home extends React.Component {
    render(){
        return<>
        <Header/>
        <TableRegists/>
        </>
    }
}

export default Home;