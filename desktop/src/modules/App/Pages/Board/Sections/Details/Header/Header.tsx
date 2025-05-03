import { Info } from "@/types/task"

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
                <button className="text-lg" onClick={onClickExit}>
                    <i className="fa fa-xmark"></i>
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
                <button>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>
        </div>
    )
}