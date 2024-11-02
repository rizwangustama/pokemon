import { useEffect, useState } from "react";
import { formatPokemon } from "@/app/utils/formatPokemon";
import { formatSpasi } from "@/app/utils/formatSpasi";
import Image from "next/image";
import GrafikBar from "@/app/components/grafikBar";

export default function Popup({ title, url, isVisibility } : any) {
    const [pokemonDetail, setPokemonDetail] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [abilityDetail, setAbilityDetail] = useState<any>({});


    useEffect(() => {
        if (url && isVisibility) {
            const fetchDataDetailPokemon = async (valueUrl: any) => {
                try {
                    const response = await fetch(valueUrl);
                    const data = await response.json();
                    setPokemonDetail(data);

                    const result = await fetch(`https://pokeapi.co/api/v2/ability/${data.id}`);
                    const dataResult = await result.json();
                    setAbilityDetail(dataResult);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
            fetchDataDetailPokemon(url);
        }
    }, [isVisibility, url]);

    return (
        <>
            <div className={'flex'}>
                <div className={'hidden md:flex w-3/12'}>
                    <Image src="/bg-popup.png" alt={pokemonDetail.name} className={'rounded-l-2xl h-full object-cover'} width={400} height={400} />
                    <img className={'absolute left-2 top-1/2 -translate-y-1/2 h-fit w-[240px]'} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonDetail?.id}.svg`} alt={pokemonDetail.name} />
                </div>

                <div className={'w-full overflow-scroll h-[80vh] md:h-fit md:w-9/12 pl-[34px] md:pl-[74px] py-[34px] pr-[34px]'}>
                    <div className={'flex flex-col gap-[32px]'}>
                        <div className={'flex flex-col gap-2.5'}>
                            <div className={'flex justify-center md:justify-start gap-3 items-center'}>
                                <h1 className={'text-center md:text-left text-[38px] font-bold capitalize leading-none'}>{pokemonDetail.name}</h1>
                                <p className={'text-lg text-[#7A7D80] leading-none'}>#{formatPokemon(pokemonDetail?.id)}</p>
                            </div>
                            <div className={'flex gap-3 items-center justify-center md:justify-start flex-wrap'}>
                                { pokemonDetail?.abilities?.map((data : any, index : any) => {
                                    return (
                                        <>
                                            <span
                                                className={`ts toast-${index}`}>
                                                { formatSpasi(data?.ability?.name) }
                                            </span>
                                        </>
                                    )
                                })}

                            {/*    <span*/}
                            {/*        className={'text-[#AC6ACA] text-xs bg-[#F7F0FA] py-2 px-[25px] rounded font-semibold'}>*/}
                            {/*    Planta*/}
                            {/*</span>*/}
                            </div>
                        </div>

                        {/*<img className={'flex sm:hidden w-[150px] h-[150px] mx-auto'}*/}
                        {/*     src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatPokemon(pokemonDetail.id)}.png`}*/}
                        {/*     alt={pokemonDetail.name}/>*/}

                        <img className={'flex sm:hidden w-[150px] h-[150px] mx-auto'}
                             src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonDetail?.id}.svg`}
                             alt={pokemonDetail.name}/>


                        <div className={'flex justify-center md:justify-start gap-6 items-center'}>
                            <div className={'flex flex-col gap-0.5 items-center'}>
                                <h4 className={'text-xs text-[#7A7D80]'}>Tinggi</h4>
                                <p className={'text-[#2F3133] text-sm font-semibold'}>{pokemonDetail.height}m</p>
                            </div>
                            <div className={'flex flex-col gap-0.5 items-center'}>
                                <h4 className={'text-xs text-[#7A7D80]'}>Berat</h4>
                                <p className={'text-[#2F3133] text-sm font-semibold'}>{pokemonDetail.weight}kg</p>
                            </div>
                            <div className={'flex flex-col gap-0.5 items-center'}>
                                <h4 className={'text-xs text-[#7A7D80]'}>Keterampilan</h4>
                                <p className={'text-[#2F3133] text-sm font-semibold capitalize'}>{formatSpasi(abilityDetail?.name)}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className={'text-sm text-[#4D5053] font-semibold mb-4'}>Fraquezas</h3>
                            <div className={'flex gap-3 items-center'}>
                                {pokemonDetail?.types?.map((data : any, index : any) => {
                                    return (
                                        <>
                                             <span
                                                 className={'text-[#73B861] text-xs capitalize bg-[#EFF6F3] py-2 px-[25px] rounded font-semibold'}>
                                                 { formatSpasi(data?.type?.name) }
                                            </span>
                                        </>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="stat-container">
                            {pokemonDetail?.stats?.map((data: any, index: any) => {
                                return (
                                    <>
                                        <div className="stat-row">
                                            <GrafikBar data={data}/>
                                            <div className="stat-bar">
                                                <div className="stat-fill" style={{width: `${data?.base_stat}%`}}></div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

