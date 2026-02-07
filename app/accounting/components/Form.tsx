'use client';
import { useState } from "react"

export function Button({name,onClick}:{name:string ,onClick:()=>void}){
    return(
        <button onClick={onClick} className="border border-gray-400 px-4 py-2 bg-gray-100">{name}</button>
    )
}
//onAdd 將資料打包給page.tsx
export default function Form({onAdd}:{onAdd:(data:any)=>void}){
    const [category,setCategory]=useState('Expense');
    const [amount,setAmount]=useState(0)
    const [note,setNote]=useState("")

    function handleAdd(){
            console.log('You add new item.')
            const newItem={category,amount,note}
            onAdd(newItem)

    }
    return(
        <div className='flex p-6'>
            {/**下拉選單 */}
            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select>
            <input value={amount} type="number" placeholder="500" onChange={(e)=>setAmount(Number(e.target.value))} />
            <input value={note} type="text" placeholder="統一發票中獎" onChange={(e)=>setNote(e.target.value)} />
            <Button onClick={handleAdd} name='Add Item'/>
        </div>
    )
}