import { useNotification } from "@/store/notification/notifications"
import { Alert } from "@/ui/components/Alert/Alert"

export const Notifications = () => {
	const { notifications, remove } = useNotification();
	return (
		<div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
			{notifications.map((n) => (
				<Alert
					onTimeout={remove}
					key={n.id}					
					id={n.id}
					duration={n.duration}
					type={n.type}
					title={n.title}
					onCloseClick={remove}
				>
					{n.description}
				</Alert>
			))}
		</div>
	)
}
