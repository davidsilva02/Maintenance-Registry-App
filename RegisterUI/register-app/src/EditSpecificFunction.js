import { useParams } from 'react-router-dom'

import React, { Component, useState, useEffect } from 'react';
import Header from './header';
import axios from 'axios'
import './home.css'

export default function EditSF() {
    const { id } = useParams();
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");

    
    const editar_SF=()=>{
        console.log(`${id}`)
        let url='http://127.0.0.1:8000/specific-function'
        new Promise((resolve,reject)=>{
            axios.put(url,{
                'SFId':id,
                'SFTitle':title,
                'SFDescription':description
            })
            .then(response=>{
                window.location.href='http://localhost:3000/specific-function'

            })
            .catch(error=>{reject({success:"no",error:error})});
        })
    }


    useEffect(()=>{
        //get question id
            let url=`http://127.0.0.1:8000/specific-function/${id}`
            let payload =new Promise((resolve,reject)=>{
            axios.get(url)
            .then(response=>{
               let data=response['data']
               setTitle(data.SFTitle)
               setDescription(data.SFDescription)
            }
            )
            .catch(error=>{reject({success:"no",error:error})});
        })

        console.log(payload)
        }
    ,[id])


    return (
      <div>
        <Header/>
     
        <form>
                <div className='form-camp'>
                    <p>Title</p>
                    <input maxLength={2048} value={title} onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                <div className='form-camp'>
                    <p>Description</p>
                    <textarea maxLength={5000} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
            </form>
            <button onClick={()=>editar_SF()}>Editar Função</button>
      </div>
    );
  }
