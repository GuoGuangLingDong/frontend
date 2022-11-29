import { bgColor, secondColor } from "../../../theme";
import { useNavigate } from "react-router-dom";
import { isMobile } from "../../../helpers/utilities";
import { LoadImage } from "../../../components/Image";
import { IPoap } from "./List";

export const Item = ({ item, i }: { item: IPoap, i: number }) => {
  const navigate = useNavigate();
  const mobile = isMobile();

  return (<div key={i}
    style={{
      width: mobile ? "50%" : 300,
      marginBottom: 20,
      paddingLeft: i % 2 === 0 ? "0px" : "5px",
      paddingRight: i % 2 === 1 ? "0px" : "5px",
    }}>
    <div className={`bg-white relative rounded-3xl shadow-lg`}>
      <div className="absolute px-3 pt-2 w-full">
        <div className="rounded-full w-full h-8 flex items-center text-white text-xs" style={{
          background: "rgba(0,0,0,0.3)",
          padding: 2
        }}>
          <img className="rounded-full h-full mr-1" src={"https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg"}
            alt="logo" />
          {item.miner}
        </div>
      </div>
      <LoadImage url={item?.cover_pic}>
        <img src={item?.cover_pic} className="rounded-3xl w-full cursor-pointer" alt="" style={{ height: mobile ? "auto" : 300, padding: 2 }}
          onClick={() => {
            navigate(`/detail/${item?.poap_id}`)
          }} />
      </LoadImage>
      <div className="flex items-center justify-between px-2 my-2 text-xs">
        <div className="text-xs transform scale-90 origin-left">
          {item.poap_name}
        </div>
        <div className=" text-white text-xs rounded-md transform scale-90 origin-right cursor-pointer" style={{ padding: "2px 4px", backgroundImage: "linear-gradient(to right, #1769fb, white)" }}
          onClick={() => {
            navigate(`/claim/${item?.poap_id || i}`)
          }}>限时领取</div>
      </div>
      <div className="text-xs flex items-center border-t h-10" style={{ color: secondColor }}>
        <div className="flex item-center justify-center cursor-pointer flex-1" onClick={() => {
          window.open(`https://twitter.com/intent/tweet?text=XXXXXXXXXXXXX`, "_blank")
        }}>
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M768.73106 703.537712c-35.606921 0-67.945574 14.793214-91.167479 38.359147l-309.109357-171.670082c9.116748-17.545439 14.621199-37.155048 14.621199-58.312783 0-12.55703-2.408198-24.426004-5.676466-35.950949l304.63699-189.215522c22.705863 20.469679 52.464304 33.198723 85.146985 33.198723 70.525785 0 127.978498-57.452713 127.978498-127.978498S837.708718 63.989249 767.182933 63.989249s-127.978498 57.452713-127.978498 127.978498c0 14.621199 2.92424 28.382328 7.396607 41.455401L344.716278 420.746514c-23.049891-22.705863-54.700487-36.983034-89.791366-36.983034-70.525785 0-127.978498 57.452713-127.978498 127.978498s57.452713 127.978498 127.978498 127.978498c25.630102 0 49.540064-7.740635 69.493701-20.813707l321.150344 178.378633c-3.096254 11.008903-5.160423 22.18982-5.160423 34.058794 0 70.525785 57.452713 127.978498 127.978498 127.978498s127.978498-57.452713 127.978498-127.978498S839.256845 703.537712 768.73106 703.537712zM767.182933 127.978498c35.262893 0 63.989249 28.726356 63.989249 63.989249s-28.726356 63.989249-63.989249 63.989249-63.989249-28.726356-63.989249-63.989249S731.92004 127.978498 767.182933 127.978498zM191.107677 511.913993c0-35.262893 28.726356-63.989249 63.989249-63.989249s63.989249 28.726356 63.989249 63.989249-28.726356 63.989249-63.989249 63.989249S191.107677 547.176886 191.107677 511.913993zM768.73106 895.505459c-35.262893 0-63.989249-28.726356-63.989249-63.989249s28.726356-63.989249 63.989249-63.989249 63.989249 28.726356 63.989249 63.989249C832.720309 866.951117 803.993953 895.505459 768.73106 895.505459z" fill="#858891">
            </path>
          </svg>&nbsp;
          <div>{item.favour_number || 0}</div>
        </div>
        <div style={{ width: 1, height: "100%", backgroundColor: bgColor }}></div>
        <div className="flex item-center justify-center cursor-pointer flex-1">
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9550" width="16" height="16">
            <path d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z" fill="#858891">
            </path>
          </svg>&nbsp;
          <div>{item.poap_number || 0}</div>
        </div>
      </div>
    </div>
  </div>
  )
};