import { useEffect } from "react";
import api from "../../api/index";
import "./style.css";

export const Test = () => {
  // const [value,setValue] = useState([])

  const getinit = async() =>{

   let res = await api.getshare()
   if(res.statusCode === 200){
     console.log(res,'测试成功');
   }else{
     console.log(res,'测试错误');
   }
    
  }

  useEffect(() => {
    getinit()
  }, [])

  return (
        <div>
            <h3>测试1234564646</h3>
        </div>
  );
};