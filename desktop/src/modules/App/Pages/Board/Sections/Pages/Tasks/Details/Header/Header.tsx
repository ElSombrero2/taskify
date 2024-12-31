import { useBoard } from "@/store/board/board";

export const Header = ({onClickExit, path}: {onClickExit?: () => void, path: string}) => {
    const { path: root } = useBoard();
    
    return (
        <div className="w-full border-b flex items-center justify-between p-4 px-6">
            <div className="flex gap-2 items-center">
            <button className="text-lg" onClick={onClickExit}>
                <i className="fa fa-xmark"></i>
            </button>
            <span className="opacity-40">|</span>
            <div className="flex items-center gap-2">
                <strong>{path.replace(root?.substring(1) || '', '').substring(1)}</strong>
            </div>
            </div>

            <div className="flex gap-8 items-center">
            <button>
                <i className="fa-solid fa-share-nodes"></i>
            </button>

            <button>
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            </div>
        </div>
    )
}