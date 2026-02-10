'use client'
//靜態跳轉用Link,程式話跳轉用useRouter
import Link from 'next/link'
//引入useState 因為要記錄email & password 還有使用者登入狀態才可以傳給firebase
import {useState,useEffect} from "react"
// firebase
import { onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/app/firebase/firebase'
import { User } from 'firebase/auth'


export default function Home() {
  const [loginEmail,setLoginEmail]=useState('')
  const [loginPassword,setLoginPassword]=useState('')

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
 
  const [currentUser,setCurrentUser]=useState<User|null>(null)

  //監聽登入狀態切換
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(user:any)=>{setCurrentUser(user)})
    return()=>unsubscribe()
  },[])
  //登入邏輯
  async function handleLogin(){
    try{
      let response=await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
      setLoginEmail("")
      setLoginPassword("")
      console.log(response)
      return response
    }catch(error:any){
      setLoginEmail("")
      setLoginPassword("")
      console.error('登入失敗',error.message)
      alert('登入失敗，請檢查帳號密碼')
    }
  }
  //註冊邏輯
  async function handleRegister(){
    try{
      let response=await createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
      setRegisterEmail("")
      setRegisterPassword("")
      console.log(response)
      alert('註冊成功')
      //避免用新帳號登入
      auth.signOut()
      return response
      
    }catch(error:any){
      setRegisterEmail("")
      setRegisterPassword("")
      console.error("註冊出錯:", error.message)
      alert('註冊失敗'+error.message)

    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center'>
      <header className='w-full bg-slate-800 text-white p-10 text-center text-3xl font-bold'>React 練習專案</header>
      
      <div className="flex flex-col md:flex-row gap-20 p-10">
        
        {/*根據登入狀態切換內容 */}
        <div className="w-64">
          {!currentUser ? (
            // 未登入：顯示登入系統
            <div>
              <h3 className="text-xl font-bold mb-4">登入系統</h3>
              <p>電郵 <input value={loginEmail}type="email" className="border" onChange={(e) => setLoginEmail(e.target.value)} /></p>
              <p>密碼 <input value={loginPassword}type="password" className="border" onChange={(e) => setLoginPassword(e.target.value)} /></p>
              <button onClick={handleLogin} className="mt-2 bg-gray-200 px-4">登入</button>
            </div>
          ) : (
            // 已經登入：顯示用戶資訊與進入按鈕
            <div className="text-center">
              <p className="mb-4">您已經使用 <strong>{currentUser.email}</strong> 登入</p>
              <div className="flex gap-2 justify-center">
                <Link href='/accounting'>
                  <button className="bg-gray-200 px-4 py-1 border">立刻開始</button>
                </Link>
                <button onClick={() => auth.signOut()} className="bg-gray-200 px-4 py-1 border">登出</button>
              </div>
            </div>
          )}
        </div>

        {/* 註冊帳戶 (無論登入沒登入都顯示) */}
        <div className="w-64">
          <h3 className="text-xl font-bold mb-4">註冊帳戶</h3>
          <p>電郵 <input type="email" className="border" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} /></p>
          <p>密碼 <input type="password" className="border" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} /></p>
          <button onClick={handleRegister} className="mt-2 bg-gray-200 px-4">註冊</button>
        </div>

      </div>
    </div>
  );
}


  





 