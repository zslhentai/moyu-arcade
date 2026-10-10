import {useState} from 'react';
import {readRecord,saveRecord} from './storage';
export function useRecord(id:string) {const [best,setBest]=useState(()=>readRecord(id));const [failed,setFailed]=useState(false);return {best,failed,record:(value:number)=>{if(value>best){setBest(value);setFailed(!saveRecord(id,value));}}};}
