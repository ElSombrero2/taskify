import { useNotification } from "@/store/notification/notifications"
import { Alert } from "@/ui/components/Alert/Alert"
import { Button } from "@/ui/components/Buttons/Button/Button";
import { v4 } from "uuid";

export const Notifications = () => {
	const { notifications, push, remove } = useNotification();
	return (
		<div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
			<Button onClick={() => push({
				id: v4(),
				duration: 5000,
				type: 'info',
				description: 'Description',
				title: 'Title'
			})}>
				Test Me
			</Button>
			{notifications.map((n) => (
				<Alert
					onTimeout={remove}
					key={n.id}					
					id={n.id}
					duration={n.duration}
					type={n.type}
					title={n.title}
				>
					{n.description}
				</Alert>
			))}
		</div>
	)
}
