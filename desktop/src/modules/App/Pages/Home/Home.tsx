import { useProject } from "@/store/projects/projects";
import { Button } from "@/ui/components/Buttons/Button/Button";
import { open } from "@tauri-apps/api/dialog"
import { useEffect} from "react";
import { useNavigate } from "react-router";

export const Home = () => {
    const navigate = useNavigate();
    const { projects, load, save } = useProject();

    useEffect(() => {
        load();
    }, []);

    const redirect = (folder: string) =>  navigate(`/board?path=${folder}`);

    const openFolder = async () => {
        const folder = await open({
            directory: true,
            multiple: false,
        }) as string;
        if (folder) {
            save(folder);
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
                {!!projects.length && <div className="flex flex-col gap-3">
                    <p>Recents projects</p>
                    <div>
                        {projects.slice(0, 5).map((project, index) => (
                            <Button type="link" key={`home-${project.path}-${index}`} onClick={() => redirect(project.path)}>
                                {project.path}
                            </Button>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    )
}