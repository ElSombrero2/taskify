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
        <div className="p-4">
            <p>Hello World</p>
            <button onClick={openFolder}>Open</button>
        </div>
    )
}