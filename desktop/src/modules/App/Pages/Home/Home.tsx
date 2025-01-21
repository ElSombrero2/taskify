import { Button } from "@/ui/components/Buttons/Button/Button";
import { open } from "@tauri-apps/api/dialog"
import { useNavigate } from "react-router";

export const Home = () => {
    const navigate = useNavigate();

    const openFolder = async () => {
        const folder = await open({
            directory: true,
            multiple: false,
        });
        navigate(`/board?path=${folder}`);
    }

    return (
        <div className="p-4 h-[60vh]">
            <div className="flex justify-center items-center h-full flex-col gap-6">
                <div className="text-center flex flex-col gap-3">
                    <p className="text-4xl font-bold">
                        Welcome to taskify<span className="text-rose-500">.io</span>
                    </p>
                    <p className="text-lg opacity-40">
                        Change your TODO comments to interfactive <br />
                        KANBAN Board
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={openFolder} theme="secondary">
                        <i className="fa-solid fa-folder"></i>
                        <span>Open folder</span>
                    </Button>
                    <Button theme="secondary">
                        <i className="fa-solid fa-code-branch"></i>
                        <span>Clone</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}