import { Button } from "@/ui/components/Buttons/Button/Button";
import { open } from "@tauri-apps/api/dialog"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RECENT_PROJECT = 'TASKIFY_RECENT_PROJECT';

export const Home = () => {
    const navigate = useNavigate();
    const [recents, setRecent] = useState<string[]>([]);

    useEffect(() => {
        const projects = JSON.parse(localStorage.getItem(RECENT_PROJECT) || '[]');
        setRecent(projects);
    }, []);

    const redirect = (folder: string) =>  navigate(`/board?path=${folder}`);

    const updateRecentProjects = (folder: string) => {
        const index = recents.findIndex((p) => p === folder);
        if (index >= 0) recents.splice(index, 1);
        recents.unshift(folder);
        localStorage.setItem(RECENT_PROJECT, JSON.stringify(recents));
    }

    const openFolder = async () => {
        const folder = await open({
            directory: true,
            multiple: false,
        }) as string;
        if (folder) {
            updateRecentProjects(folder);
            redirect(folder);
        }
    }

    return (
        <div className="p-4 h-[60vh] flex justify-center">
            <div className="flex h-full pt-11 justify-center flex-col gap-20 w-[400px]">
                <div className="text-center flex flex-col gap-3">
                    <p className="text-4xl font-bold">
                        Welcome to taskify<span className="text-rose-500">.io</span>
                    </p>
                    <p className="text-lg opacity-40">
                        Change your TODO comments to interfactive <br />
                        KANBAN Board
                    </p>
                </div>
                <div className="flex gap-3 justify-center">
                    <Button onClick={openFolder} theme="secondary">
                        <i className="fa-solid fa-folder"></i>
                        <span>Open folder</span>
                    </Button>
                    <Button theme="secondary">
                        <i className="fa-solid fa-code-branch"></i>
                        <span>Clone</span>
                    </Button>
                </div>
                {!!recents.length && <div className="flex flex-col gap-3">
                    <p>Recents projects</p>
                    <div>
                        {recents.slice(0, 5).map((project) => (
                            <Button type="link" onClick={() => redirect(project)}>
                                {project}
                            </Button>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    )
}