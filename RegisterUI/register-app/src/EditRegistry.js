import { useParams } from 'react-router-dom'

import React, { Component, useState, useEffect } from 'react';
import Header from './header';
import axios from 'axios'
import './home.css'

export default function EditRegistry() {
    const { id } = useParams();
    const [maintenance_check,setMaintenanceCheck]=useState(false);
    const [observations,setObservations]=useState("");
    const [date,setDate]=useState("");

    const editar_registo=()=>{
        let url='http://127.0.0.1:8000/register'
        new Promise((resolve,reject)=>{
            axios.put(url,{
                'RegisterId':id,
                'RegisterDate':date,
                'RegisterBackup':maintenance_check,
                'RegisterObservations':observations
            })
            .then(response=>{
                window.location.href='http://localhost:3000'

            })
            .catch(error=>{reject({success:"no",error:error})});
        })
    }


    useEffect(()=>{
        //get question id
            let url=`http://127.0.0.1:8000/register/${id}`
            let payload =new Promise((resolve,reject)=>{
            axios.get(url)
            .then(response=>{
               let data=response['data']
               setMaintenanceCheck(data.RegisterBackup)
               setObservations(data.RegisterObservations)
               setDate(data.RegisterDate)
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
                <label>Data</label><br/>
                <input type='date' value={date}/>
                </div>
                <div className='form-camp'>
                <label>Manutenção?</label>
                <input type='checkbox' checked={maintenance_check} onChange={(e) => setMaintenanceCheck(e.target.checked)} />
                </div>
                
                <div className='form-camp'>
                    <p>Observações</p>
                    <textarea maxLength={2048} value={observations} onChange={(e) => setObservations(e.target.value)}></textarea>
                </div>
            </form>
            <button onClick={()=>editar_registo()}>Editar Registo</button>
      </div>
    );
  }
