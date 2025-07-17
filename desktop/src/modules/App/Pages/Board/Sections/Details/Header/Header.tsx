import { Info } from "@/types/task"

/*
    [TODO]: Remove a ticket
    The user can remove a ticket when he want
    and the comment must be removed from the code
    
    Add the remove option inside a dropdown on the ellipsis
    ![dropdown](https://cdn.dribbble.com/userupload/19998911/file/original-a5ee6e5e498e5d372239aedd5dc492df.jpg?resize=1024x768&vertical=center)
    #medium #improvement
*/
export const Header = ({onClickExit, info}: {onClickExit?: () => void, info?: Info}) => {
    const getFilename = (filename?: string) => {
        if (filename) {
            const splited = filename.split(
                navigator.userAgent.toLowerCase().includes('windows') ? '\\' : '/'
            );
            return splited[splited.length - 1];
        }
        return '';
    }
    
    return (
        <div className="w-full border-b flex items-center justify-between p-4 px-6">
            <div className="flex gap-4 items-center">
                <button type="button" className="text-lg" onClick={onClickExit}>
                    <i className="fa fa-xmark" />
                </button>
                <div>
                    <div title={info?.filename} className="flex items-center gap-2">
                        <strong>{getFilename(info?.filename)}</strong>
                        {' '}
                        <span className="text-sm opacity-40">
                            ({`lines: ${info?.start_line || 0}:${info?.end_line || 0}`})
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex gap-8 items-center">
                <button type="button">
                    <i className="fa-solid fa-ellipsis-vertical" />
                </button>
            </div>
        </div>
    )
}
