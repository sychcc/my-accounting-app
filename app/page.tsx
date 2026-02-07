//引入next.js內的頁面跳轉工具
import Link from "next/link"

export default function Home() {
  return (
    
    <div className='min-h-screen flex flex-col'>
      <header className='bg-slate-800 text-white text-3xl font-bold w-full text-center p-10'>React練習專案</header>
      <div className="bg-blue-100 w-full p-50">
        <div className='text-2xl text-gray-700 text-center'>歡迎光臨我的頁面</div>
      </div>
      <div className='w-full flex flex-col items-center p-10'>
        <Link  href='/accounting'>
          <button className='border border-gray-400 px-8 py-2 bg-gray-200'>點此開始</button>
        </Link>
        </div>
    </div>
  
  );
}
