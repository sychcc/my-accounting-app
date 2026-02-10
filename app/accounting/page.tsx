'use client';
import { useState,useEffect } from "react";
import {auth,db} from "@/app/firebase/firebase"
import { onAuthStateChanged,User} from "firebase/auth";

//引入firestore的工具
import { collection, addDoc, query, where, onSnapshot, orderBy, deleteDoc, doc,serverTimestamp} from "firebase/firestore";
import Form from "./components/Form"
import List from "./components/List"
import Link from "next/link"


export interface RecordItem{
    //id 通常是字串（例如 N5xrXCb...）不是數字
    id:string,
    category:string,
    amount:number,
    note:string
}

export default function AccountingPage(){
    //這裡放使用者資訊
    const [user,setUser]=useState<User|null>(null)
    //這裡放list狀態，再傳給List.tsx去顯示
    //放RecordItem的array, 初始值是empty array
    const [list,setList]=useState<RecordItem[]>([])
  
    //監聽登入狀態
    useEffect(() => {
        // 監聽登入狀態
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                
                //登入成功 設定資料庫即時監聽
                const q = query(
                    collection(db, "records"),
                    where("uid", "==", currentUser.uid), //只抓自己的資料
                    orderBy("createdAt", "desc") //按時間排序
                );

                // onSnapshot會在資料庫有變動時自動執行
                const unsubscribeData = onSnapshot(q, (snapshot) => {
                    const data = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as unknown as RecordItem[];
                    setList(data); // 更新React狀態，畫面會自動render
                });

                //組件卸載時取消監聽資料庫
                return () => unsubscribeData();
            } else {
                //沒登入就導回首頁
                window.location.href = "/";
            }
        });

        //組件卸載時取消監聽身分
        return () => unsubscribeAuth();
    }, []);



    //計算總金額 prev是累加金額 curr是當前資料
    const totalAmount=list.reduce((prev,curr)=>{
        if(curr.category==='Income'){
            return prev + curr.amount
        }else{
            return prev -curr.amount
        }
    },0)
    //新增處理
    async function handleAdd(data: any) {
        if (!user) return;
        
        try {
            // 直接推送到雲端，onSnapshot更新畫面
            await addDoc(collection(db, "records"), {
                uid: user.uid, //綁定 uid
                category: data.category,
                amount: Number(data.amount),
                note: data.note,
                createdAt: serverTimestamp() //Firebase伺服器時間
            });
        } catch (error) {
            console.error("新增到 Firestore 失敗:", error);
            alert("新增失敗，請檢查權限設定");
        }
    }
    //刪除處理
   async function handleDelete(id: string) {
        try {
            // 根據ID刪除雲端資料
            await deleteDoc(doc(db, "records", id));
        } catch (error) {
            console.error("從 Firestore 刪除失敗:", error);
            alert("刪除失敗");
        }
    }
   return (
  <div className="min-h-screen bg-gray-50 py-10 flex justify-center">
    <div className="w-full max-w-2xl bg-white border border-gray-300 p-8 shadow-sm">
     <p className="mb-4 text-center">您已經使用 <strong>{user?.email}</strong> 登入</p>
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