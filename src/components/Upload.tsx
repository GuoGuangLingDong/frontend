import { useCallback, useState } from 'react'
import { CardBackground } from './Card';
import { useMessage } from './Message';
import camera from "../assets/image/camera.svg";
import { useRequest } from '../hooks/useRequest';
import api from "../api/index";
import axios from 'axios';

export const Upload = ({ width, height, onChange, src, closeLoading, openLoading }: {
    width?: string | number, height?: string | number, src?: string, closeLoading: () => void, openLoading: () => void,
    onChange: (url: string) => void
}) => {
    // 图片预览数据，接口接收的是url链接，所以在此之前还需要将图片数据上传到服务器，然后将返回的图片url赋值给 cover_img
    const [img, setImg] = useState<any>(null)
    const { message } = useMessage();
    const [, getToken] = useRequest(api.getToken)
    const handleImage = (e: any) => {
        const file = e?.target?.files?.[0];
        if (!file?.size) return
        if (file?.size > 10 * 1024 * 1024) {
            message("图片尺寸太大！", "warn")
            return
        }
        if (file?.type?.includes("jpg") || file?.type?.includes("jpeg") || file?.type?.includes("png") || file?.type?.includes("gif")) {
            const reads = new FileReader();
            reads.readAsDataURL(file as any);
            reads.onload = function (event) {
                let image = new Image();
                if (!event?.target?.result) return
                image.src = event?.target?.result as any;
                image.onload = function (e: any) {
                    let w = e?.path?.[0]?.width || e?.target?.width;
                    let h = e?.path?.[0]?.height || e?.target?.height;
                    // if (w > 0 && h > 0 && w === h) {
                    if (w > 0 && h > 0) {
                        setImg(event?.target?.result);
                        uploadImage(file);
                    }
                }
            };
        } else {
            message("请上传jpg,jpeg,png,gif格式的文件", "warn")
            return
        }
    }

    const uploadImage = useCallback(async (file) => {
        openLoading()
        const data = await getToken({ name: file?.name })

        const formData = new FormData()
        formData.append('token', data.token)
        formData.append('key', data.uploadKey);
        formData.append('file', file);

        const response = await axios("https://up-z2.qiniup.com/", {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        });

        if (response.data.key) {
            closeLoading();
            onChange(`${data.cdn}${response.data.key}`)
        } else {
            closeLoading();
            message("上传失败，请重新上传！", 'error')
        }
    }, [onChange, closeLoading, openLoading, getToken, message]);

    return (
        <CardBackground className="flex justify-center items-center mr-4 mt-0 p-0" style={{ minHeight: height, minWidth: width, maxHeight: height, maxWidth: width }}>
            <input type="file" className="h-0 w-0" name="image" id="image" onChange={handleImage} />
            <label htmlFor="image">
                <div>
                    {img ? <img src={img} className="rounded-3xl" style={{ width: width, height: height }} alt="" /> : (
                        src ? <img src={src} className="rounded-3xl" style={{ width: width, height: height }} alt="" /> :
                            <div className="text-center">
                                <img src={camera} alt="" className="m-auto" />
                                点击上传
                            </div>)}
                </div>
            </label>
        </CardBackground >
    )
}
