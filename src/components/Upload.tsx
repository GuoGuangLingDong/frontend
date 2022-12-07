import { useCallback, useState } from 'react'
import { CardBackground } from './Card';
import { useMessage } from './Message';
import camera from "../assets/image/camera.svg";

export const Upload = ({ width, height, onChange }: { width?: string | number, height?: string | number, onChange: (url: string) => void }) => {
    // 图片预览数据，接口接收的是url链接，所以在此之前还需要将图片数据上传到服务器，然后将返回的图片url赋值给 cover_img
    const [img, setImg] = useState<any>(null)
    const { message } = useMessage();
    const handleImage = (e: any) => {
        const file = e?.target?.files?.[0];
        if (!file?.size) return
        if (file?.size > 10 * 1024 * 1024) {
            message("图片尺寸太大！", "warn")
            return
        }

        const reads = new FileReader();
        reads.readAsDataURL(file as any);
        reads.onload = function (event) {
            let image = new Image();
            if (!event?.target?.result) return
            image.src = event?.target?.result as any;
            image.onload = function (e: any) {
                const w = e?.path?.[0]?.width;
                const h = e?.path?.[0]?.height;
                if (w > 0 && h > 0 && w === h) {
                    setImg(event?.target?.result);
                    uploadImage(file);
                } else {
                    message("图片高宽比应为1:1", "warn")
                }
            }
        };
    }

    const uploadImage = useCallback((file) => {
        console.log(file);

        //上传图片的逻辑
        // const data = 上传函数。。。。

        //拿到图片url后，赋值给cover_img
        // onChange(data)
    }, [onChange]);

    return (
        <CardBackground className="flex justify-center items-center mr-4 mt-0 p-0" style={{ minHeight: height, minWidth: width, maxHeight: height, maxWidth: width }}>
            <input type="file" className="h-0 w-0" name="image" id="image" onChange={handleImage} accept="image/png,image/jpg,image/gif" />
            <label htmlFor="image">
                <div>
                    {img ? <img src={img} className="rounded-3xl" style={{ width: width, height: height }} alt="" /> : <div className="text-center">
                        <img src={camera} alt="" className="m-auto" />
                        点击上传
                    </div>}
                </div>
            </label>
        </CardBackground>
    )
}