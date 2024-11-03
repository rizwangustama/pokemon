import Image from "next/image";

export default function Footer() {
    return (
        <>
            <footer className={'bg-[#3E75C3] mt-12 lg:mt-20'}>
                <div className={'container py-20 flex flex-col gap-2'}>
                    <div className={'flex justify-center gap-3'}>
                        <a href="https://www.linkedin.com/in/rizwangustama/">
                            <Image src={'/icon-linkedin.svg'} alt={'linkedin'} width={24} height={24}/>
                        </a>

                        <a href="https://api.whatsapp.com/send/?phone=6285523951105">
                            <Image src={'/icon-wa.svg'} alt={'whatsAap'} width={24} height={24}/>
                        </a>


                        <a href="https://github.com/rizwangustama">
                            <Image src={'/icon-github.svg'} alt={'github'} width={24} height={24}/>
                        </a>
                    </div>
                    <h1 className={'text-white text-center'}>Copyright @ Rizwan Gustama</h1>
                </div>
            </footer>
        </>
    )
}
