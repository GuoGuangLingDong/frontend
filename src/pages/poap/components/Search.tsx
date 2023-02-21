import { hearderIconCss } from "../../../components/Header";
import search from "../../../assets/image/search.svg";

export const Search = ({ searchValue, setSearchValue, searchFun, closeSearch }: {
    searchValue: any,
    setSearchValue: React.Dispatch<any>,
    searchFun: (pageNo: number) => Promise<void>,
    closeSearch: () => void
}) => {
    return (
        <div className="flex items-center fixed md:relative md:w-80 w-full h-16 md:h-10 rounded-3xl px-4 z-50 md:shadow-xl md:border">
            <input type="text" placeholder="请输入搜索内容" value={searchValue}
                className="bg-white outline-none rounded-l-3xl w-full pl-4 pr-2 py-2 h-10 md:h-8"
                onChange={(val) => {
                    setSearchValue(val.target.value);
                }}
            />
            <div className={`cursor-pointer w-8 bg-white flex items-center h-10 md:h-8 rounded-r-3xl`} onClick={() => {
                searchFun(0);
                closeSearch();
            }}>
                <img className={hearderIconCss} src={search} alt="logo" />
            </div>
        </div>
    )
}