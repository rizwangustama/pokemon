import Image from "next/image";

export default function Header() {
    return (
        <>
            <header className={'top-0 absolute left-0 w-full z-10'}>
                <div className="container">
                    <div className="flex justify-between py-[28px] items-center">
                        <Image
                            src="/logo.svg"
                            alt="Vercel Logo"
                            className="dark:invert"
                            width={100}
                            height={58}
                            priority
                        />

                        <div>
                            <h3 className="text-xs text-white">
                                Case Study- Rizwan Gustama
                            </h3>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
