import { useNavigate, useParams } from "react-router-dom";
import { BodyBox } from "../../components/BodyBox";
import { secondColor } from "../../theme";
import { useEffect, useState } from "react";
import { isMobile } from "../../helpers/utilities";
import { LoadImage } from "../../components/Image";

export const AnimatePulse = ({ loading }: { loading?: boolean }) => {
  return (
    loading ? <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-400 rounded"></div>
        <div className="h-4 bg-gray-400 rounded"></div>
        <div className="h-4 bg-gray-400 rounded"></div>
        <div className="h-4 bg-gray-400 rounded"></div>
      </div>
    </div> : null
  )
}

export const Detail = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [details, setDetails] = useState<any | undefined>();
  const mobile = isMobile();

  useEffect(() => {
    const id = (param as any)?.id;
    if (!id) return
    setDetails({})
    // try {
    //   fetch(`./${id}.json?t=${new Date().getTime()}`).then(res => {
    //     if (res?.ok) {
    //       res?.json()?.then((r: any) => {
    //         setDetails(r);
    //       })
    //     } else {
    //       setDetails(undefined)
    //     }
    //   })
    // } catch (error) {
    // }
  }, [param])

  const bgClass = "w-40 bg-gray-400 rounded-full text-white h-8 ml-4";

  const tabs = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.5qeXTMHs3pvLv4Bh9EtMigAAAA%26pid%3DApi&f=1&ipt=b231b26591a05feb9b505f1ad3f7f7c19afaa8759dc35f5fb7b263eb14c246a2&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql85M6yQTO7A_EhXvJYlYwHaHa%26pid%3DApi&f=1&ipt=f47527d1e54aca19b58d9c2a5bc259742fd7487d0d5a11f11f498a1c02a8aa13&ipo=images"];
  const [select, setSelect] = useState(0);

  return (
    <BodyBox css={{ marginBottom: 50 }}>
      {details ? <>
        <div className="flex justify-between rounded-full bg-white px-4 items-center h-12">
          <div className="cursor-pointer flex items-center font-bold w-48 text-sm" style={{ color: secondColor }} onClick={() => { navigate(-1) }}>
            {"Back"?.toUpperCase()}
          </div>
          <div className="text-sm">
            <button className={bgClass} style={{ backgroundImage: "linear-gradient(to right, #1769fb, #1301f1)" }}>Rent</button>
            <button className={bgClass} style={{ backgroundImage: "linear-gradient(to right, #e129b9, #b526ba)" }}>Collect</button></div>
        </div>
        <div className="m-auto pt-10" style={{ width: mobile ? "100%" : 500 }}>
          <LoadImage url={tabs[select]}>
            <img src={tabs[select]} alt="" className="w-full shadow-md rounded-md" />
          </LoadImage>
          <div className="flex justify-center mt-3">
            {tabs.map((item: any, i: number) => {
              return (
                <img key={i} src={item} className="w-10 h-10 rounded-md m-1 cursor-pointer border-2" style={{
                  boxShadow: select === i ? "2px 2px 5px #1769fb, -2px -2px 5px #1769fb, -2px 2px 5px #1769fb, 2px -2px 5px #1769fb" : "none"
                }} alt="" onClick={() => {
                  setSelect(i)
                }} />
              )
            })}</div>
        </div>
        <div className="flex items-center cursor-pointer mt-10">
          <img className="rounded-full mr-1 w-32 lg:w-10 md:z-50 z-0 hidden lg:block" src={"https://0.soompi.io/wp-content/uploads/2018/04/20170556/IU-140x140.jpg"}
            alt="logo" />
          <div>
            <div>Leo</div>
            <div className="text-sm">2022-08-10 23:22:22</div>
          </div>
        </div>
        <div className="flex flex-wrap mt-6">
          <h1 className="text-lg sm:text-xl">What Is An NFT? Non-Fungible Tokens Explained</h1>
          <div className="flex flex-wrap" style={{ color: secondColor }} dangerouslySetInnerHTML={{
            __html: `An NFT is a digital asset that can come in the form of art, music, in-game items, videos, and more. They are bought and sold online, frequently with cryptocurrency, and they are generally encoded with the same underlying software as many cryptos.

Although they’ve been around since 2014, NFTs are gaining notoriety now because they are becoming an increasingly popular way to buy and sell digital artwork. The market for NFTs was worth a staggering $41 billion in 2021 alone, an amount that is approaching the total value of the entire global fine art market.

NFTs are also generally one of a kind, or at least one of a very limited run, and have unique identifying codes. “Essentially, NFTs create digital scarcity,” says Arry Yu, chair of the Washington Technology Industry Association Cascadia Blockchain Council and managing director of Yellow Umbrella Ventures.

This stands in stark contrast to most digital creations, which are almost always infinite in supply. Hypothetically, cutting off the supply should raise the value of a given asset, assuming it’s in demand.` as any
          }} />

        </div>
      </> : <div className="pt-40">
        <AnimatePulse loading={!details} />
      </div>}
    </BodyBox>
  );
};