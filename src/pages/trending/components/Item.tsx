import { secondColor, textColor } from "../../../theme";
import { useNavigate } from "react-router-dom";
import { isMobile } from "../../../helpers/utilities";
import { LoadImage } from "../../../components/Image";

export const Item = ({ item, i }: { item: any, i: number }) => {
  const navigate = useNavigate();
  const mobile = isMobile();

  return (<div key={i} className={`bg-white transition duration-200 ease-in-out transform hover:-translate-y-3 ${item.isFalseData ? "opacity-0" : "rounded-md shadow-lg"}`}
    style={{
      width: mobile ? "100%" : 300,
      margin: mobile ? "10px 0" : `0px ${i % 3 === 2 ? "0px" : "30px"} 30px 0px`,
    }}>
    {!item.isFalseData && <><LoadImage url={item?.img}>
      <img src={item?.img} className="rounded-t-md w-full cursor-pointer" alt="" style={{ borderBottom: "0.6px solid #dfe4ea", height: mobile ? "auto" : 300 }}
        onClick={() => {
          !item.isFalseData && navigate(`/detail/${item?.id || i}`)
        }} />
    </LoadImage>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer">
            <img className="rounded-full mr-1 -mt-1 w-32 lg:w-8 md:z-50 z-0 hidden lg:block" src={"https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg"}
              alt="logo" />
            大白菜
          </div>
          8 days ago
        </div>
        <div className="h-16 mt-2" style={{ color: secondColor }}>
          <h1 className="mb-2 ellipsis-2 font-Poppins-Medium cursor-pointer" style={{ color: textColor, lineHeight: mobile ? "18px" : "20px", fontSize: mobile ? "16px" : "18px", fontWeight: "bold" }}
            onClick={() => {
              !item.isFalseData && navigate(`/starter/${item?.id || i}`)
            }}
          >{item?.title}</h1>
          <p className="text-sm">{item?.["Project Summary"]}</p>
        </div>
        <div className="text-xs flex items-center justify-between" style={{ color: secondColor }}>
          <div className="flex item-center"><svg viewBox="0 0 1058 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6741" width="16" height="16"><path d="M330.744242 885.372121l194.779798-129.861818 16.665859-11.106263h383.844848c36.486465 0 66.19798-29.659798 66.19798-66.146262v-529.19596c0-36.434747-29.711515-66.107475-66.19798-66.107475H132.305455c-36.486465 0-66.146263 29.659798-66.146263 66.107475v529.19596c0 36.486465 29.659798 66.146263 66.146263 66.146262h198.438787v140.968081m-66.146262 123.578182V810.550303H132.305455c-73.024646 0-132.305455-59.216162-132.305455-132.292525v-529.19596C0 76.024242 59.267879 16.808081 132.305455 16.808081h793.742222c73.076364 0 132.357172 59.216162 132.357171 132.240808v529.195959c0 73.076364-59.267879 132.292525-132.357171 132.292526h-363.830303L264.59798 1008.950303z m0 0" fill="#858891"></path></svg>
            &nbsp;123
          </div>

          <div className="flex item-center ml-2"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9550" width="16" height="16"><path d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z" fill="#858891"></path></svg>
            &nbsp;456
          </div>
        </div>
        <div className="flex justify-between items-center mt-2" style={{ color: secondColor }}>
          <div className=" text-white text-xs rounded-md" style={{ padding: "2px 4px", backgroundImage: "linear-gradient(to right, #1769fb, white)" }}>NFT</div>
          <div className="flex item-center text-xs cursor-pointer" onClick={() => {
            window.open(`https://twitter.com/intent/tweet?text=XXXXXXXXXXXXX`, "_blank")
          }}>
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M768.73106 703.537712c-35.606921 0-67.945574 14.793214-91.167479 38.359147l-309.109357-171.670082c9.116748-17.545439 14.621199-37.155048 14.621199-58.312783 0-12.55703-2.408198-24.426004-5.676466-35.950949l304.63699-189.215522c22.705863 20.469679 52.464304 33.198723 85.146985 33.198723 70.525785 0 127.978498-57.452713 127.978498-127.978498S837.708718 63.989249 767.182933 63.989249s-127.978498 57.452713-127.978498 127.978498c0 14.621199 2.92424 28.382328 7.396607 41.455401L344.716278 420.746514c-23.049891-22.705863-54.700487-36.983034-89.791366-36.983034-70.525785 0-127.978498 57.452713-127.978498 127.978498s57.452713 127.978498 127.978498 127.978498c25.630102 0 49.540064-7.740635 69.493701-20.813707l321.150344 178.378633c-3.096254 11.008903-5.160423 22.18982-5.160423 34.058794 0 70.525785 57.452713 127.978498 127.978498 127.978498s127.978498-57.452713 127.978498-127.978498S839.256845 703.537712 768.73106 703.537712zM767.182933 127.978498c35.262893 0 63.989249 28.726356 63.989249 63.989249s-28.726356 63.989249-63.989249 63.989249-63.989249-28.726356-63.989249-63.989249S731.92004 127.978498 767.182933 127.978498zM191.107677 511.913993c0-35.262893 28.726356-63.989249 63.989249-63.989249s63.989249 28.726356 63.989249 63.989249-28.726356 63.989249-63.989249 63.989249S191.107677 547.176886 191.107677 511.913993zM768.73106 895.505459c-35.262893 0-63.989249-28.726356-63.989249-63.989249s28.726356-63.989249 63.989249-63.989249 63.989249 28.726356 63.989249 63.989249C832.720309 866.951117 803.993953 895.505459 768.73106 895.505459z" fill="#858891"></path></svg>
            &nbsp;<p style={{}}>Share</p>
          </div>
        </div>
      </div></>}
  </div>
  )
};