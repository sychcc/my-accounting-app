//引入Record Item的規格
import { RecordItem } from "../page"
import {Button} from "./Form"

interface ListProps{
    //page給的清單
    items:RecordItem[],
    //需要id
    onDelete:(id:string)=>void
}

//接收page的list item, 還有delete功能
export default function List({items,onDelete}:ListProps){
    //處理刪除list item
    function handleDelete(id:string){
        onDelete(id)

    }
    return(
        <div>
            {items.map((item)=>(
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <span className={` w-24 text-lg ${item.category==="Income"?'text-green-600':"text-red-600"}`}>{item.category==='Income'?'+':"-"} {item.amount}</span>
                    <span className="flex-1 text-gray-700 ml-4">{item.note}</span>
                    <Button name="delete" onClick={()=>handleDelete(item.id)}/>
                </div>
            ))}
        </div>
    )
}