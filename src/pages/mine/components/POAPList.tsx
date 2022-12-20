import { useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/Button";
import { CardBackground } from "../../../components/Card";
import { LoadImage } from "../../../components/Image";
import { LoadPage } from "../../../components/LoadPage";
import { useRequest } from "../../../hooks/useRequest";
import { secondColor } from "../../../theme";
import { Holder, Star } from "../../poap/components/ListItem";
import api from "../../../api";
import { ellipseAddress } from "../../poap/components/PoapBaseInfo";

export const MinePOAPList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const params: any = useParams();
  const [, getUserInfoFun] = useRequest(api.getUserInfo);
  const [userInfo, setData] = useState<any[]>([]);

  const getUserInfo = useCallback(async (page: number) => {
    const data = await getUserInfoFun({
      uid: params.uid,
      from: page,
      count: 6
    });
    return data
  }, [getUserInfoFun, params.uid])

  return (<div className="flex mt-6 flex-wrap" ref={ref}>
    <LoadPage getList={getUserInfo} setData={setData} dataLength={userInfo?.length} id="poap_list" path="poap_list">
      {userInfo?.map((item: any, i: number) => {
        return (<CardBackground className="p-0 m-0 relative w-full md:w-96" key={i} onClick={() => {
          navigate(`/detail/${item?.poap_id}?minerID=${item?.minerUid}&minerIcon=${encodeURIComponent(item?.minerIcon)}&minerName=${encodeURIComponent(item?.minerName)}`)
        }}>
          <LoadImage
            src={item?.cover_img}
            className="rounded-t-3xl cursor-pointer h-96 w-full"
            style={{ padding: 2 }}
          />
          <div className="absolute px-3 pt-2 w-full top-0 left-0">
            <div className="rounded-full w-full h-12 flex items-center text-white text-sm" style={{
              background: "rgba(0,0,0,0.3)",
              padding: 2
            }}>
              <LoadImage
                className="rounded-full h-full mr-1 w-full"
                style={{ width: "calc(3rem - 4px)" }}
                src={item?.minerIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${item?.minerUid}`)
                }}
              />
              <div>
                <div>{ellipseAddress(item.minerName, 10)}</div>
                <div className="text-xs">{ellipseAddress(item.minerUid, 10)}</div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="text-sm flex justify-between items-center">
              <div>{item.poap_name}</div>
              <div>#{item.poap_id?.slice(0,6)}...{item.poap_id?.slice(-6)}</div>
            </div>
            <div className="text-sm flex items-center justify-between mt-2" style={{ color: secondColor }}>
              <div className="flex items-center">
                <Holder amount={item.holder_num} className="mr-4" />
                <Star amount={item.favour_number} />
              </div>
              {item?.collectable && <Button
                className="w-16 py-1 text-xs transform scale-75 origin-right"
              >
                限时领取
              </Button>}
            </div>
          </div>
        </CardBackground>)
      })}
    </LoadPage>
  </div>
  );
};