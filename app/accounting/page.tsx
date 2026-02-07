'use client';
import { useState } from "react";
import Form from "./components/Form"
import List from "./components/List"
import Link from "next/link"

export interface RecordItem{
    id:number,
    category:string,
    amount:number,
    note:string
}

export default function AccountingPage(){
    //這裡放list狀態，再傳給List.tsx去顯示
    //放RecordItem的array, 初始值是empty array
    const [list,setList]=useState<RecordItem[]>([])
    //計算總金額 prev是累加金額 curr是當前資料
    const totalAmount=list.reduce((prev,curr)=>{
        if(curr.category==='Income'){
            return prev + curr.amount
        }else{
            return prev -curr.amount
        }
    },0)
    //新增處理
    function handleAdd(data:any){
        //1. 接收Form傳來的新資料
        const record={
            id:Date.now(),
            ...data
        }
        //2. 資料更新到list(用setList)
        //react不能直接修改，所以先展開舊的list
        setList([...list,record])

    }
    //刪除處理
   function handleDelete(id:number){
    //用filter讓非刪除id的item留下來
    const newList=list.filter((item:any)=>item.id !==id)
    setList(newList)
   }
   return (
  <div className="min-h-screen bg-gray-50 py-10 flex justify-center">
    <div className="w-full max-w-2xl bg-white border border-gray-300 p-8 shadow-sm">
      <Form onAdd={handleAdd} />
      <hr className="my-6 border-gray-200" />
      <List items={list} onDelete={handleDelete} />
      <div className="mt-8 flex flex-col items-center gap-4"> 
     
        <span className="font-bold text-lg">小計：{totalAmount}</span>
        <Link href='/'>
            <button className="border border-gray-300 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                返回首頁
            </button>
        
        </Link>
        
      </div>
      
    </div>
  </div>
);
}