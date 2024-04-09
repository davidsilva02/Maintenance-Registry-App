import React, { Component, useState, useEffect } from 'react';
import Header from './header';
import axios from 'axios'
import './home.css'
import { redirect } from 'react-router-dom';
class Add extends Component{
    constructor(props) {
        super(props);
        this.state = {
            'title':'',
            'description':'',
            'print':false,
            'isChecklistEnabled':false
        }
    }


    handleToggleChecklist = () => {
        this.setState({isChecklistEnabled:!this.state.isChecklistEnabled});

        if(this.state.isChecklistEnabled===true) this.setState({description:this.state.description + '\n-'});

      };
    
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          if (this.state.isChecklistEnabled) {
            this.setState({description:this.state.description + '\n-'});
          } else {
            this.setState({description:this.state.description + '\n'});
          }
          event.preventDefault(); // Impede que o Enter insira uma nova linha
        }
      };

    async add_funcao(state){
        
        let url='http://127.0.0.1:8000/specific-function'
        let id=""; 
        let payload=await new Promise((resolve,reject)=>{
            axios.post(url,{
                'SFTitle':state.title,
                'SFDescription':state.description
            })
            .then(response=>{
                resolve({success:"yes",data:response['data']});
                id=response['data']['SFId'];

                if (state.print===true) {
                    async function copyOperation(text) {
                        await navigator.clipboard.writeText(text)
                        console.log('Copy Success!')
                    }
                    
                    
                    setTimeout(() => { copyOperation(`ID:${id}\n}\nTitle:${state.title}\nDescription:${state.description}\n`);
                    window.location.href='http://localhost:3000'}, 1000)
                    
                    window.open(`http://127.0.0.1:8000/specific-function/print/${id}`)
                }
                window.location.href='http://localhost:3000'
            })
            .catch(error=>{reject({success:"no",error:error})});
        })
    }

    handleTitle = event => {
        this.setState({title: event.target.value})
    }

    handleDescription = event => {
        this.setState({description: event.target.value})
    }

    handlePrint = event => {
        this.setState({print: event.target.checked})
    }

    
    

    render(){
        return<>
        <div>
            <h2>Adicionar Função Especifica</h2>
            <button onClick={this.handleToggleChecklist}>
                {this.state.isChecklistEnabled ? "Desativar Checklist" : "Ativar Checklist"}
                </button>
            <form>
                <div className='form-camp'>
                    <p>Title</p>
                    <input maxLength={2048} value={this.state.title} onChange={this.handleTitle}></input>
                </div>

                <div className='form-camp'>
                    <p>Description</p>
                    <textarea maxLength={5000} value={this.state.description} onChange={this.handleDescription}  onKeyPress={this.handleKeyPress}></textarea>
                </div>
            </form>
            <label>Imprimir Função </label>
            <input type='checkbox' checked={this.state.print} onChange={this.handlePrint}/><br/>
            <button onClick={()=>this.add_funcao(this.state)}>Adicionar Função</button>
        </div>
        </>
    }
}


class AddSpecificFunction extends React.Component {
    render(){
        return<>
        <Header/>
        <Add></Add>
        </>
    }
}

export default AddSpecificFunction;