
export const Avatar = ({ avatar }: {avatar: {color: string, initials: string}}) => {
    return (<div
        className="text-xs text-white font-extrabold w-[28px] h-[28px] flex items-center justify-center rounded-full"
        style={{ backgroundColor: avatar.color }}
    >
        {avatar.initials}
    </div>)
}