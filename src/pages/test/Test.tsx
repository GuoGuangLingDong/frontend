import { useEffect } from "react";
import api from "../../api/index";
import "./style.css";

export const Test = () => {
  // const [value,setValue] = useState([])

  const getinit = async () => {
    let res = await api.register()
    console.log(res.data,'*****');
    
  }
  const BtnLogin = ()=>{
    getinit()
  }
  useEffect(() => {
    getinit()
  }, [])

  return (
    <div>
      <button onClick={BtnLogin}>测试</button>
    </div>
  );
};