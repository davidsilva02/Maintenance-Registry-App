import React, { Component, useState, useEffect } from 'react';
import Header from './header';
import axios from 'axios'
import './home.css'


class TableSF extends Component{
    constructor(props) {
        super(props);
        this.state = {
          SF: [[]],
        }
    }

    async componentWillMount() {
        let url="http://127.0.0.1:8000/specific-function"
        let payload = await new Promise((resolve,reject)=>{
            axios.get(url)
            .then(response=>{resolve({success:"yes",data:response['data']})})
            .catch(error=>{reject({success:"no",error:error})});
        })

        this.setState({SF:payload.data})
        console.log(payload.data)

    }

    async delete(id){
        let text;
        if (window.confirm("Deseja eliminar a função específica?") === true) {
            let url=`http://127.0.0.1:8000/specific-function/${id}`
            let payload = await new Promise((resolve,reject)=>{
                axios.delete(url)
                .then(response=>{resolve({success:"yes",data:response['data']})})
                .catch(error=>{reject({success:"no",error:error})});
            })
            
    
            url="http://127.0.0.1:8000/specific-function"
            payload = await new Promise((resolve,reject)=>{
                axios.get(url)
                .then(response=>{resolve({success:"yes",data:response['data']})})
                .catch(error=>{reject({success:"no",error:error})});
            })

            let sf_data = payload.data
            sf_data.map(item => {
                item.SFDescription=item.SFDescription.replace('\n','<br>');
            });

            this.setState({SF:sf_data})
            console.log(payload.data)
        }
    }


    async refresh(){
        let url="http://127.0.0.1:8000/specific-function"
        let payload = await new Promise((resolve,reject)=>{
            axios.get(url)
            .then(response=>{resolve({success:"yes",data:response['data']})})
            .catch(error=>{reject({success:"no",error:error})});
        })

        this.setState({SF:payload.data})
        console.log(payload.data)
    }

    render(){
        return<>

        <div className='buttons-menu'>
        <button><a href='/add-specific-function'>Adicionar uma função específica</a></button>
        <button onClick={()=>this.refresh()}>Refresh</button>
        </div>

        <div className='table-content'>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Descrição</th>
                    <th>Editar</th>
                    <th>Delete</th>
                    <th>Imprimir</th>

                </tr>
                {
                    this.state.SF.map(item=>(
                        <tr>
                            <td>{item.SFId}</td>
                            <td>{item.SFTitle}</td>
                            <td className='description'>{item.SFDescription}</td>
                            <td><button onClick={() => window.location.href=`/edit-specific-function/${item.SFId}`}>✏️</button></td>
                            <td><button onClick={() => this.delete(item.SFId)}>❌</button></td>
                            <td><button onClick={() => {window.open(`http://127.0.0.1:8000/specific-function/print/${item.SFId}`,'_blank')}}>🖨️</button></td>
                        </tr>
                    ))
                }
                </table>
            </div>
        </>
    }
}

class SpecificFunctions extends React.Component {
    render(){
        return<>
        <Header/>
        <TableSF/>
        </>
    }
}

export default SpecificFunctions;