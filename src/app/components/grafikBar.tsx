import {formatSpasi} from "@/app/utils/formatSpasi";

export default function GrafikBar({ data } : any) {
    const formattedName = data.stat.name === 'special-attack'
        ? 'S. Attack'
        : data.stat.name === 'special-defense'
            ? 'S. Defense'
            : formatSpasi(data.stat.name);
    return (
        <>
            <span className="stat-label capitalize">{formattedName}</span>
        </>
    )
}
