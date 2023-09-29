import React, { Component, useState, useEffect } from 'react';
import Header from './header';
import axios from 'axios'
import './home.css'
import { redirect } from 'react-router-dom';
class Add extends Component{
    constructor(props) {
        super(props);
        this.state = {
            'maintenance_check':false,
            'observations':'',
            'print':false
        }
    }


    async add_pedido(state){
        
        let url='http://127.0.0.1:8000/register'
        let id=""; let date="";
        let payload=await new Promise((resolve,reject)=>{
            axios.post(url,{
                'RegisterBackup':state.maintenance_check,
                'RegisterObservations':state.observations
            })
            .then(response=>{
                resolve({success:"yes",data:response['data']});
                date=response['data']['RegisterDate'];
                id=response['data']['RegisterId'];

                if (state.print===true) {
                    async function copyOperation(text) {
                        await navigator.clipboard.writeText(text)
                        console.log('Copy Success!')
                    }
                    
                    
                    setTimeout(() => { copyOperation(`ID:${id}\nDate:${date}\nMaintenance Check:${state.maintenance_check}\nObservations:${state.observations}\n`);
                    window.location.href='http://localhost:3000'}, 1000)
                    
                    window.open(`http://127.0.0.1:8000/register/print/${id}`)
                }
                window.location.href='http://localhost:3000'
            })
            .catch(error=>{reject({success:"no",error:error})});
        })
    }

    handleMaintenanceCheck = event => {
        this.setState({maintenance_check: event.target.checked})
    }

    handleObservations = event => {
        this.setState({observations: event.target.value})
    }

    handlePrint = event => {
        this.setState({print: event.target.checked})
    }

    
    

    render(){
        return<>
        <div>
            <h2>Adicionar Registo</h2>
            <form>
                <div className='form-camp'>
                <label>Backup?</label>
                <input type='checkbox' checked={this.state.maintenance_check} onChange={this.handleMaintenanceCheck}/>
                </div>

                <div className='form-camp'>
                    <p>Observações</p>
                    <textarea maxLength={2048} value={this.state.observations} onChange={this.handleObservations}></textarea>
                </div>
            </form>
            <label>Imprimir Registo </label>
            <input type='checkbox' checked={this.state.print} onChange={this.handlePrint}/><br/>
            <button onClick={()=>this.add_pedido(this.state)}>Adicionar Registo</button>
        </div>
        </>
    }
}


class AddRegistry extends React.Component {
    render(){
        return<>
        <Header/>
        <Add></Add>
        </>
    }
}

export default AddRegistry;