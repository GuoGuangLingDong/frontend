import { Dispatch, Fragment, SetStateAction } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ArrowImg } from './Header'
import { secondColor, thirdColor } from '../theme'

export const Select = ({ list, setSelectCoin, selectCoin }: { list: any[], setSelectCoin: Dispatch<SetStateAction<number>>, selectCoin: number }) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center items-center rounded-md h-10 px-2 sm:px-4 text-sm font-bold bg-white" style={{ color: secondColor, borderColor: thirdColor }}>
                    <div className='w-20 sm:w-40 mt-1'>{selectCoin ? list[selectCoin].label : "Most Popular"}</div><ArrowImg css={`ml-3 rotate-90 translate scale-75 mt-1`} />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 sm:w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {list?.map((item: any, index: number) => {
                        return (
                            <Menu.Item key={index}>
                                <div
                                    onClick={() => {
                                        setSelectCoin(index)
                                    }}
                                    className={`text-gray-700 font-bold px-4 text-sm h-8 cursor-pointer overflow-hidden flex justify-between items-center pt-1 ${index === 0 ? "" : "border-t"} select-coin`}
                                    style={{ backgroundColor: index === selectCoin ? "#DFE4EA" : "" }}
                                >
                                    <div>{item?.label}</div>
                                </div>
                            </Menu.Item>
                        )
                    })}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
