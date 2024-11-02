import Image from "next/image";

export default function Carousel() {
    return(
        <>
            <section className={'h-screen min-h-[450px] bg-blue-400 relative'}>
                <Image src="/bg.png" className={'h-full absolute z-0 bg-cover object-cover'} alt={'Hello World'} width={12024} height={850} />
                <Image src="/bola.png" className={'absolute -bottom-[18vh] left-1/2 -translate-x-1/2 w-[65vh]'}  alt={'hello-wold'} width={542} height={542}/>
                <div className={'container flex flex-col gap-2 justify-center top-[35vh] relative z-10'}>
                    <h1 className={'text-4xl text-center font-bold text-white'}>Get them all for yourself!</h1>
                    <p className={'text-white text-center'}>The perfect guide for anyone who wants to hunt Pokémon around the world.</p>
                </div>
            </section>
        </>
    )
}
