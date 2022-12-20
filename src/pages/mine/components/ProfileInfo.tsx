import { useLocation, useNavigate } from "react-router-dom";
import { BodyBox } from "../../../components/BodyBox";
import { IUserInfo, useAuth } from "../../../components/UserAuth";
import { PersonBackground } from "../../auth/components/PersonBackground";
import person from "../../../assets/image/person.png"
import share from "../../../assets/image/share.svg"
import edit from "../../../assets/image/edit.svg"
import { useMemo } from "react";
import { isMobile } from "../../../helpers/utilities";

export const MineBaseInfo = ({ userInfo }: { userInfo: IUserInfo }) => {
    const mobile = isMobile();
    const w = 24;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { userInfo: info } = useAuth();
    const isUser = useMemo(() => info?.uid === userInfo?.uid && info?.uid, [info, userInfo]);
    return <>
        <PersonBackground image={person} className={pathname === "/share" ? "rounded-t-3xl" : "rounded-none"}>
            <div className="relative h-full">
                <div className="absolute flex justify-center items-center rounded-full" style={{
                    bottom: pathname === "/share" ? ( mobile ? "17%" : "-3%") : "-5%",
                    width: `${w}%`,
                    left: `calc(50% - ${w / 2}%)`
                }}>
                    <img className="w-24 rounded-full" src={userInfo?.avatar} alt="" />
                </div>

                {pathname !== "/share" && info?.uid === userInfo?.uid && isUser && <><div className="absolute flex justify-center items-center bg-white rounded-full cursor-pointer" style={{
                    bottom: "-14%",
                    width: mobile ? `14vw` : 60,
                    height: mobile ? `14vw` : 60,
                    left: mobile ? `6.5%` : "calc(50% - 500px)"
                }}
                    onClick={() => {
                        navigate(`/edit`)
                    }}
                >
                    <img src={edit} className="w-6 h-6" alt="" />
                </div>

                    <div className="absolute flex justify-center items-center bg-white rounded-full cursor-pointer"
                        style={{
                            bottom: "-14%",
                            width: mobile ? `14vw` : 60,
                            height: mobile ? `14vw` : 60,
                            right: mobile ? `6.5%` : "calc(50% - 500px)"
                        }}
                        onClick={() => {
                            navigate("/share")
                        }}
                    >
                        <img src={share} className="w-6 h-6" alt="" />
                    </div>
                </>}
            </div>
        </PersonBackground>
        <div className="text-center mt-4">
            <div className="font-bold text-2xl">{userInfo?.username}</div>
            <div style={{
                color: "#989CB3"
            }}>@{userInfo?.did}.did</div>
            <div className="font-bold text-sm">{userInfo?.introduction}</div>
        </div>

        <BodyBox>
            <div className="flex justify-between items-center my-4" style={{
                width: pathname === "/share" ? "24rem" : "100%"
            }}>
                <div className="flex-1 bg-white h-12 rounded-full mr-2 flex items-center justify-between px-6">
                    <div>Links</div>
                    <div>{userInfo?.follow_count || 0}</div>
                </div>
                <div className="flex-1 bg-white h-12 rounded-full ml-2 flex items-center justify-between px-6">
                    <div>NFT</div>
                    <div>{userInfo?.poap_count || 0}</div>
                </div>
            </div>
        </BodyBox>
    </>
}