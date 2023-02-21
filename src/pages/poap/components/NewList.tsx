import { useNavigate } from "react-router-dom";
import { LoadImage } from "../../../components/Image";
import { useCallback } from "react";
import { isMobile } from "../../../helpers/utilities";
import { IDIVProps } from "./ListItem";
import { IPoap } from "..";
import { BodyBox } from "../../../components/BodyBox";
import { ScrollBox } from "../../../components/ScrollBox";

export const useGoDetails = () => {
  const navigate = useNavigate();
  const mobile = isMobile();

  return useCallback((poapId: string) => {
    if (mobile) {
      navigate(`/detail/${poapId}`)
    } else {
      navigate(`/detail/${poapId}`)
      // window.open(`/#/detail/${poapId}`, "_blank")
    }
  }, [navigate, mobile])
}

export const NewListItem = ({ item, ...props }: { item: any } & IDIVProps) => {
  const mobile = isMobile();
  const goDetails = useGoDetails();

  return (<div className="relative h-60 md:h-72 rounded-lg border border-black bg-transparent p-6 mb-6 md:mb-0" style={{ borderWidth: 1, width: mobile ? "48%" : 220, ...props?.style }} onClick={() => {
    goDetails(item?.poapId)
  }}>
    <div className="rounded-lg absolute left-2 right-2 -bottom-2 h-full pt-4" style={{ backgroundColor: "rgba(243, 209, 209, 0.49)" }}>
      <LoadImage
        src={item?.coverImg}
        className="rounded-lg cursor-pointer w-32 h-32 md:h-40 md:w-40 m-auto"
      />
      <div className="text-xs mt-8 md:mt-12 flex justify-center items-center text-center font-bold">
        {item.poapName}
      </div>
    </div>
  </div>
  )
};

export const PoapList = ({ data }: { data: IPoap[] }) => {
  return (<BodyBox css={{ paddingBottom: 20 }}>
    <ScrollBox data={data} isShowBar rowCount={4}>
      <div className={`flex m-auto mt-6 pb-0 md:pb-8 flex-wrap md:flex-nowrap justify-center`} style={{ width: data?.length * 260 - 40 }}>
        {data?.map((item, i) => {
          return (<NewListItem
            key={i}
            item={item}
            style={{
              marginLeft: i !== 0 ? 40 : 0,
            }} />)
        })}
      </div>
    </ScrollBox>
  </BodyBox>
  );
};